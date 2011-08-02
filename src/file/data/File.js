Ext.require('Ext.data.Model');

Ext.define('Cs.file.data.File', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  statics: {
    FORM: 'form',
    FILE: 'file',
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
    type: 'inclusion', field: 'type', list: ['form', 'file']
  }],
  // Will hold the actual file or form reference
  raw: null
});

