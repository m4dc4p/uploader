Ext.data.JsonP.Cs_file_ui_FileItem({
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
      {
        "type": "Object",
        "tagname": "property",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.FileItem",
        "alias": null,
        "protected": false,
        "linenr": 36,
        "private": false,
        "name": "setProgress",
        "filename": "src/file/ui/FileItem.js",
        "doc": "<p>Updates the uploading progress of the given file.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-property-setProgress"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "cfg": [
      {
        "shortDoc": "template that will be used to display the file before\nit is uploaded. ...",
        "type": "Object",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.FileItem",
        "alias": null,
        "protected": false,
        "linenr": 12,
        "private": false,
        "name": "A",
        "filename": "src/file/ui/FileItem.js",
        "doc": "<p>template that will be used to display the file before\nit is uploaded. <code>name</code> and <code>size</code> are available properties.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-cfg-A"
      }
    ],
    "event": [

    ],
    "method": [
      {
        "shortDoc": "Create the component for the given file. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Object",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.FileItem",
        "alias": null,
        "protected": false,
        "linenr": 18,
        "private": false,
        "name": "constructor",
        "filename": "src/file/ui/FileItem.js",
        "params": [
          {
            "type": "String",
            "optional": false,
            "name": "name",
            "doc": "<p>The name of the file.</p>\n"
          },
          {
            "type": "Number",
            "optional": false,
            "name": "size",
            "doc": "<p>The size of the file, in bytes.</p>\n"
          },
          {
            "type": "Object",
            "optional": false,
            "name": "config",
            "doc": "<p>A config to pass to the base class\nof the component.</p>\n"
          }
        ],
        "doc": "<p>Create the component for the given file.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-method-constructor"
      },
      {
        "shortDoc": "Indicates if the given file was uploaded successfully or\nnot. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.FileItem",
        "alias": null,
        "protected": false,
        "linenr": 49,
        "private": false,
        "name": "setStatus",
        "filename": "src/file/ui/FileItem.js",
        "params": [
          {
            "type": "Boolean",
            "optional": false,
            "name": "success",
            "doc": "<p>True or false depending on uploaded status.</p>\n"
          }
        ],
        "doc": "<p>Indicates if the given file was uploaded successfully or\nnot.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-method-setStatus"
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
    "fileitem"
  ],
  "alias": null,
  "protected": false,
  "linenr": 5,
  "docauthor": null,
  "author": null,
  "extends": "Ext.container.Container",
  "subclasses": [

  ],
  "private": false,
  "name": "Cs.file.ui.FileItem",
  "filename": "src/file/ui/FileItem.js",
  "singleton": false,
  "doc": "<p>A UI component represeting a single file that will be uploaded.</p>\n",
  "html_filename": "FileItem.html",
  "href": "FileItem.html#Cs-file-ui-FileItem"
});