Ext.Loader.setConfig({
  enabled: true
});

Ext.define('File', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [{
    name: 'id', type: 'int' 
  }, {
    name: 'name', type: 'string' 
  }, {
    name: 'size', type: 'int' 
  }, {
    name: 'data', type: 'auto'
  }],
  proxy: {
    type: 'ajax',
    url: 'upload.php'
  },
  // Will hold the actual file reference
  file: null
});

Ext.define('Ext.data.ConnectionEx', {
  extend: 'Ext.data.Connection',
  constructor: function () {
    this.addEvents('progress');
    this.callParent(arguments);
  },
  request: function(options) {
    var me = this,
    origXhr = this.getXhrInstance;

    if(typeof origXhr == "undefined")
      throw "getXhrInstance method missing - did Ext.data.Connection remove it?";
    
    if(this.hasListener('progress')) {
      this.getXhrInstance = function () {
        var xhr = origXhr.apply(me);

        if(xhr.upload)
          xhr.upload.addEventListener('progress', function (evt) {
            console.log("xhr.upload.progress");
            me.fireEvent('progress', { 
              request: 
              dir: 'up',
              amt: evt.loaded,
              total: evt.lengthComputable ? evt.total : null 
            });
          }, false);

        if(xhr.onprogress)
          xhr.addEventListener('progress', function (evt) {
            console.log("xhr.progress");
            me.fireEvent('progress', { 
              dir: 'down',
              amt: evt.loaded,
              total: evt.lengthComputable ? evt.total : null 
            });
          }, false);
        
        return xhr;
      };
    }

    this.callParent(arguments);
  }
});
           
Ext.define('FileManager', {
  mixins: [
    'Ext.util.Observable'
  ],
  constructor: function () {
    var me = this,
    fs = Ext.create('Ext.data.Store', {
      model: 'File'
    });

    me.addEvents('fileadded', 'fileremoved');
    
    (function () { 
      Ext.apply(me, {
        addFile: function (file) {
          var id;
          console.log("added: " + file.name);
          
          Ext.Array.each(fs.add({ 
            name: file.name,
            size: file.size
          }), function (rec) { 
            id = fs.getCount() * -1;
            rec.setId(id);
            rec.file = file;
          });

          me.fireEvent('fileadded', file);
          
          return id;
        },
        // file is the actual file object here, not the name or
        // anything else.
        removeFile: function (file) {
          var idx = fs.findBy(function (rec, id) { return rec.file === file;} );
          if(idx >= 0) {
            fs.removeAt(idx);
            me.fireEvent('fileremoved', file);
          }
        },
        // Applies the function given to all
        // File records managed by this object.
        each: function (fn, scope) {
          fs.each(function(record) { 
            return fn.call(scope || me, record);
          });
        }
      });
    })();
  }
});

// A component to represent a file.
Ext.define('FileItem', {
  extend: 'Ext.container.Container',
  config: { 
    itemTpl: Ext.core.DomHelper.createTemplate('{name} ({size} bytes <span class="progress"></span>)') 
  },
  constructor: function(name, size, config) {
    var me = this;

    me.addEvents('remove');
    me.initConfig(config);

    me.getItemTpl().compile();
    me.name = name;
    me.size = size;

    me.callParent([config]);
  },
  initComponent: function () {
    var me = this;
    this.callParent();

    me.add({
      xtype: 'container',
      layout: { type: 'hbox' },
      items: [{
        xtype: 'container',
        html: me.getItemTpl().apply({name: me.name, size: me.size}),
        flex: 1
      }, { 
        xtype: 'button',
        text: 'Remove',
        width: 60,
        height: 30,
        listeners: {
          click: function() {
            me.fireEvent('remove');
          }
        }
      }]
    });
  }
});

Ext.define('FileUploader', {
  config: {
    url: "upload.php",
    method: "POST"
  },
  connection: null,
  constructor: function (fileMgr, config) {
    var me = this,
    conn = Ext.create('Ext.data.ConnectionEx');

    this.initConfig(config);
    this.connection = conn;

    this.callParent(arguments);
    // Uploads each file as defined by the
    // function given. Fn takes a File object,
    // request parameters, and a upload callback. It should
    // call the upload callback with a final request that will
    // be given to the Connection.request method. Fn does
    // not have to call the upload call back. 
    this.uploadAs = function(fn) {
      fileMgr.each(function(file)  {
        var defaults = Ext.apply({
          params: {
            name: file.name,
            size: file.size
          }}, { url: me.getUrl() });

        fn(file, defaults, function (req) {
          conn.request(req);
        });
      });
    };

    // Upload all files.
    this.uploadAll = function () {
      me.uploadAs(function(defaults, uploader) {
        var fr;
        if(file.dirty || file.phantom) {
          fr = new FileReader();
          Ext.apply(fr, {
            onload: function(evt) {
              uploader(Ext.merge(params: { // add file data to the request
                data: fr.result
              }, Ext.apply(defaults, { // merge custom stuff over defaults
                success: function(response) {
                  console.log("file uploaded");
                },
                url: "upload.php",
                method: "POST"
              })));
            },
            onerror: function() {
              console.log("Error reading: " + file.get('name'));
            }
          });
          
          fr.readAsText(file.file, "UTF-8");
        }
        else {
          console.log(file.get('name') + " not dirty.");
        }
      });
    };
  }
});

Ext.define('UglyFileUploader', {
  extend: 'Ext.container.Container',
  constructor: function(fileMgr, config) {
    var listContainer,
    me = this,
    fileItems = { },
    uploader = Ext.create('FileUploader', fileMgr);

    this.initConfig(config);

    fileMgr.on('fileadded', function(file) {
      var item = Ext.create('FileItem', file.name, file.size);

      item.on('remove', function () {
        listContainer.remove(item);
      });

      listContainer.add(item);
    }, this);

    this.privateInit = function() {
      me.insert(0, {
        xtype: 'button',
        height: 20,
        text: 'Upload Files',
        listeners: {
          click: function() {
            // need to get individual file in the progress event.
            uploader.connection.on('progress', function (info) {
              console.log('connection progress.');
            });

            uploader.uploadAll();
          }
        }
      });

      listContainer = me.insert(0, {
        xtype: "container",
        width: "100%",
        flex: 1,
        autoScroll: true,
        layout: {type: "vbox", align: "stretch"}
      });

      me.insert(0, {
        xtype: "container",
        width: "100%",
        layout: {type: "hbox", pack: "end"},
        items: [{
          xtype: "filefield",
          name: "filepicker",
          width: 80,
          buttonText: "Add a File ...",
          buttonOnly: true,
          listeners: {
            change: function(field, value, opt) {
              var files = me.down('filefield[name="filepicker"]').fileInputEl.dom.files;
              Ext.Array.each(files, fileMgr.addFile, fileMgr);
            }
          }
        }]
      });

      me.on("afterrender", function () {
        var myEl = me.getEl();

        // necessary to prevent browser redirect when the file is
        // dropped.
        myEl.dom.addEventListener("dragover", function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          return false;
        }, false);

        myEl.dom.addEventListener("drop", function (evt) {

          evt.stopPropagation();
          evt.preventDefault(); 

          Ext.Array.each(evt.dataTransfer.files, function(file) { 
            me.addFile(file);
          });

        }, false);
      }, me);
    };

    this.callParent([config]);
  },
  initComponent: function() {
    console.log("initComponent 2");
    this.callParent();
    this.privateInit();
  }
});

Ext.onReady(function() {
  
  var mgr = Ext.create('FileManager');

  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: 'fit',
    width: 300,
    height: 300,
    style: { background: "#eee" },
    items: [Ext.create('UglyFileUploader', mgr, {
      width: 300,
      height: 100,
      layout: Ext.create('Ext.layout.container.VBox', {align: 'stretch'})
    })]
  });
});
