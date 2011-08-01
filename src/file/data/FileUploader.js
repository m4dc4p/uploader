Ext.require([
  'Cs.file.data.ConnectionEx'
]);

Ext.define('Cs.file.data.FileUploader', {
  config: {
    url: "upload.php",
    method: "POST"
  },
  connection: null,
  constructor: function (fileMgr, config) {
    var me = this,
    conn = Ext.create('Cs.file.data.ConnectionEx'),
    withFileReader = function(file, defaults, uploader) {
      var fr;
      if(file.dirty || file.phantom) {
        fr = new FileReader();
        Ext.apply(fr, {
          onload: function(evt) {
            // we've read the file, now send package our request
            // for the uploader.
            uploader(
              Ext.merge({ 
                params: { // add file data to the request
                  data: fr.result
                }}, Ext.apply(defaults, { // merge custom stuff over defaults
                  success: function(response) {
                    console.log("file uploaded");
                  },
                  url: "upload.php",
                  method: "POST"
                })));
          },
          onerror: function() {
            console.log("Error reading: " + file.get('name'));
          }
        });
        
        fr.readAsText(file.file, "UTF-8");
      }
      else {
        console.log(file.get('name') + " not dirty.");
      }
    },
    // Uploads each file as defined by the
    // function given. Fn takes a File model record,
    // request parameters, and a upload callback. It should
    // call the upload callback with a final request that will
    // be given to the Connection.request method. Fn does
    // not have to call the upload call back. 
    uploadAs = function(fn) {
      fileMgr.each(function(file)  {
        var defaults = Ext.apply({
          params: {
            name: file.name,
            size: file.size
          }}, { url: me.getUrl() });

        fn(file, defaults, function (req) {
          conn.request(req);
        });
      });
    };

    this.initConfig(config);
    this.connection = conn;

    this.callParent(arguments);

    // Upload all files.
    this.uploadAll = function (config) {
      var complete = Ext.emptyFn,
      error = Ext.emptyFn;
      
      uploadAs();
    };
  }
});
