Ext.require('Ext.data.Connection');

Ext.define('Cs.file.data.ConnectionEx', {
  extend: 'Ext.data.Connection',
  constructor: function () {
    this.addEvents('progress');
    this.callParent(arguments);
  },
  request: function(options) {
    var me = this,
    origXhr = this.getXhrInstance;

    if(typeof origXhr == "undefined")
      throw "getXhrInstance method missing - did Ext.data.Connection remove it?";
    
    if(this.hasListener('progress')) {
      this.getXhrInstance = function () {
        var xhr = origXhr.apply(me);

        if(xhr.upload)
          xhr.upload.addEventListener('progress', function (evt) {
            console.log("xhr.upload.progress");
            me.fireEvent('progress', { 
              dir: 'up',
              amt: evt.loaded,
              total: evt.lengthComputable ? evt.total : null,
              evt: evt
            });
          }, false);

        if(xhr.onprogress)
          xhr.addEventListener('progress', function (evt) {
            console.log("xhr.progress");
            me.fireEvent('progress', { 
              dir: 'down',
              amt: evt.loaded,
              total: evt.lengthComputable ? evt.total : null,
              evt: evt
            });
          }, false);
        
        return xhr;
      };
    }

    this.callParent(arguments);
  }
});
