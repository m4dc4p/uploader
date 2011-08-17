Ext.require([
  'Ext.container.Container',
  'Ext.layout.container.VBox',
  'Cs.file.data.FileUploader',
  'Cs.file.data.FileManager',
  'Cs.file.ui.FileItem'
]);

/* A simple UI for file uploading that shows a "Browse"
   button. Will also allow file(s) to be dropped on
   the container. */
Ext.define('Cs.file.ui.SimpleFileUploader', {
  extend: 'Ext.container.Container',
  config: {
    url: undefined,
    uploadWith: undefined,
    itemConfig: undefined,
    layout: Ext.create('Ext.layout.container.VBox', { align: 'stretch' })
  },
  alias: 'widget.simplefileuploader',
  constructor: function(config) {
    config = Ext.apply(config, { 
      layout: Ext.create('Ext.layout.container.VBox', {align: 'stretch'}),
      height: "100%"
    });

    this.initConfig(config);
    this.supportsFile = typeof window["File"] != "undefined";
    this.callParent(arguments);
  },
  initComponent: function () {
    var me = this,
    fileMap = {},
    uploadCmp,
    uploadCmpDef = {
      xtype: 'container',
      height: 28,
      padding: "3 0 0 0",
      layout: {type: 'hbox', pack: 'end' },
      items: {
        xtype: 'button',
        text: 'Upload',
        height: 25,
        listeners: {
          click: function () {
            if(me.getUploadWith())
              uploader.uploadWith(me.getUploadWith());
            else
              uploader.upload();
          }
        }
      },
      hidden: true
    },
        listCmp,
    uploaderDef = { url: me.getUrl() };

    this.callParent(arguments);

    this.fileMgr = Ext.create('Cs.file.data.FileManager');
    this.fileMgr.on('fileadded', function(record) {
      var item = Ext.create('Cs.file.ui.FileItem', record.get('name'), record.get('size'), 
                            me.getItemConfig() ||
                            { height: 25, 
                              style: { 'padding-top': 1, 'padding-bottom': 1 }
                            });

      fileMap[record.get('name')] = item;

      item.on('remove', function () {
        var hasDirtyFile = false;

        me.fileMgr.removeFile(record);
        listCmp.remove(item);
        delete fileMap[record.get('name')];

        me.fileMgr.each(function (file) { 
          return ! (hasDirtyFile = file.dirty);
        });

        if(! hasDirtyFile)
          uploadCmp.setVisible(false);

      });

      uploadCmp.setVisible(true);
      listCmp.add(item);
    });

    if(this.supportsFile) {
      uploaderDef = Ext.apply(uploaderDef, {
        progress: function(file, total, amt, evt) { 
          console.log("Uploaded " + Ext.Number.toFixed(100 * amt / total, 2) + " of " + file.get('name'));
        }});
    }

    uploader = Ext.create('Cs.file.data.FileUploader', this.fileMgr, Ext.apply(uploaderDef, { 
      success: function(file, response, options) { 
        var item = fileMap[file.get('name')];
        if(item) {
          item.setStatus(true);
          console.log("Successfully uploaded " + file.get('name'));
          delete fileMap[file.get('name')];
        }
      },
      failure: function(file, response, options) {
        var item = fileMap[file.get('name')];
        if(item) {
          item.setStatus(false);
          console.log("Failed to upload " + file.get('name'));
          delete fileMap[file.get('name')];
        }
      },
      callback: function(file, options, success, response) {
        console.log("Callback for " + file.get('name'));
      }}));

    this.on('afterrender', function(c, opt) {
      var myEl = me.getEl(),
      msgCmp,
      fileCmp,
      fileCmpDef = {
        xtype: 'filefield',
        width: "100%",
        height: 30,
        buttonText: "Add a File ... ",
        multiple: true,
        itemId: 'filepicker',
        listeners: {
          change: function(field, value, opt) {
            if(me.supportsFile) 
              Ext.Array.each(field.fileInputEl.dom.files, me.fileMgr.addFile, me.fileMgr);
            else 
              me.fileMgr.addFile(field);

            fileCmp.setVisible(false);
            fileCmp = me.insert(0, fileCmpDef);
          }
        }
      };

      fileCmp = me.add(fileCmpDef);

      if(me.supportsFile) {
        msgCmp = me.add({
          xtype: 'container',
          cls: 'droppable-region',
          html: "Drop Files Here",
          width: '100%',
          height: 25,
          itemId: 'dropMsg',
          hidden: true
        });

        myEl.dom.addEventListener("dragenter", function (evt) {
          if(! msgCmp.isVisible()) {
            msgCmp.setVisible(true);
            msgCmp.updateBox(fileCmp.getBox(true));
            fileCmp.setVisible(false);
          }

          return false;
        }, false);

        myEl.dom.addEventListener("dragover", function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          return false;
        }, false);

        myEl.dom.addEventListener("drop", function (evt) {
          
          evt.stopPropagation();
          evt.preventDefault(); 
          
          fileCmp.setVisible(true);
          msgCmp.setVisible(false);

          Ext.Array.each(evt.dataTransfer.files, function(file) { 
            me.fileMgr.addFile(file);
          });

        }, false);
      }

      listCmp = me.add({
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            autoScroll: true
        });
      uploadCmp = me.add(uploadCmpDef);
    });
  }
});