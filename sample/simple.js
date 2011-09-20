Ext.Loader.setConfig({
  enabled: true,
  paths: {'Cs': '../src'},
  disableCaching: false
});

Ext.require(['Cs.file.data.FileManager',
             'Ext.container.Container',
             'Cs.file.ui.SimpleFileUploader'
            ]);     

Ext.onReady(function() {
  var mgr = Ext.create('Cs.file.data.FileManager'),
  root,
  form;

  root = Ext.create('Ext.container.Container', {
    renderTo: Ext.get('uploader'),
    layout: { type: 'vbox', align: 'stretch' },
    width: 600,
    height: 300,
    style: { background: "#eee" },
    items: [{
      xtype: 'form',
      name: 'uploadForm',
      height: 30,
      width: '100%',
      items: {
        xtype: 'textfield',
        fieldLabel: 'Your Name (required)',
        labelWidth: 150,
        name: 'name',
        allowBlank: false
      }
    }, { 
      xtype: 'simplefileuploader',
      url: 'upload.html',
      padding: 5,
      uploadWith: function(file, req) {

        if(form.getForm().isValid()) {
          if(!Ext.isObject(req.params))
            req.params = {};

          req.params = Ext.apply(req.params, { 
            username: userName.getValue()
          });

          if(file.get('type') == Cs.file.data.File.FILE) 
            req.params = Ext.apply(req.params,  {format: "RAW"});
          else if(file.get('type') == Cs.file.data.File.FORM) 
            req.params = Ext.apply(req.params,  {format: "FORM"});
          else
            return false;

          return req;
        }
        else
          return false;
      }}]});

  form = root.down("form");
  userName = form.down("textfield");

});
