/**
   @class Cs.file.data.FileManager

   Manages a simple list of files. Each file can be a
   [File](http://www.w3.org/TR/FileAPI/) object (as defined by the
   W3C; additional documentation on the [Mozilla Developer
   Network](https://developer.mozilla.org/en/DOM/File)) or a
   [Ext.form.field.File](http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File)
   component.
   
   The class provides methods for adding, removing and enumerating
   files. The class fires events when files are added or removed, as well.
   
   Each file is represented as an instance of the {@link Cs.file.data.File} class.
*/
Ext.define('Cs.file.data.FileManager', {
  mixins: [
    'Ext.util.Observable'
  ],
  requires: [
    'Ext.util.Observable',
    'Ext.data.Store',
    'Cs.file.data.File'
  ],
  statics: {
/**
@static
@property {Boolean}

Indicates if the browser supports the
[File](http://www.w3.org/TR/FileAPI/) object.
*/
    supportsFile: typeof window["File"] != "undefined"
  },
  constructor: function () {
    var me = this,
    fs = Ext.create('Ext.data.Store', {
      model: 'Cs.file.data.File'
    });

    // Ext 4.1.1. compatability
    if (!me.hasListeners) {
        me.hasListeners = new me.HasListeners();
    }
    
    me.addEvents(
      /**
Fired when a file is added to the manager. 
         
@param {Cs.file.data.File} file The file record that was created
when the file was added.
@event
       */
      'fileadded', 
      /**
Fired when a file is removed from the manager. 
         
@param {Cs.file.data.File} file The file record that was removed.
@event
       */
      'fileremoved');

    /**
Add a file to the file manager. Returns the {@link Cs.file.data.File}
instance created. Fires the {@link #fileadded} event after the to-be-returned 
instance has been added to the store.
       
@param {Object} file Either a [File](http://www.w3.org/TR/FileAPI/) object
or a [Ext.form.field.File](http://docs.sencha.com/ext-js/4-0/#/api/Ext.form.field.File) component. 
@return {Cs.file.data.File}
    */
    me.addFile = function (file) {
      var id, fileRec, afterCreate = function (rec) { 
        id = fs.getCount() * -1;
        rec.setId(id);
        rec.phantom = false;
        rec.raw = file;
        fileRec = rec;
      };

      Ext.Array.each(fs.add({raw: file}), 
                     afterCreate);
      
      if(window['console'])
        console.log("added: " + file.name);
      me.fireEvent('fileadded', fileRec);
      return fileRec;
    };

    /**
Remove a file managed by this instance. Fires the {@link #fileremoved}
event after the file is removed.  If the file is not found, no error
occurs.

@param {Cs.file.data.File} file The file that was removed.
@return {Cs.file.data.File}
     */
    me.removeFile = function (file) {
      var idx = fs.findBy(function(record) { return record.getId() === file.getId(); });
      if(idx >= 0) {
        fs.removeAt(idx);
        me.fireEvent('fileremoved', file);
      }
    };

    /**
Applies the function given to all {@link Cs.file.data.File}
instances managed by this object.

@param {Function} fn A function that takes one argument, a
{@link Cs.file.data.File} instance. Returning a falsey value
from this function will stop the iteration.
       
@param {Object} scope An optional scope to execute `fn`
in. Defaults to the this instance of the {@link Cs.file.data.FileManager} if
not provided.
    */
    me.each = function (fn, scope) {
      fs.each(function(record) { 
        return fn.call(scope || me, record);
      });
    };
  }
});

