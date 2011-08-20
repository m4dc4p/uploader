/**
Manages uploading files in a {@link Cs.file.data.FileManager} from the
browser. 

If the file has type {@link Cs.file.data.File#FILE}, then the data
will be POSTed to the server under the parameter name "data", as a
binary string, where each character represents an 8-bit byte (e.g.,
from 0 - 255).

Otherwise, when the file has type {@link Cs.file.data.File#FORM}, it
will be encoded using as a multipart form and POSTed. The file input
element's name will determine the parameter under which the data is
sent.
  */
Ext.define('Cs.file.data.FileUploader', {
  config: {
/**
@cfg {String}

The URL to upload the form to. Can contain query parameters. For
form uploads, the same-origin restriction still applies.
*/
    url: "",
/**
@cfg {Function}

A function to call when a file is successfully uploaded. The function should take the following
parameters:

- **file** : {@link Cs.file.data.File}. The file that was 
uploaded.

- **response** : Object. The XMLHttpRequest object containing the
server's response.

- **options** : Object. Parameters passed to the underlying {@link
Cs.file.data.ConnectionEx}'s [`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as parameters passed the `uploader`
callback if {@link #uploadWith} was called.

*/
    success: null,
/**
@cfg {Function}

A function to call while the upload proceeds. This config only has an effect when the
underlying connection supports it. As of August 2011, that is Firefox and Chrome, using
files with type {@link Cs.file.data.File#FILE}.

More about progress events can be found in the [W3C draft
spec](http://www.w3.org/TR/progress-events/) and on the [Mozilla
Developer
Network](https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress).

The function should have the following signature:

- **file** : {@link Cs.file.data.File} The model instance representing the file being uploaded.

- **total** : `Int` The total number of bytes to upload. Will be `null` if the size isn't known.

- **amt** : `Int` The total number of bytes uploaded so far.

- **evt** : `Object` The underlying, browser-specific progress event.
*/
    progress: null,
/**
@cfg {Function}

A function to call when a file fails to upload. The function should take the following
parameters:

- **file** : {@link Cs.file.data.File}. The file that was to be
uploaded.

- **response** : Object. The XMLHttpRequest object containing the
server's response.

- **options** : Object. Parameters passed to the underlying {@link
Cs.file.data.ConnectionEx}'s [`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as parameters passed the `uploader`
callback if {@link #uploadWith} was called.

*/
    failure: null,
/**
@cfg {Function}

A function to call when a file finishes uploading, whether it fails or
not. The function should take the following parameters:

- **file** : {@link Cs.file.data.File}. The file that was to be
uploaded.

- **options** : Object. Parameters passed to the underlying {@link
Cs.file.data.ConnectionEx}'s [`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as parameters passed the `uploader`
callback if {@link #uploadWith} was called.

- **success** : Boolean. Indicates if the upload succeeded or not.

- **response** : Object. The XMLHttpRequest object containing the
server's response.
*/
    callback: null
  },
  requires: [
    'Ext.form.Panel',
    'Cs.file.data.ConnectionEx'
  ],
/**
@param {Cs.file.data.FileManager} fileMgr

The {@link Cs.file.data.FileManager} from which files will
be uploaded.

@param {Object} config

Configuration parameters.
@return {Cs.file.data.FileUploader}
*/
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
              conn.request(Ext.apply(req, { file: file.raw }))
              /*
                Need to determine a way to indicate we
                want the file sent as text still.
              */
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

/**
Uploads each file that is dirty in the file
manager. Each successfully uploaded file will be marked
committed in the file manager. 

Configuration parameters given when this object was created
will be used. 
*/ 
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

/**
Uploads each file that is dirty in the file
manager, using the provided function to modify requests before the file's
data is sent to the server.

@param {Function} prepareWith 

The `prepareWith` function allows the caller to modify
the request before the file is submitted to the server. It has the 
following signature:

- **file** : {@link Cs.file.data.File}. The file that will be uploaded.

- **request** : `Object`. A request configuration object, using the same
values as given to the [`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method on the [`Ext.data.Connection`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection) object. This
object will contain all the configuration parameters given when this {@link Cs.file.data.FileUploader} was constructed. Note that
the file data will NOT be added to the request object yet.

- **uploader** : `Function`. A callback function that will initiate
uploading. This function takes one argument, an object with the same
properties as that given to the
[`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method on the
[`Ext.data.Connection`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection)
object.

The `prepareWith` function is responsible for initiating the upload by
calling the `uploader` callback. It must pass a request object, again
in the same format as that given to
[`Ext.data.Connection.request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request). Normally
`prepareWith` should modify the defaults given and pass those along to
the `uploader`.

Uploading is asynchronous, so `uploader` will return immediately; a callback
must be used to determine if the upload was successful.

If the file has type {@link Cs.file.data.File#FILE}, then the data
will be POSTed to the server under the parameter name "data", as a
binary string, where each character represents an 8-bit byte (e.g.,
from 0 - 255).

Otherwise, when the file has type {@link Cs.file.data.File#FORM}, it
will be encoded using as a multipart form and POSTed. The file input
element's name will determine the parameter under which the data is
sent.

The `prepareWith` function does not have to call the upload call back. 
*/ 
    this.uploadWith = function(preparer) {
      uploadAs(preparer);
    };
    
    this.callParent(arguments);
  }
});
