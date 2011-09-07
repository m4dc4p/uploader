File Uploader ([http://uploader.codeslower.com](http://uploader.codeslower.com))
=============

This project implements client-side file uploading for modern
browsers. When supported, upload progress can be tracked and reported
to the user. It also demonstrates how to implement drag-and-drop file
selection (again, when supported by the browser).

The project contains a demonstration UI, called SimpleFileUploader,
but that UI really just shows how to use the data abstractions
provided. I did not intend SimpleFileUploader to work as anything more
than sample code; but I did intend that the classes used to implement
SimpleFileUploader provided a robust and scalable solution for
uploading files from the client.

File Uploader uses the [ExtJS 4.0](http://www.sencha.com) framework to
define classes, manage files, and implement asynchronous
uploading. The SimpleFileUploader sample uses the ExtJS Component
classes to implement its UI. File uploads via the `file` input element
require the ExtJS [`Ext.form.field.File`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.field.File) component. Otherwise, File Uploader
does not require that the UI be implemented with ExtJS.

Documentation
=============

Documentation generated using
[jsduck](https://github.com/senchalabs/jsduck/) can be found at
[http://uploader.codeslower.com/doc](http://uploader.codeslower.com/doc).

Sample
======

A sample page using the `SimpleFileUploader` can be found at
[http://uploader.codeslower.com/sample](http://uploader.codeslower.com/sample).

Source Repository
=================

The source code for the File Uploader can be found on GitHub at
[https://github.com/m4dc4p/uploader](https://github.com/m4dc4p/uploader).

License
=======

File Uploader has been released under the BSD3 license. See the
LICENSE file in the source repository for details.

Source Code and Components
==========================

The `src` directory contains the source files for the project.  File
 Uploader divides classes into two namespaces, `Cs.file.data` and
 `Cs.file.ui`, each found under the appropriate directory. The `sample`
directory shows how to use the SimpleFileUploader component.

`sample/`
-------

  * index.html - Hosts the sample.
  * simple.js - Shows how to instantiate the SimpleFileUploader
    component. The page always uploads to "upload.html." 
  * upload.html - Contains canned JSON indicating that the upload succeeded.
  * ugly.js - A deprecated sample showing how to host the UglyFileUploader.

`src/file/data/`
--------------

Classes in this directory implement file management, uploads, and progress
notification. Classes provided include:

  * `Cs.file.data.File` - An [`Ext.data.Model`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Model) subclass that represents an individual file.

  * `Cs.file.data.FileManager` - Manages a list of
   Cs.file.data.File instances. This class provides methods for
   adding, removing and enumerating files.

  * `Cs.file.data.FileUploader` - Handles uploading files managed by a
    `Cs.file.data.FileManager` instance. This class can upload files
    using form submission (i.e., from the [`Ext.form.field.File`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.field.File)
    component) or the `File` object as defined by the [W3C's
    FileAPI](http://www.w3.org/TR/FileAPI/). On supported browsers,
    the class will report progress and can cancel uploads in
    progress. 

  * `Cs.file.data.ConnectionEx` - Extends the ExtJS
    [`Ext.data.Connection`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Connection) class by adding support for progress
    notifications.

`src/file/ui/`
------------

This directory gives a sample UI for managing file
uploads. `UglyFileUploader` represents an early UI and no longer
works. 

  * `Cs.file.ui.FileItem` - A [`Ext.Template`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.Template)-based UI component
    representing a single file. Shows upload progress and provides
    controls to cancel the upload.  
  * `Cs.file.ui.SimpleFileUploader` - Allows files to be selected
    via a traditional file picker (using the [`Ext.form.field.File`](http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.field.File) 
    component) or by drag-and-drop. Each file added can be uploaded
    to the server.
  * `Cs.file.ui.UglyFileUploader` - A deprecated, no longer working, class
    showing an earlier UI for uploading files.





