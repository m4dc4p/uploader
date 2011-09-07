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

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "cfg": [
      {
        "shortDoc": "A\nExt.XTemplate\nor\nExt.Template\ntemplate that will be used to display the file before it is\nuploaded. ...",
        "type": "Object",
        "tagname": "cfg",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.ui.FileItem",
        "alias": null,
        "protected": false,
        "linenr": 13,
        "private": false,
        "name": "itemTpl",
        "filename": "src/file/ui/FileItem.js",
        "doc": "<p>A\n<a href=\"http://docs.sencha.com/ext-js/4-0/#!/api/Ext.XTemplate\">Ext.XTemplate</a>\nor\n<a href=\"http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Template\">Ext.Template</a>\ntemplate that will be used to display the file before it is\nuploaded. <code>name</code> and <code>size</code> are available properties that can be used\nin the template.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-cfg-itemTpl"
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
        "linenr": 25,
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
        "shortDoc": "Updates this component to show the amount of this file that has\nbeen uploaded so far. ...",
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
        "linenr": 43,
        "private": false,
        "name": "setProgress",
        "filename": "src/file/ui/FileItem.js",
        "params": [
          {
            "type": "Number",
            "optional": false,
            "name": "amt",
            "doc": "<p>The number of bytes uploaded so far.</p>\n"
          }
        ],
        "doc": "<p>Updates this component to show the amount of this file that has\nbeen uploaded so far.</p>\n",
        "html_filename": "FileItem.html",
        "href": "FileItem.html#Cs-file-ui-FileItem-method-setProgress"
      },
      {
        "shortDoc": "Update this component to indicate if the given file was uploaded successfully or\nnot. ...",
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
        "linenr": 59,
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
        "doc": "<p>Update this component to indicate if the given file was uploaded successfully or\nnot. This method should be called once all progress updates (if any) are done.</p>\n",
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
  "linenr": 6,
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