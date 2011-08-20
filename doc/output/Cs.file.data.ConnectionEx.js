Ext.data.JsonP.Cs_file_data_ConnectionEx({
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

    ],
    "event": [
      {
        "shortDoc": "Fired as data is uploaded or downloaded. ...",
        "tagname": "event",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.ConnectionEx",
        "alias": null,
        "protected": false,
        "linenr": 22,
        "private": false,
        "name": "progress",
        "filename": "src/file/data/ConnectionEx.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "info",
            "doc": "<p>An object containing the following properties:</p>\n\n<ul>\n<li><strong>dir</strong> : String.</li>\n</ul>\n\n\n<p>Indicates if the progress notification is\nfor an upload or download. Can be one of the constants defined\non this class, <a href=\"#/api/Cs.file.data.ConnectionEx-property-UP\" rel=\"Cs.file.data.ConnectionEx-property-UP\" class=\"docClass\">UP</a> or <a href=\"#/api/Cs.file.data.ConnectionEx-property-DOWN\" rel=\"Cs.file.data.ConnectionEx-property-DOWN\" class=\"docClass\">DOWN</a>.</p>\n\n<ul>\n<li><strong>amt</strong> : Int</li>\n</ul>\n\n\n<p>The number of bytes uploaded/downloaded so far.</p>\n\n<ul>\n<li><strong>total</strong> : Int</li>\n</ul>\n\n\n<p>The total number of bytes to upload/download. Will be\nnull if this value isn't known.</p>\n\n<ul>\n<li><strong>evt</strong> : Object</li>\n</ul>\n\n\n<p>The actual DOM event representing progress.</p>\n"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to Ext.util.Observable.addListener.</p>\n"
          }
        ],
        "doc": "<p>Fired as data is uploaded or downloaded. As of August 2011, only suppported\nby Firefox and Chrome. The <a href=\"http://www.w3.org/TR/progress-events/\">W3C Progress Events\nspec</a> and <a href=\"https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress\">Mozilla's\nDeveloper\nNetwork</a>\nhave all the technical details.</p>\n",
        "html_filename": "ConnectionEx.html",
        "href": "ConnectionEx.html#Cs-file-data-ConnectionEx-event-progress"
      }
    ],
    "method": [

    ]
  },
  "statics": {
    "property": [
      {
        "type": "String",
        "tagname": "property",
        "deprecated": null,
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.ConnectionEx",
        "alias": null,
        "protected": false,
        "linenr": 121,
        "private": false,
        "name": "DOWN",
        "filename": "src/file/data/ConnectionEx.js",
        "doc": "<p>A value used in the info object provided by the <a href=\"#/api/Cs.file.data.ConnectionEx-event-progress\" rel=\"Cs.file.data.ConnectionEx-event-progress\" class=\"docClass\">progress</a> event.</p>\n",
        "html_filename": "ConnectionEx.html",
        "href": "ConnectionEx.html#Cs-file-data-ConnectionEx-property-DOWN"
      },
      {
        "type": "String",
        "tagname": "property",
        "deprecated": null,
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.ConnectionEx",
        "alias": null,
        "protected": false,
        "linenr": 114,
        "private": false,
        "name": "UP",
        "filename": "src/file/data/ConnectionEx.js",
        "doc": "<p>A value used in the info object provided by the <a href=\"#/api/Cs.file.data.ConnectionEx-event-progress\" rel=\"Cs.file.data.ConnectionEx-event-progress\" class=\"docClass\">progress</a> event.</p>\n",
        "html_filename": "ConnectionEx.html",
        "href": "ConnectionEx.html#Cs-file-data-ConnectionEx-property-UP"
      }
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
  "linenr": 5,
  "docauthor": null,
  "author": null,
  "extends": "Ext.data.Connection",
  "subclasses": [

  ],
  "private": false,
  "name": "Cs.file.data.ConnectionEx",
  "filename": "src/file/data/ConnectionEx.js",
  "singleton": false,
  "doc": "<p>A connection class that will report upload (or download)\nprogress, if supported by the browser. Inherits from\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection\">Ext.data.Connection</a>.</p>\n\n<p>More about progress events can be found in the <a href=\"http://www.w3.org/TR/progress-events/\">W3C draft\nspec</a> and on the <a href=\"https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress\">Mozilla\nDeveloper\nNetwork</a>.</p>\n",
  "html_filename": "ConnectionEx.html",
  "href": "ConnectionEx.html#Cs-file-data-ConnectionEx"
});