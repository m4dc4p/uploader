Ext.require([
  'Ext.container.Container',
  'Ext.ProgressBar'
]);

/**
A UI component represeting a single file that will be uploaded.
*/
Ext.define('Cs.file.ui.FileItem', {
  extend: 'Ext.container.Container',
  alias: 'widget.fileitem',
  config: { 
/**
@cfg {Object} itemTpl

A
[Ext.XTemplate](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.XTemplate)
or
[Ext.Template](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Template)
template that will be used to display the file before it is
uploaded. `name` and `size` are available properties that can be used
in the template.  */
    itemTpl: Ext.core.DomHelper.createTemplate('{name} ({size} bytes)') 
  },
/**
Create the component for the given file.

@param {String} name The name of the file.
@param {Number} size The size of the file, in bytes.
@param {Object} config A config to pass to the base class
of the component.
*/
  constructor: function(name, size, config) {
    var me = this,
    nameCmp = undefined;

    me.addEvents('remove');
    me.initConfig(config);

    me.getItemTpl().compile();
    me.name = name;
    me.size = size;
/**
@method setProgress

Updates this component to show the amount of this file that has
been uploaded so far.

@param {Number} amt The number of bytes uploaded so far.
*/
    me.setProgress = Ext.Function.createThrottled(function(amt) {
      me.nameCmp.setVisible(false);
      me.progress.setVisible(true);
      me.progress.updateProgress(amt / me.size);
    }, 100);

    me.callParent([config]);
  },
/**
Update this component to indicate if the given file was uploaded successfully or
not. This method should be called once all progress updates (if any) are done.

@param {Boolean} success True or false depending on uploaded status.
*/
  setStatus: function(success) {
    var me = this,
    mkToolbar = function (item) {
      var arr = ['->', { 
        xtype: 'tool',
        type: 'close',
        listeners: {
          click: { 
            fn: function() {
              Ext.defer(function () { me.ownerCt.remove(me); }, 100);
            },
            single: true
          }
        }
      }];

      // insert the item given at the front
      // of our common toolbar
      Ext.Array.splice(arr, 0, 0, item);

      return { 
        xtype: 'toolbar',
        height: "100%",
        items: arr
      };
    },
    toolbar = me.down('toolbar');

    toolbar.setVisible(false);
    me.progress.reset();

    if(success) 
      me.add(mkToolbar({
        xtype: 'container',
        style: { color: 'green' },
        html: 'Uploaded ' + Ext.String.htmlEncode(me.name) + '.'
      }));
    else 
      me.add(mkToolbar({
        xtype: 'container',
        style: { color: 'red' },
        html: 'Failed to upload ' + Ext.String.htmlEncode(me.name) + '.'
      }));
  },
  initComponent: function () {
    var me = this;
    me.callParent();

    me.progress = Ext.create('Ext.ProgressBar', { 
      flex: 1, 
      hidden: true,
      text: me.getItemTpl().apply({name: me.name, size: me.size})
    });
    me.nameCmp = Ext.create('Ext.container.Container', {
        flex: 1,
        html: me.getItemTpl().apply({name: me.name, size: me.size})
    });

    me.add({
      xtype: 'toolbar',
      height: "100%",
      items: [me.nameCmp, me.progress, '->', { 
        xtype: 'tool',
        type: 'close',
        width: 25,
        listeners: {
          click: function() {
            me.fireEvent('remove');
          }
        }
      }]
    });
  }
});

