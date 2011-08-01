Ext.require('Ext.data.Model');

Ext.define('Cs.file.data.File', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [{
    name: 'id', type: 'int' 
  }, {
    name: 'name', type: 'string' 
  }, {
    name: 'size', type: 'int' 
  }, {
    name: 'data', type: 'auto'
  }],
  // Will hold the actual file reference
  file: null
});

