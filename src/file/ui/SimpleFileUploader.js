Ext.require([
  'Ext.container.Container',
  'Cs.file.data.FileUploader',
  'Cs.file.data.FileManager',
]);

/* A simple UI for file uploading that shows a "Browse"
   button. Will also allow file(s) to be dropped on
   the container. */
Ext.define('Cs.file.ui.SimpleFileUploader', {
  extend: 'Ext.container.Container',
  // config: {
  //   url: null,
  //   uploadWith: null,
  //   layout: Ext.create('Ext.layout.container.VBox', { align: 'stretch' })
  // },
  alias: 'widget.simplefileuploader',
  constructor: function(config) {
    this.initConfig(config);
    this.fileMgr = Ext.create('Cs.file.data.FileManager');

    this.onFileChanged = function(field, value, opt) {

    };

    this.supportsFileDnD = typeof window["File"] != "undefined";
    
    this.callParent(arguments);
  },
  initComponent: function () {
    var me = this;

    this.callParent(arguments);

    this.on('afterrender', function(c, opt) {
      var myEl = me.getEl(),
      msgCmp,
      fileCmp,
      fileCmpDef = {
        xtype: 'filefield',
        width: 100,
        height: 30,
        buttonText: "Add a File ... ",
        multiple: true,
        itemId: 'filepicker',
        listeners: {
          change: this.onFileChanged
        }
      },
      msgCmpDef = {
        xtype: 'container',
        cls: 'droppable-region',
        html: "Drop Files Here",
        width: '100%',
        height: 25,
        itemId: 'dropMsg',
        hidden: true
      };

      if(this.supportsFileDnD) {
        me.add([fileCmpDef, msgCmpDef]);

        myEl.dom.addEventListener("dragenter", function (evt) {
          fileCmp = fileCmp || me.down('#filepicker');
          
          if(fileCmp.isVisible()) {
            msgCmp = msgCmp || me.down('#dropMsg');

            fileCmp.setVisible(false);
            msgCmp.setVisible(true);
            msgCmp.getEl().highlight();
          }

          return false;
        }, false);

        myEl.dom.addEventListener("dragover", function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          return false;
        }, false);

        myEl.dom.addEventListener("dragleave", function (evt) {
          fileCmp = fileCmp || me.down('#filepicker');

          if(! fileCmp.isVisible()) {
            msgCmp = msgCmp || me.down('#dropMsg');

            fileCmp.setVisible(true);
            msgCmp.setVisible(false);
          }

          return false;
        }, false);
        
        myEl.dom.addEventListener("drop", function (evt) {
          
          evt.stopPropagation();
          evt.preventDefault(); 
          
          fileCmp = fileCmp || me.down('#filepicker');
          msgCmp = msgCmp || me.down('#dropMsg');
          fileCmp.setVisible(true);
          msgCmp.setVisible(false);
          
          // Ext.Array.each(evt.dataTransfer.files, function(file) { 
          //   fileMgr.addFile(file);
          // });

        }, false);

      }
      else
        me.add(fileCmpDef);

    }, this);
  }
});