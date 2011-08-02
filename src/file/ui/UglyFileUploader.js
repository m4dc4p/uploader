Ext.require([
  'Ext.container.Container',
  'Cs.file.data.FileUploader',
  'Cs.file.ui.FileItem'
]);

Ext.define('Cs.file.ui.UglyFileUploader', {
  extend: 'Ext.container.Container',
  constructor: function(fileMgr, config) {
    var listContainer,
    me = this,
    fileItems = { },
    uploader = Ext.create('Cs.file.data.FileUploader', fileMgr);

    this.initConfig(config);

    fileMgr.on('fileadded', function(record) {
      var item = Ext.create('Cs.file.ui.FileItem', record.get('name'), record.get('size'));

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
          multiple: true,
          listeners: {
            change: function(field, value, opt) {
              var inputEl = me.down('filefield[name="filepicker"]').fileInputEl;
              if(inputEl.dom.files) {
                var files = me.down('filefield[name="filepicker"]').fileInputEl.dom.files;
                Ext.Array.each(files, fileMgr.addFile, fileMgr);
              }
              else if(inputEl.getValue()) {
                fileMgr.addFile(inputEl);
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
    console.log("initComponent 2");
    this.callParent();
    this.privateInit();
  }
});

