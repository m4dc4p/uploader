Ext.require('Ext.data.Model');

Ext.define('Cs.file.data.File', (function() {
  var FORM = 'form',
  FILE = 'file';
  
  return {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    statics: {
      FORM: FORM,
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
    }, {
      name: 'data', type: 'auto'
    }],
    validations: [{
      type: 'inclusion', field: 'type', list: [FORM, FILE]
    }],
    // Will hold the actual file or form reference
    raw: null
  };
})());

