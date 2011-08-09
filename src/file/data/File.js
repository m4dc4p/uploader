/**
A model which represents an individual file. The model has the following fields:

- `id` : Int. Unique ID value assigned to the model.

- `name` : String. Name of the file as given by the browser.

- `size` : Int. Size of the file or -1 if no size was given.

- `type` : String. Either {@link #FORM} or {@link #FILE}. The type of the file, indicating the type of object stored in the {@link #raw}
property.

Extends [Ext.data.Model](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Model).
*/
Ext.define('Cs.file.data.File', (function() {
  var FORM = 'form',
  FILE = 'file';
  
  return {
/**
@constructor

Creates a new model instance. The `raw` property must be present on the 
argument given, from which the `type` field will be determined. An `id`
is NOT automatically assigned -- it must be assigned externally.

@param {Object} data Must have a `raw` property containing a
[Ext.form.field.File](http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File) component
or [File](http://www.w3.org/TR/FileAPI/) object.

Other properties, except `type`, will be copied to the corresponding field.
  */    
    constructor: function (data) {
      if(typeof data.raw == "undefined")
        throw "raw property missing. Can't create a file without raw data.";

      this.raw = data.raw;
      
      if(typeof this.raw.getAsText != "undefined") 
        data.type = Cs.file.data.File.FILE;
      else if(typeof this.raw.fileInputEl != "undefined") 
        data.type = Cs.file.data.File.FORM;

      this.callParent(arguments);
    },
    extend: 'Ext.data.Model',
    requires: 'Ext.data.Model',
    idProperty: 'id',
    statics: {
      /**
@static
@property {String}

The value assigned to the `type` field when the file is
represented by a
[Ext.form.field.File](http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File)
component.
       */
      FORM: FORM,
/**
@static
@property {String}

The value assigned to the `type` field when the file is
represented by a [File](http://www.w3.org/TR/FileAPI/) object.
*/
      FILE: FILE,
    },
    fields: [{
      name: 'id', type: 'int' 
    }, {
      name: 'name', type: 'string' 
    }, {
      name: 'size', type: 'int' 
    }, {
      name: 'type', type: 'string'
    }],
    validations: [{
      type: 'inclusion', field: 'type', list: [FORM, FILE]
    }],
/**
@property

The actual
[Ext.form.field.File](http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File)
or [File](http://www.w3.org/TR/FileAPI/) object given to the
constructor.
  */
    raw: null
  };
})());

