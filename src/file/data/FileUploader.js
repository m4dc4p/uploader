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
Cs.file.data.ConnectionEx}'s
[`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as request object returned from the
`prepRequest` method if {@link #uploadWith} was called.

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
Cs.file.data.ConnectionEx}'s
[`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as request object returned from the
`prepRequest` method if {@link #uploadWith} was called.

*/
    failure: null,
/**
@cfg {Function}

A function to call when a file finishes uploading, whether it fails or
not. The function should take the following parameters:

- **file** : {@link Cs.file.data.File}. The file that was to be
uploaded.

- **options** : Object. Parameters passed to the underlying {@link
Cs.file.data.ConnectionEx}'s
[`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method. Will be nearly the same as request object returned from the
`prepRequest` method if {@link #uploadWith} was called.

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
    uploads = {};
    uploadAs = function(prepRequest) {
      var reqs = [];

      fileMgr.each(function(file) {
        var defaults = { 
          url: me.getUrl(),
          params: {
            name: file.get('name'),
            size: file.get('size')
          }
        }, req;

        if((file.dirty || file.phantom) && typeof uploads[file.getId()] == "undefined") {

          if(Ext.isFunction(me.getCallback()))
            defaults.callback = me.getCallback();

          if(Ext.isFunction(me.getSuccess()))
            defaults.success = me.getSuccess();
          
          if(Ext.isFunction(me.getFailure()))
            defaults.failure = me.getFailure();
          
          if(Ext.isFunction(me.getProgress()))
            defaults.progress = me.getProgress();

          req = prepRequest(file, defaults);

          if(req && Ext.isObject(req)) 
            reqs.push([file, req]);
        }

        return true;
      });
      
      Ext.Array.each(reqs, function (args) {
        var file = args[0],
        req = args[1], 
        conn = Ext.create('Cs.file.data.ConnectionEx'), 
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
          file.commit();
          if(orig.success)
            orig.success(file, response, options);
        };
        
        req.failure = function(response, options) {
          if(orig.failure)
            orig.failure(file, response, options);
        };
        
        req.callback = function(options, success, response) {
          delete uploads[file.getId()];
          if(Ext.isFunction(orig.progress)) 
            conn.un('progress', progress);
          
          if(orig.callback)
            orig.callback(file, options, success, response);
        };
        
        if(file.get('type') == Cs.file.data.File.FILE) {
          // Undocumented options property "rawData" can be used
          // to pass our File object through the request.
          uploads[file.getId()] = conn.request(Ext.apply(req, { rawData: file.raw }));
        }
        else if(file.get('type') == Cs.file.data.File.FORM) {
          form = Ext.DomQuery.selectNode("form", Ext.create('Ext.container.Container', {
            html: {
              tag: "form",
              action: req.url,
              method: "POST"
            },
            hidden: true,
            renderTo: Ext.getBody()
          }).getEl().dom);

          form.appendChild(file.raw.getEl().dom);

          // All these contortions necessary to create a form and
          // get hold of the DOM element, which conn.upload requires.
          conn.upload(form,
                      req.url, 
                      req.params ? Ext.Object.toQueryString(req.params) : null, 
                      req);
        }
      });

      reqs = [];
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
      uploadAs(function (file, defaults) {
        return defaults;
      });
    };

/**
Uploads each file that is dirty in the file
manager, using the provided function to modify requests before the file's
data is sent to the server.

@param {Function} prepRequest 

The `prepRequest` function allows the caller to modify
the request before the file is submitted to the server. It has the 
following signature:

- **file** : {@link Cs.file.data.File}. The file that will be uploaded.

- **request** : `Object`. A request configuration object, using the same
values as given to the [`request`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request)
method on the [`Ext.data.Connection`](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection) object. This
object will contain all the configuration parameters given when this {@link Cs.file.data.FileUploader} was constructed. Note that
the file data will NOT be added to the request object yet.

The `prepRequest` function must return a request object, which will be
used to configure the upload process. Normally `prepRequest` should
modify the request given and return the modified object. If the upload
should not occur, `prepRequest` should return a falsey value.

Uploading is asynchronous, so `uploadWith` will return immediately; a callback
must be used to determine if the upload was successful.

If the file has type {@link Cs.file.data.File#FILE}, then the data
will be POSTed to the server as a 
binary string, where each character represents an 8-bit byte (e.g.,
from 0 - 255). The body of the request will contain the file data. Any
additional parameters will be appenended to the URL used to POST.

Otherwise, when the file has type {@link Cs.file.data.File#FORM}, it
will be encoded using as a multipart form and POSTed. The file input
element's name will determine the parameter under which the data is
sent.
*/ 
    this.uploadWith = function(prepRequest) {
      uploadAs(prepRequest);
    };

/**
Aborts the upload associated with the file, if possible. Form
uploads cannot be aborted. 

If the file is uploading and it is aborted, the "failure" and
"callback" functions for that file will be called. If the
file has already loaded, the callbacks will not be called.

@param {Cs.data.file.File} file The file whose upload should be aborted.

@return {Boolean} True indicates that we attempted to abort the
upload; it may still have finished before being aborted, however. False
indicates we did not try to abort the upload (either it is a form upload
or the upload had finished.
*/
    this.abort = function(file) {
        if(typeof uploads[file.getId()] != "undefined") {
            conn.abort(uploads[file.getId()]);
            delete uploads[file.getId()];
            return true;
        }
        else
            return false;
    };
    
    this.callParent(arguments);
  }
});
