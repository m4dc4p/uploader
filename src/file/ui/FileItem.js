Ext.require([
  'Ext.container.Container'
]);

// A component to represent a file.
Ext.define('Cs.file.ui.FileItem', {
  extend: 'Ext.container.Container',
  alias: 'widget.fileitem',
  config: { 
    itemTpl: Ext.core.DomHelper.createTemplate('{name} ({size} bytes) <span class="progress"></span>') 
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
  setProgress: function(amt) {
  },
  setStatus: function(success) {
    var me = this,
    toolbar = me.down('toolbar');

    toolbar.setVisible(false);
    if(success) {
      me.add({
        xtype: 'container',
        height: '100%',
        width: '100%',
        html: 'Uploaded ' + Ext.String.htmlEncode(me.name) + '.'
      });
    }
    else {
        me.add({ xtype: 'toolbar',
               height: "100%",
               items: [{
                       xtype: 'container',
                           html: 'Failed to upload ' + Ext.String.htmlEncode(me.name) + '.'
                           }, '->', { 
        xtype: 'tool',
        type: 'close',
        listeners: {
          click: function() {
                               Ext.defer(function () { me.ownerCt.remove(me); }, 100);
          }
        }
                    }]});
    }

  },
  initComponent: function () {
    var me = this;
    this.callParent();

    me.add({
      xtype: 'toolbar',
      height: "100%",
      items: [{
        xtype: 'container',
        html: me.getItemTpl().apply({name: me.name, size: me.size})
      }, '->', { 
        xtype: 'tool',
        type: 'close',
        listeners: {
          click: function() {
            me.fireEvent('remove');
          }
        }
      }]
    });
  }
});

