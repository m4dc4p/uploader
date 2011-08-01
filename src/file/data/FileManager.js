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
    
    (function () { 
      Ext.apply(me, {
        addFile: function (file) {
          var id;
          console.log("added: " + file.name);
          
          Ext.Array.each(fs.add({ 
            name: file.name,
            size: file.size
          }), function (rec) { 
            id = fs.getCount() * -1;
            rec.setId(id);
            rec.file = file;
          });

          me.fireEvent('fileadded', file);
          
          return id;
        },
        // file is the actual file object here, not the name or
        // anything else.
        removeFile: function (file) {
          var idx = fs.findBy(function (rec, id) { return rec.file === file;} );
          if(idx >= 0) {
            fs.removeAt(idx);
            me.fireEvent('fileremoved', file);
          }
        },
        // Applies the function given to all
        // File records managed by this object.
        each: function (fn, scope) {
          fs.each(function(record) { 
            return fn.call(scope || me, record);
          });
        }
      });
    })();
  }
});

