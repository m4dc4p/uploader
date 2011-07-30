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

        xhr.addEventListener('progress', function (evt) {
          console.log("xhr.progress");
          me.fireEvent('progress');
        }, false);

        return xhr;
      };
    }

    this.callParent(arguments);
  }
});
           
Ext.define('FileManager', {
  constructor: function () {
    var me = this,
    fs = Ext.create('Ext.data.Store', {
      model: 'File'
    });
    
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
          
          return id;
        },
        // file is the actual file object here, not the name or
        // anything else.
        removeFile: function (file) {
          var idx = fs.findBy(function (rec, id) { return rec.file === file;} );
          if(idx >= 0)
            fs.removeAt(idx);
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
    itemTpl: Ext.core.DomHelper.createTemplate('{name} ({size} bytes)') 
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
  extend: 'Ext.container.Container',
  constructor: function(fileMgr, config) {
    var listContainer,
    me = this;

    this.initConfig(config);

    this.addFile = function (file) {
      fileMgr.addFile(file);
      var item = Ext.create('FileItem', file.name, file.size);
      item.on('remove', function () {
        listContainer.remove(item);
        fileMgr.removeFile(file);
      });

      listContainer.add(item);
    };

    this.privateInit = function() {
      me.insert(0, {
        xtype: 'button',
        height: 20,
        text: 'Upload Files',
        listeners: {
          click: function() {
            fileMgr.each(function(file) {
              var fr;
              if(file.dirty || file.phantom) {
                fr = new FileReader();
                Ext.apply(fr, {
                  onload: function(evt) {
                    var conn = Ext.create('Ext.data.ConnectionEx');
                    conn.on('progress', function () {
                      console.log('connection progress.');
                    });

                    conn.request({
                      params: { 
                        name: file.get('name'),
                        size: file.get('size'),
                        data: fr.result
                      },
                      url: 'upload.php',
                      method: 'POST',
                      success: function(response) {
                        console.log("file uploaded");
                      }
                    });
                    
                    // should be done on success
                    // file.set('data', 1);
                    // file.save();
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
            }, me);
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
              Ext.Array.each(files, me.addFile, me);
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
    items: [Ext.create('FileUploader', mgr, {
      width: 300,
      height: 100,
      layout: Ext.create('Ext.layout.container.VBox', {align: 'stretch'})
    })]
  });
});
