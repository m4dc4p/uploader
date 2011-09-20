Ext.require([
  'Ext.container.Container',
  'Ext.layout.container.VBox',
  'Cs.file.data.FileUploader',
  'Cs.file.data.FileManager',
  'Cs.file.ui.FileItem',
]);

/**
A simple UI for file uploading that shows a "Browse" button. Will also
allow file(s) to be dropped on the container.
*/
Ext.define('Cs.file.ui.SimpleFileUploader', {
  extend: 'Ext.container.Container',
  config: {
/**
@cfg {String} url

The URL that files will be uploaded to. Required.
*/
    url: undefined,
/**
@cfg {Function} uploadWith

A function to prepare requests before a given file is uploaded. Will
be given to the internal {@link Cs.file.data.FileUploader} instance
and must have the same signature as specified for that object's {@link
Cs.file.data.FileUploader#uploadWith} method.

If not given, then this object will use the 
{@link Cs.file.data.FileUploader#upload} method.
*/
    uploadWith: undefined,
/**
@cfg {Object} itemConfig

A config to apply to each {@link Cs.file.ui.FileItem} component created
by this component.
*/
    itemConfig: undefined
  },
  alias: 'widget.simplefileuploader',
/**
Create a new instance of this object.

@param {Object} config The config to apply to this component. A `vbox` layout
will always be used, but otherwise any config can be given.
*/
  constructor: function(config) {
    config = Ext.apply(config, { 
      layout: Ext.create('Ext.layout.container.Anchor')
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
      anchor: "100%",
      padding: "3 0 0 0",
      layout: {type: 'hbox', pack: 'end' },
      itemId: "upload",
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
      var containerEl = me.container,
      msgCmp,
      fileCmp,
      fileCmpDef = {
        xtype: 'filefield',
        anchor: "100%",
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
      },
      showMsg = function(show) {
        if(show && ! msgCmp.isVisible()) {
          me.ownerCt.getEl().setStyle("border", "2px solid red");
          msgCmp.setVisible(true);
          msgCmp.updateBox(fileCmp.getBox(true));
          fileCmp.setVisible(false);
        }
        else if(! show && msgCmp.isVisible()) {
          me.ownerCt.getEl().setStyle("border", "0px solid red");
          fileCmp.setVisible(true);
          msgCmp.setVisible(false);
        }
      };

      fileCmp = me.add(fileCmpDef);

      if(Cs.file.data.FileManager.supportsFile) {
        msgCmp = me.add({
          xtype: 'container',
          style: {"font-weight": "bold", 
                  "color": "red",
                  "text-align": "center" },
          html: "Drop Files Here",
          width: '100%',
          height: 25,
          itemId: 'dropMsg',
          hidden: true
        });

        containerEl.dom.addEventListener("dragenter", function (evt) {
          showMsg(true);
          return false;
        }, false);

        containerEl.dom.addEventListener("dragover", function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          return false;
        }, false);

        containerEl.dom.addEventListener("dragleave", function(evt) {
          evt.stopPropagation();
          evt.preventDefault();

          showMsg(false);

          return false;
        }, false);

        containerEl.dom.addEventListener("drop", function (evt) {
          
          evt.stopPropagation();
          evt.preventDefault(); 

          showMsg(false);

          Ext.Array.each(evt.dataTransfer.files, function(file) { 
            fileMgr.addFile(file);
          });

        }, false);

      }

      me.add([{
        xtype: 'container',
        flex: 1,
        layout: 'anchor',
        itemId: "filelist"
      }, uploadCmpDef]);

      listCmp = me.child("#filelist");
      uploadCmp = me.child("#upload");
      me.doLayout();

    });
  }
});