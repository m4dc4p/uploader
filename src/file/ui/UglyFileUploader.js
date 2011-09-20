Ext.require([
  'Ext.container.Container',
  'Cs.file.data.FileUploader',
  'Cs.file.ui.FileItem'
]);

Ext.define('Cs.file.ui.UglyFileUploader', {
  extend: 'Ext.container.Container',
  alias: 'widget.uglyfileuploader',
  config: {
    mgr: null
  },
  constructor: function(config) {
    var listContainer,
    me = this,
    fileItems = { },
    form,
    fileMgr = config["mgr"] || null,
    uploader = Ext.create('Cs.file.data.FileUploader', fileMgr, {
      url: "upload.php",
      progress: function(file, total, amt, evt) { 
        if(window['console'])
          console.log("Uploaded " + Ext.Number.toFixed(100 * amt / total, 2) + " of " + file.get('name'));
      },  
      success: function(file, response, options) { 
        if(window['console'])
          console.log("Successfully uploaded " + file.get('name'));
      },
      failure: function(file, response, options) {
        if(window['console'])
          console.log("Failed to upload " + file.get('name'));
      },
      callback: function(file, options, success, response) {
        if(window['console'])
          console.log("Callback for " + file.get('name'));
      }});

    this.initConfig(config);

    fileMgr.on('fileadded', function(record) {
      var item = Ext.create('Cs.file.ui.FileItem', record.get('name'), record.get('size'));

      item.on('remove', function () {
        fileMgr.removeFile(record);
        listContainer.remove(item);
      });

      listContainer.add(item);
    }, this);

    this.privateInit = function() {
      var count = 1;

      me.insert(0, {
        xtype: 'button',
        height: 20,
        text: 'Upload Files',
        listeners: {
          click: function() {
            uploader.upload();
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

      form = me.insert(0, {
        xtype: "container",
        width: "100%",
        layout: {type: "hbox", pack: "end"},
        items: [{
          xtype: "filefield",
          name: "filepicker",
          width: 80,
          buttonText: "Add a File ... (" + count + ")",
          buttonOnly: true,
          multiple: true,
          listeners: {
            change: function(field, value, opt) {
              var inputCnt = field.ownerCt,
              inputEl = field.fileInputEl;

              if(inputEl.dom.files) {
                Ext.Array.each(inputEl.dom.files, fileMgr.addFile, fileMgr);
              }
              else if(inputEl.getValue()) {
                fileMgr.addFile(field);
                
                count = count + 1;

                inputCnt.add(field.cloneConfig({buttonText: "Add a File ... (" + count + ")"}));
                field.setVisible(false);
              }
              else
                throw "Unsupported file input type.";
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
            fileMgr.addFile(file);
          });

        }, false);
      }, me);
    };

    this.callParent([config]);
  },
  initComponent: function() {
    this.callParent();
    this.privateInit();
  }
});

