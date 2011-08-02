Ext.require([
  'Ext.container.Container'
]);

// A component to represent a file.
Ext.define('Cs.file.ui.FileItem', {
  extend: 'Ext.container.Container',
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

