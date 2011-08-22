Ext.data.JsonP.Cs_file_ui_SimpleFileUploader({
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
        "type": "Object",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.SimpleFileUploader",
        "alias": null,
        "protected": false,
        "linenr": 34,
        "private": false,
        "name": "itemConfig",
        "filename": "src/file/ui/SimpleFileUploader.js",
        "doc": "<p>A config to apply to each <a href=\"#/api/Cs.file.ui.FileItem\" rel=\"Cs.file.ui.FileItem\" class=\"docClass\">Cs.file.ui.FileItem</a> component created\nby this component.</p>\n",
        "html_filename": "SimpleFileUploader.html",
        "href": "SimpleFileUploader.html#Cs-file-ui-SimpleFileUploader-cfg-itemConfig"
      },
      {
        "shortDoc": "A function to upload files with. ...",
        "type": "Function",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.SimpleFileUploader",
        "alias": null,
        "protected": false,
        "linenr": 22,
        "private": false,
        "name": "uploadWith",
        "filename": "src/file/ui/SimpleFileUploader.js",
        "doc": "<p>A function to upload files with. Will be given to\nthe internal <a href=\"#/api/Cs.file.data.FileUploader\" rel=\"Cs.file.data.FileUploader\" class=\"docClass\">Cs.file.data.FileUploader</a> instance\nand must have the same signature as specified for that\nobject's <a href=\"#/api/Cs.file.data.FileUploader-method-uploadWith\" rel=\"Cs.file.data.FileUploader-method-uploadWith\" class=\"docClass\">Cs.file.data.FileUploader.uploadWith</a> method.</p>\n\n<p>If not given, then this object will use the\n<a href=\"#/api/Cs.file.data.FileUploader-method-upload\" rel=\"Cs.file.data.FileUploader-method-upload\" class=\"docClass\">Cs.file.data.FileUploader.upload</a> method.</p>\n",
        "html_filename": "SimpleFileUploader.html",
        "href": "SimpleFileUploader.html#Cs-file-ui-SimpleFileUploader-cfg-uploadWith"
      },
      {
        "shortDoc": "The URL that files will be uploaded to. ...",
        "type": "String",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.SimpleFileUploader",
        "alias": null,
        "protected": false,
        "linenr": 16,
        "private": false,
        "name": "url",
        "filename": "src/file/ui/SimpleFileUploader.js",
        "doc": "<p>The URL that files will be uploaded to. Required.</p>\n",
        "html_filename": "SimpleFileUploader.html",
        "href": "SimpleFileUploader.html#Cs-file-ui-SimpleFileUploader-cfg-url"
      }
    ],
    "event": [

    ],
    "method": [
      {
        "shortDoc": "Create a new instance of this object. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Object",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.SimpleFileUploader",
        "alias": null,
        "protected": false,
        "linenr": 43,
        "private": false,
        "name": "constructor",
        "filename": "src/file/ui/SimpleFileUploader.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "config",
            "doc": "<p>The config to apply to this component. A <code>vbox</code> layout\nwill always be used, but otherwise any config can be given.</p>\n"
          }
        ],
        "doc": "<p>Create a new instance of this object.</p>\n",
        "html_filename": "SimpleFileUploader.html",
        "href": "SimpleFileUploader.html#Cs-file-ui-SimpleFileUploader-method-constructor"
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
  "linenr": 9,
  "docauthor": null,
  "author": null,
  "extends": "Ext.container.Container",
  "subclasses": [

  ],
  "private": false,
  "name": "Cs.file.ui.SimpleFileUploader",
  "filename": "src/file/ui/SimpleFileUploader.js",
  "singleton": false,
  "doc": "<p>A simple UI for file uploading that shows a \"Browse\" button. Will also\nallow file(s) to be dropped on the container.</p>\n",
  "html_filename": "SimpleFileUploader.html",
  "href": "SimpleFileUploader.html#Cs-file-ui-SimpleFileUploader"
});