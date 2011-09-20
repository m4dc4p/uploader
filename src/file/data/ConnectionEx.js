(function () {
  var UP = 'u',
  DOWN = 'd';

  /**
   * @class Cs.file.data.ConnectionEx
   * @extends Ext.data.Connection
   * 
   * A connection class that will report upload (or download)
   * progress, if supported by the browser. Inherits from
   * [Ext.data.Connection](http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.Connection).
   *
   * More about progress events can be found in the [W3C draft
   * spec](http://www.w3.org/TR/progress-events/) and on the [Mozilla
   * Developer
   * Network](https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress).
   */
  Ext.define('Cs.file.data.ConnectionEx', {
    extend: 'Ext.data.Connection',
    requires: 'Ext.data.Connection',
    constructor: function () {
      /**
       * @event progress 

       * Fired as data is uploaded or downloaded. As of August 2011, only suppported
       * by Firefox and Chrome. The [W3C Progress Events
       * spec](http://www.w3.org/TR/progress-events/) and [Mozilla's
       * Developer
       * Network](https://developer.mozilla.org/En/Using_XMLHttpRequest#Monitoring_progress)
       * have all the technical details.
       *

       * @param {Object} info An object containing the following properties:
       *
       * - **dir** : String. 
       * 
       * Indicates if the progress notification is
       * for an upload or download. Can be one of the constants defined
       * on this class, {@link Cs.file.data.ConnectionEx#UP} or {@link Cs.file.data.ConnectionEx#DOWN}.
       * 
       * - **amt** : Int
       * 
       * The number of bytes uploaded/downloaded so far.
       * 
       * - **total** : Int
       * 
       * The total number of bytes to upload/download. Will be
       * null if this value isn't known.
       * 
       * - **evt** : Object
       * 
       * The actual DOM event representing progress. 
       */
      this.addEvents('progress');
      this.callParent(arguments);
    },
    request: function(options) {
      var me = this,
      origXhr = this.getXhrInstance;

      if(typeof origXhr == "undefined")
        throw "getXhrInstance method missing - did Ext.data.Connection remove it?";
      
      if(this.hasListener('progress')) {
        this.getXhrInstance = function () {
          var xhr = origXhr.apply(me);

          if(xhr.upload)
            xhr.upload.addEventListener('progress', function (evt) {
              if(window['console'])
                console.log("xhr.upload.progress");

              me.fireEvent('progress', { 
                dir: 'up',
                amt: evt.loaded,
                total: evt.lengthComputable ? evt.total : null,
                evt: evt
              });
            }, false);

          if(xhr.onprogress)
            xhr.addEventListener('progress', function (evt) {
              if(window['console'])
                console.log("xhr.progress");

              me.fireEvent('progress', { 
                dir: 'down',
                amt: evt.loaded,
                total: evt.lengthComputable ? evt.total : null,
                evt: evt
              });
            }, false);
          
          return xhr;
        };
      }

      this.callParent(arguments);
    },
    statics: { 
      /**
         @property {String} 
         @static

         A value used in the info object provided by the {@link #progress} event.  
      */
      UP: UP,
      /**
         @property {String} 
         @static

         A value used in the info object provided by the {@link #progress} event.
      */
      DOWN: DOWN
    }
  });
})();
