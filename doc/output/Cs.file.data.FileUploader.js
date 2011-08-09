Ext.data.JsonP.Cs_file_data_FileUploader({
  "code_type": "ext_define",
  "superclasses": [

  ],
  "component": false,
  "mixins": [

  ],
  "tagname": "class",
  "deprecated": null,
  "static": false,
  "mixedInto": [

  ],
  "alternateClassNames": [

  ],
  "inheritable": false,
  "members": {
    "property": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "cfg": [
      {
        "shortDoc": "A function to call when a file finishes uploading, whether it fails or\nnot. ...",
        "type": "Function",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 85,
        "private": false,
        "name": "callback",
        "filename": "src/file/data/FileUploader.js",
        "doc": "<p>A function to call when a file finishes uploading, whether it fails or\nnot. The function should take the following parameters:</p>\n\n<ul>\n<li><p><strong>file</strong> : <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>. The file that was to be\nuploaded.</p></li>\n<li><p><strong>options</strong> : Object. Parameters passed to the underlying <a href=\"#/api/Cs.file.data.ConnectionEx\" rel=\"Cs.file.data.ConnectionEx\" class=\"docClass\">Cs.file.data.ConnectionEx</a>'s <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>request</code></a>\nmethod. Will be nearly the same as parameters passed the <code>uploader</code>\ncallback if <a href=\"#/api/Cs.file.data.FileUploader-method-uploadWith\" rel=\"Cs.file.data.FileUploader-method-uploadWith\" class=\"docClass\">uploadWith</a> was called.</p></li>\n<li><p><strong>success</strong> : Boolean. Indicates if the upload succeeded or not.</p></li>\n<li><p><strong>response</strong> : Object. The XMLHttpRequest object containing the\nserver's response.</p></li>\n</ul>\n\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-cfg-callback"
      },
      {
        "shortDoc": "A function to call when a file fails to upload. ...",
        "type": "Function",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 66,
        "private": false,
        "name": "failure",
        "filename": "src/file/data/FileUploader.js",
        "doc": "<p>A function to call when a file fails to upload. The function should take the following\nparameters:</p>\n\n<ul>\n<li><p><strong>file</strong> : <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>. The file that was to be\nuploaded.</p></li>\n<li><p><strong>response</strong> : Object. The XMLHttpRequest object containing the\nserver's response.</p></li>\n<li><p><strong>options</strong> : Object. Parameters passed to the underlying <a href=\"#/api/Cs.file.data.ConnectionEx\" rel=\"Cs.file.data.ConnectionEx\" class=\"docClass\">Cs.file.data.ConnectionEx</a>'s <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>request</code></a>\nmethod. Will be nearly the same as parameters passed the <code>uploader</code>\ncallback if <a href=\"#/api/Cs.file.data.FileUploader-method-uploadWith\" rel=\"Cs.file.data.FileUploader-method-uploadWith\" class=\"docClass\">uploadWith</a> was called.</p></li>\n</ul>\n\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-cfg-failure"
      },
      {
        "shortDoc": "A function to call while the upload proceeds. ...",
        "type": "Function",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 43,
        "private": false,
        "name": "progress",
        "filename": "src/file/data/FileUploader.js",
        "doc": "<p>A function to call while the upload proceeds. This config only has an effect when the\nunderlying connection supports it. As of August 2011, that is Firefox and Chrome, using\nfiles with type <a href=\"#/api/Cs.file.data.File-property-FILE\" rel=\"Cs.file.data.File-property-FILE\" class=\"docClass\">Cs.file.data.File.FILE</a>.</p>\n\n<p>More about progress events can be found in the <a href=\"http://www.w3.org/TR/progress-events/\">W3C draft\nspec</a> and on the <a href=\"https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress\">Mozilla\nDeveloper\nNetwork</a>.</p>\n\n<p>The function should have the following signature:</p>\n\n<ul>\n<li><p><strong>file</strong> : <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a> The model instance representing the file being uploaded.</p></li>\n<li><p><strong>total</strong> : <code>Int</code> The total number of bytes to upload. Will be <code>null</code> if the size isn't known.</p></li>\n<li><p><strong>amt</strong> : <code>Int</code> The total number of bytes uploaded so far.</p></li>\n<li><p><strong>evt</strong> : <code>Object</code> The underlying, browser-specific progress event.</p></li>\n</ul>\n\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-cfg-progress"
      },
      {
        "shortDoc": "A function to call when a file is successfully uploaded. ...",
        "type": "Function",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 24,
        "private": false,
        "name": "success",
        "filename": "src/file/data/FileUploader.js",
        "doc": "<p>A function to call when a file is successfully uploaded. The function should take the following\nparameters:</p>\n\n<ul>\n<li><p><strong>file</strong> : <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>. The file that was\nuploaded.</p></li>\n<li><p><strong>response</strong> : Object. The XMLHttpRequest object containing the\nserver's response.</p></li>\n<li><p><strong>options</strong> : Object. Parameters passed to the underlying <a href=\"#/api/Cs.file.data.ConnectionEx\" rel=\"Cs.file.data.ConnectionEx\" class=\"docClass\">Cs.file.data.ConnectionEx</a>'s <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>request</code></a>\nmethod. Will be nearly the same as parameters passed the <code>uploader</code>\ncallback if <a href=\"#/api/Cs.file.data.FileUploader-method-uploadWith\" rel=\"Cs.file.data.FileUploader-method-uploadWith\" class=\"docClass\">uploadWith</a> was called.</p></li>\n</ul>\n\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-cfg-success"
      },
      {
        "shortDoc": "The URL to upload the form to. ...",
        "type": "String",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 17,
        "private": false,
        "name": "url",
        "filename": "src/file/data/FileUploader.js",
        "doc": "<p>The URL to upload the form to. Can contain query parameters. For\nform uploads, the same-origin restriction still applies.</p>\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-cfg-url"
      }
    ],
    "event": [

    ],
    "method": [
      {
        "shortDoc": " ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Cs.file.data.FileUploader",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 110,
        "private": false,
        "name": "constructor",
        "filename": "src/file/data/FileUploader.js",
        "params": [
          {
            "type": "Cs.file.data.FileManager",
            "optional": false,
            "name": "fileMgr",
            "doc": "<p>The <a href=\"#/api/Cs.file.data.FileManager\" rel=\"Cs.file.data.FileManager\" class=\"docClass\">Cs.file.data.FileManager</a> from which files will\nbe uploaded.</p>\n"
          },
          {
            "type": "Object",
            "optional": false,
            "name": "config",
            "doc": "<p>Configuration parameters.</p>\n"
          }
        ],
        "doc": "\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-method-constructor"
      },
      {
        "shortDoc": "Uploads each file that is dirty in the file\nmanager. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 215,
        "private": false,
        "name": "upload",
        "filename": "src/file/data/FileUploader.js",
        "params": [

        ],
        "doc": "<p>Uploads each file that is dirty in the file\nmanager. Each successfully uploaded file will be marked\ncommitted in the file manager.</p>\n\n<p>Configuration parameters given when this object was created\nwill be used.</p>\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-method-upload"
      },
      {
        "shortDoc": "Uploads each file that is dirty in the file\nmanager, using the provided function to modify requests before the file's...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileUploader",
        "alias": null,
        "protected": false,
        "linenr": 235,
        "private": false,
        "name": "uploadWith",
        "filename": "src/file/data/FileUploader.js",
        "params": [
          {
            "type": "Function",
            "optional": false,
            "name": "prepareWith",
            "doc": "<p>The <code>prepareWith</code> function allows the caller to modify\nthe request before the file is submitted to the server. It has the\nfollowing signature:</p>\n\n<ul>\n<li><p><strong>file</strong> : <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>. The file that will be uploaded.</p></li>\n<li><p><strong>request</strong> : <code>Object</code>. A request configuration object, using the same\nvalues as given to the <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>request</code></a>\nmethod on the <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection\"><code>Ext.data.Connection</code></a> object. This\nobject will contain all the configuration parameters given when this <a href=\"#/api/Cs.file.data.FileUploader\" rel=\"Cs.file.data.FileUploader\" class=\"docClass\">Cs.file.data.FileUploader</a> was constructed. Note that\nthe file data will NOT be added to the request object yet.</p></li>\n<li><p><strong>uploader</strong> : <code>Function</code>. A callback function that will initiate\nuploading. This function takes one argument, an object with the same\nproperties as that given to the\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>request</code></a>\nmethod on the\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection\"><code>Ext.data.Connection</code></a>\nobject.</p></li>\n</ul>\n\n\n<p>The <code>prepareWith</code> function is responsible for initiating the upload by\ncalling the <code>uploader</code> callback. It must pass a request object, again\nin the same format as that given to\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection-method-request\"><code>Ext.data.Connection.request</code></a>. Normally\n<code>prepareWith</code> should modify the defaults given and pass those along to\nthe <code>uploader</code>.</p>\n\n<p>Uploading is asynchronous, so <code>uploader</code> will return immediately; a callback\nmust be used to determine if the upload was successful.</p>\n\n<p>If the file has type <a href=\"#/api/Cs.file.data.File-property-FILE\" rel=\"Cs.file.data.File-property-FILE\" class=\"docClass\">Cs.file.data.File.FILE</a>, then the data\nwill be POSTed to the server under the parameter name \"data\", as a\nbinary string, where each character represents an 8-bit byte (e.g.,\nfrom 0 - 255).</p>\n\n<p>Otherwise, when the file has type <a href=\"#/api/Cs.file.data.File-property-FORM\" rel=\"Cs.file.data.File-property-FORM\" class=\"docClass\">Cs.file.data.File.FORM</a>, it\nwill be encoded using as a multipart form and POSTed. The file input\nelement's name will determine the parameter under which the data is\nsent.</p>\n\n<p>The <code>prepareWith</code> function does not have to call the upload call back.</p>\n"
          }
        ],
        "doc": "<p>Uploads each file that is dirty in the file\nmanager, using the provided function to modify requests before the file's\ndata is sent to the server.</p>\n",
        "html_filename": "FileUploader.html",
        "href": "FileUploader.html#Cs-file-data-FileUploader-method-uploadWith"
      }
    ]
  },
  "statics": {
    "property": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "event": [

    ],
    "cfg": [

    ],
    "method": [

    ]
  },
  "allMixins": [

  ],
  "xtypes": [

  ],
  "alias": null,
  "protected": false,
  "linenr": 1,
  "docauthor": null,
  "author": null,
  "extends": "Ext.Base",
  "subclasses": [

  ],
  "private": false,
  "name": "Cs.file.data.FileUploader",
  "filename": "src/file/data/FileUploader.js",
  "singleton": false,
  "doc": "<p>Manages uploading files in a <a href=\"#/api/Cs.file.data.FileManager\" rel=\"Cs.file.data.FileManager\" class=\"docClass\">Cs.file.data.FileManager</a> from the\nbrowser.</p>\n\n<p>If the file has type <a href=\"#/api/Cs.file.data.File-property-FILE\" rel=\"Cs.file.data.File-property-FILE\" class=\"docClass\">Cs.file.data.File.FILE</a>, then the data\nwill be POSTed to the server under the parameter name \"data\", as a\nbinary string, where each character represents an 8-bit byte (e.g.,\nfrom 0 - 255).</p>\n\n<p>Otherwise, when the file has type <a href=\"#/api/Cs.file.data.File-property-FORM\" rel=\"Cs.file.data.File-property-FORM\" class=\"docClass\">Cs.file.data.File.FORM</a>, it\nwill be encoded using as a multipart form and POSTed. The file input\nelement's name will determine the parameter under which the data is\nsent.</p>\n",
  "html_filename": "FileUploader.html",
  "href": "FileUploader.html#Cs-file-data-FileUploader"
});