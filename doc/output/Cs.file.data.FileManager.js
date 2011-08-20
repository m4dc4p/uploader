Ext.data.JsonP.Cs_file_data_FileManager({
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
        "shortDoc": "Fired when a file is added to the manager. ...",
        "tagname": "event",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 42,
        "private": false,
        "name": "fileadded",
        "filename": "src/file/data/FileManager.js",
        "params": [
          {
            "type": "Cs.file.data.File",
            "optional": false,
            "name": "file",
            "doc": "<p>The file record that was created\nwhen the file was added.</p>\n"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to Ext.util.Observable.addListener.</p>\n"
          }
        ],
        "doc": "<p>Fired when a file is added to the manager.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-event-fileadded"
      },
      {
        "shortDoc": "Fired when a file is removed from the manager. ...",
        "tagname": "event",
        "deprecated": null,
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 50,
        "private": false,
        "name": "fileremoved",
        "filename": "src/file/data/FileManager.js",
        "params": [
          {
            "type": "Cs.file.data.File",
            "optional": false,
            "name": "file",
            "doc": "<p>The file record that was removed.</p>\n"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to Ext.util.Observable.addListener.</p>\n"
          }
        ],
        "doc": "<p>Fired when a file is removed from the manager.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-event-fileremoved"
      }
    ],
    "method": [
      {
        "shortDoc": "Add a file to the file manager. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Cs.file.data.File",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 58,
        "private": false,
        "name": "addFile",
        "filename": "src/file/data/FileManager.js",
        "params": [
          {
            "type": "Object",
            "optional": false,
            "name": "file",
            "doc": "<p>Either a <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object\nor a <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a> component.</p>\n"
          }
        ],
        "doc": "<p>Add a file to the file manager. Returns the <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>\ninstance created. Fires the <a href=\"#/api/Cs.file.data.FileManager-event-fileadded\" rel=\"Cs.file.data.FileManager-event-fileadded\" class=\"docClass\">fileadded</a> event after the to-be-returned\ninstance has been added to the store.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-method-addFile"
      },
      {
        "shortDoc": "Applies the function given to all Cs.file.data.File\ninstances managed by this object. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 100,
        "private": false,
        "name": "each",
        "filename": "src/file/data/FileManager.js",
        "params": [
          {
            "type": "Function",
            "optional": false,
            "name": "fn",
            "doc": "<p>A function that takes one argument, a\n<a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a> instance. Returning a falsey value\nfrom this function will stop the iteration.</p>\n"
          },
          {
            "type": "Object",
            "optional": false,
            "name": "scope",
            "doc": "<p>An optional scope to execute <code>fn</code>\nin. Defaults to the this instance of the <a href=\"#/api/Cs.file.data.FileManager\" rel=\"Cs.file.data.FileManager\" class=\"docClass\">Cs.file.data.FileManager</a> if\nnot provided.</p>\n"
          }
        ],
        "doc": "<p>Applies the function given to all <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a>\ninstances managed by this object.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-method-each"
      },
      {
        "shortDoc": "Remove a file managed by this instance. ...",
        "tagname": "method",
        "deprecated": null,
        "return": {
          "type": "Cs.file.data.File",
          "doc": "\n"
        },
        "static": false,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 84,
        "private": false,
        "name": "removeFile",
        "filename": "src/file/data/FileManager.js",
        "params": [
          {
            "type": "Cs.file.data.File",
            "optional": false,
            "name": "file",
            "doc": "<p>The file that was removed.</p>\n"
          }
        ],
        "doc": "<p>Remove a file managed by this instance. Fires the <a href=\"#/api/Cs.file.data.FileManager-event-fileremoved\" rel=\"Cs.file.data.FileManager-event-fileremoved\" class=\"docClass\">fileremoved</a>\nevent after the file is removed.  If the file is not found, no error\noccurs.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-method-removeFile"
      }
    ]
  },
  "statics": {
    "property": [
      {
        "type": "Boolean",
        "tagname": "property",
        "deprecated": null,
        "static": true,
        "inheritable": false,
        "owner": "Cs.file.data.FileManager",
        "alias": null,
        "protected": false,
        "linenr": 26,
        "private": false,
        "name": "supportsFile",
        "filename": "src/file/data/FileManager.js",
        "doc": "<p>Indicates if the browser supports the\n<a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object.</p>\n",
        "html_filename": "FileManager.html",
        "href": "FileManager.html#Cs-file-data-FileManager-property-supportsFile"
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
  "linenr": 1,
  "docauthor": null,
  "author": null,
  "extends": "Ext.Base",
  "subclasses": [

  ],
  "private": false,
  "name": "Cs.file.data.FileManager",
  "filename": "src/file/data/FileManager.js",
  "singleton": false,
  "doc": "<p>Manages a simple list of files. Each file can be a\n   <a href=\"http://www.w3.org/TR/FileAPI/\">File</a> object (as defined by the\n   W3C; additional documentation on the <a href=\"https://developer.mozilla.org/en/DOM/File\">Mozilla Developer\n   Network</a>) or a\n   <a href=\"http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File\">Ext.form.field.File</a>\n   component.</p>\n\n<p>   The class provides methods for adding, removing and enumerating\n   files. The class fires events when files are added or removed, as well.</p>\n\n<p>   Each file is represented as an instance of the <a href=\"#/api/Cs.file.data.File\" rel=\"Cs.file.data.File\" class=\"docClass\">Cs.file.data.File</a> class.</p>\n",
  "html_filename": "FileManager.html",
  "href": "FileManager.html#Cs-file-data-FileManager"
});