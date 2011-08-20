Ext.data.JsonP.Cs_file_data_File({
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
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 112,
        "private": false,
        "name": "raw",
        "filename": "src/file/data/File.js",
        "doc": "<p>The actual\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a>\nor <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object given to the\nconstructor.</p>\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-property-raw"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "cfg": [

    ],
    "event": [

    ],
    "method": [
      {
        "shortDoc": "Creates a new model instance. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Object",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 20,
        "private": false,
        "name": "constructor",
        "filename": "src/file/data/File.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "data",
            "doc": "<p>Must have a <code>raw</code> property containing a\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a> component\nor <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object.</p>\n\n<p>Other properties, except <code>type</code>, will be copied to the corresponding field.</p>\n"
          }
        ],
        "doc": "<p>Creates a new model instance. The <code>raw</code> property must be present on the\nargument given, from which the <code>type</code> field will be determined. An <code>id</code>\nis NOT automatically assigned -- it must be assigned externally.</p>\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-method-constructor"
      }
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
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 68,
        "private": false,
        "name": "FILE",
        "filename": "src/file/data/File.js",
        "doc": "<p>The value assigned to the <code>type</code> field when the file is\nrepresented by a <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object.</p>\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-property-FILE"
      },
      {
        "type": "String",
        "tagname": "property",
        "deprecated": null,
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 58,
        "private": false,
        "name": "FORM",
        "filename": "src/file/data/File.js",
        "doc": "<p>The value assigned to the <code>type</code> field when the file is\nrepresented by a\n<a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a>\ncomponent.</p>\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-property-FORM"
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
      {
        "shortDoc": " ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Boolean",
          "doc": "<p>Determines if the argument given is a <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object.</p>\n"
        },
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 76,
        "private": false,
        "name": "isFile",
        "filename": "src/file/data/File.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "f",
            "doc": "<p>The object to test.</p>\n"
          }
        ],
        "doc": "\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-method-isFile"
      },
      {
        "shortDoc": " ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Boolean",
          "doc": "<p>Determines if the argument given is a <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a> component.</p>\n"
        },
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.File",
        "alias": null,
        "protected": false,
        "linenr": 88,
        "private": false,
        "name": "isFileField",
        "filename": "src/file/data/File.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "f",
            "doc": "<p>The object to test.</p>\n"
          }
        ],
        "doc": "\n",
        "html_filename": "File.html",
        "href": "File.html#Cs-file-data-File-method-isFileField"
      }
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
  "name": "Cs.file.data.File",
  "filename": "src/file/data/File.js",
  "singleton": false,
  "doc": "<p>A model which represents an individual file. The model has the following fields:</p>\n\n<ul>\n<li><p><code>id</code> : Int. Unique ID value assigned to the model.</p></li>\n<li><p><code>name</code> : String. Name of the file as given by the browser.</p></li>\n<li><p><code>size</code> : Int. Size of the file or -1 if no size was given.</p></li>\n<li><p><code>type</code> : String. Either <a href=\"#/api/Cs.file.data.File-property-FORM\" rel=\"Cs.file.data.File-property-FORM\" class=\"docClass\">FORM</a> or <a href=\"#/api/Cs.file.data.File-property-FILE\" rel=\"Cs.file.data.File-property-FILE\" class=\"docClass\">FILE</a>. The type of the file, indicating the type of object stored in the <a href=\"#/api/Cs.file.data.File-property-raw\" rel=\"Cs.file.data.File-property-raw\" class=\"docClass\">raw</a>\nproperty.</p></li>\n</ul>\n\n\n<p>Extends <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Model\">Ext.data.Model</a>.</p>\n",
  "html_filename": "File.html",
  "href": "File.html#Cs-file-data-File"
});