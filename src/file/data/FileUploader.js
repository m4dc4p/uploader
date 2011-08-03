Ext.require([
  'Ext.form.Panel',
  'Cs.file.data.ConnectionEx'
]);

Ext.define('Cs.file.data.FileUploader', {
  config: {
    url: "",
    success: null,
    progress: null,
    failure: null,
    callback: null
  },
  constructor: function (fileMgr, config) {
    var me = this,
    uploadAs = function(prepareWith) {
      fileMgr.each(function(file)  {
        var defaults = { 
          url: me.getUrl(),
          params: {
            name: file.get('name'),
            size: file.get('size')
          }
        };

        if(file.dirty || file.phantom) {

          if(Ext.isFunction(me.getCallback()))
            defaults.callback = me.getCallback();

          if(Ext.isFunction(me.getSuccess()))
            defaults.success = me.getSuccess();
          
          if(Ext.isFunction(me.getFailure()))
            defaults.failure = me.getFailure();
          
          if(Ext.isFunction(me.getProgress()))
            defaults.progress = me.getProgress();

          prepareWith(file, defaults, function (req) {
            var conn = Ext.create('Cs.file.data.ConnectionEx'), 
            orig = { 
              progress: req.progress,
              success: req.success,
              failure: req.failure,
              callback: req.callback
            },
            progress = function(info) {
              orig.progress(file, info.total, info.amt, info.evt);
            },
            fr, form;

            if(orig.progress)
              conn.on('progress', progress);
            
            req.success = function(response, options) {
              if(orig.success)
                orig.success(file, response, options);
            };
            
            req.failure = function(response, options) {
              if(orig.failure)
                orig.failure(file, response, options)
            };
            
            req.callback = function(options, success, response) {
              if(Ext.isFunction(orig.progress)) 
                conn.un('progress', progress);
              
              if(orig.callback)
                orig.callback(file, options, success, response);
            };
            
            if(file.get('type') == Cs.file.data.File.FILE) {
              fr = Ext.apply(new FileReader(), {
                onload: function(evt) {
                  conn.request(Ext.merge({ 
                    params: { 
                      data: fr.result 
                    }, 
                  }, req));
                },
                onerror: function() {
                  console.log("Error reading: " + file.get('name'));
                },
                onabort: function() {
                  console.log("Error reading: " + file.get('name'));
                }
              });
              
              fr.readAsBinaryString(file.raw);
            }
            else if(file.get('type') == Cs.file.data.File.FORM) {
              form = Ext.create('Ext.form.Panel', {
                url: req.url,
                items: [file.raw]
              });
              
              conn.upload(form, req.url, null, req);
            }
          });
        }
      });
    };

    this.initConfig(config);

    /* Uploads each file that is dirty or phantom in the file
       manager. Each successfully uploaded file will be marked
       committed in the file manager. */ 
    this.upload = function () {
      uploadAs(function (file, defaults, uploader) {
        var commit = function() { file.commit(); };
        
        uploader(Ext.apply(defaults, { 
          success: Ext.isFunction(defaults.success) ?
            Ext.Function.createSequence(commit, defaults.success) :
            commit
        }));
      });
    };

    /* Uploads each file that is dirty or phantom in the file
       manager. The prepareWith argument allows the caller to modify
       the request before the file is submitted to the server. It
       takes a File model record, a request object with default settings (in the same
       format as given to the Ext.data.Connection.request methd), and a upload
       callback.

       The prepareWith argument is responsible for initiating the
       upload by calling the upload callback. It must pass a request
       object, again in the same format as that given to 
       Ext.data.Connection.request. Normally prepareWith should modify
       the defaults given and pass those along to the uploader.

       uploader is asynchronous so it will return immediately; a callback
       must be used to determine if the upload was successful.

       If the file is represented by a File object (i.e., Firefox or
       Chrome), then the data will be sent to the server under the
       parameter name "data", as a binary string, where each character
       represents a 8-bit byte.

       Otherwise, the file will be represented by a file input element
       and will be named whatever that element was named. It will be encoded using 
       as a multipart form.
    
       the prepareWith argument does not have to call the upload call back. */ 
    this.uploadWith = function(preparer) {
      uploadAs(preparer);
    };
    
    this.callParent(arguments);
  }
});
