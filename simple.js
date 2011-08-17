Ext.Loader.setConfig({
  enabled: true,
  paths: {'Cs': 'src'},
  disableCaching: false
});

Ext.require(['Cs.file.data.FileManager',
             'Ext.container.Container',
             'Cs.file.ui.SimpleFileUploader'
            ]);     

Ext.onReady(function() {
  var mgr = Ext.create('Cs.file.data.FileManager');

  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: {type: 'vbox', align: 'stretch' },
    width: 300,
    height: 300,
    style: { background: "#eee" },
    items: [{ 
      xtype: 'simplefileuploader',
      url: 'upload.php',
      padding: 5
    }]
  });
});
