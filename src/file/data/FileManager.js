Ext.require([
  'Ext.util.Observable',
  'Ext.data.Store',
  'Cs.file.data.File'
]);

Ext.define('Cs.file.data.FileManager', {
  mixins: [
    'Ext.util.Observable'
  ],
  constructor: function () {
    var me = this,
    fs = Ext.create('Ext.data.Store', {
      model: 'Cs.file.data.File'
    });

    me.addEvents('fileadded', 'fileremoved');

    // Add a file to the file manager. The 
    // file argument should be an actual File object,
    // as defined by Firefox and Webkit.
    this.addFile = function (file) {
      var id;
      if(typeof file.getAsText != "undefined") {
        // file is a File object.
        Ext.Array.each(fs.add({ 
          name: file.name,
          size: file.size,
          type: Cs.file.data.File.FILE
        }), function (rec) { 
          id = fs.getCount() * -1;
          rec.setId(id);
          rec.raw = file;
        });
        
        console.log("added: " + file.name);
      }
      else if(typeof file.dom != "undefined") {
        // file is a form Ext.Element
        Ext.Array.each(fs.add({ 
          name: file.getValue(),
          size: -1,
          type: Cs.file.data.File.FORM
        }), function (rec) { 
          id = fs.getCount() * -1;
          rec.setId(id);
          rec.raw = file;
        });
      }
      else
        throw "Unrecognized file type.";

      me.fireEvent('fileadded', fs.getById(id));
      return id;
    };

    // file is the actual file or form object  here, not the name or
    // anything else.    
    this.removeFile = function (file) {
      var idx = fs.findBy(function (rec, id) { return rec.file === file;} );
      if(idx >= 0) {
        fs.removeAt(idx);
        me.fireEvent('fileremoved', file);
      }
    };

    // Applies the function given to all
    // File records managed by this object.    this.each = 
    this.each = function (fn, scope) {
      fs.each(function(record) { 
        return fn.call(scope || me, record);
      });
    }
  }
});

