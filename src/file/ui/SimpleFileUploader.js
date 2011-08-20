Ext.require([
  'Ext.container.Container',
  'Ext.layout.container.VBox',
  'Cs.file.data.FileUploader',
  'Cs.file.data.FileManager',
  'Cs.file.ui.FileItem'
]);

/**
A simple UI for file uploading that shows a "Browse" button. Will also
allow file(s) to be dropped on the container.
*/
Ext.define('Cs.file.ui.SimpleFileUploader', {
  extend: 'Ext.container.Container',
  config: {
/**
The URL that files will be uploaded to. Required.
*/
    url: undefined,
/**
A function to upload files with. Will be given to
the internal {@link Cs.file.data.FileUploader} instance
and must have the same signature as specified for that
object's {@link Cs.file.data.FileUploader#uploadWith} method.
*/
    uploadWith: undefined,
/**
A config to apply to the FileItem component used to 
represent each file in the uploader.
*/
    itemConfig: undefined
  },
  alias: 'widget.simplefileuploader',
  constructor: function(config) {
    config = Ext.apply(config, { 
      layout: Ext.create('Ext.layout.container.VBox', {align: 'stretch'}),
      height: "100%"
    });

    this.initConfig(config);
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
    fileMgr = Ext.create('Cs.file.data.FileManager'),
    uploader,
    uploaderDef = { url: me.getUrl() };

    this.callParent(arguments);

    fileMgr.on('fileadded', function(record) {
      var item = Ext.create('Cs.file.ui.FileItem', record.get('name'), record.get('size'), 
                            me.getItemConfig() ||
                            { height: 25, 
                              style: { 'padding-top': 1, 'padding-bottom': 1 }
                            });

      fileMap[record.get('name')] = item;

      item.on('remove', function () {
        var hasDirtyFile = false;

        fileMgr.removeFile(record);
        uploader.abort(record);

        listCmp.remove(item);
        delete fileMap[record.get('name')];

        fileMgr.each(function (file) { 
          return ! (hasDirtyFile = file.dirty);
        });

        if(! hasDirtyFile)
          uploadCmp.setVisible(false);

      });

      uploadCmp.setVisible(true);
      listCmp.add(item);
    });

    if(Cs.file.data.FileManager.supportsFile) {
      uploaderDef = Ext.apply(uploaderDef, {
        progress: function(file, total, amt, evt) { 
          var item = fileMap[file.get('name')];
          if(item) {
            item.setProgress(amt);
          }
        }});
    }

    uploader = Ext.create('Cs.file.data.FileUploader', fileMgr, Ext.apply(uploaderDef, { 
      success: function(file, response, options) { 
        var item = fileMap[file.get('name')];
        if(item) {
          item.setStatus(true);
          delete fileMap[file.get('name')];
        }
      },
      failure: function(file, response, options) {
        var item = fileMap[file.get('name')];
        if(item) {
          item.setStatus(false);
          delete fileMap[file.get('name')];
        }
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
            if(Cs.file.data.FileManager.supportsFile) 
              Ext.Array.each(field.fileInputEl.dom.files, fileMgr.addFile, fileMgr);
            else 
              fileMgr.addFile(field);

            fileCmp.setVisible(false);
            fileCmp = me.insert(0, fileCmpDef);
          }
        }
      };

      fileCmp = me.add(fileCmpDef);

      if(Cs.file.data.FileManager.supportsFile) {
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
            fileMgr.addFile(file);
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