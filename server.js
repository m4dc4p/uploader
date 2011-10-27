var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

// Based on code from http://c9.io/rikarends/geekdots
var server = http.createServer(function(req, res) {
    var u, byteCount, args;

    if (req.url.match(/\/upload.*$/)) {
        args = url.parse(req.url, true);
        console.log("Uploading " + args.query.name + " for " + args.query.username + " (" + args.query.size + " bytes).");
        
        req.on('data', function(chunk) {
            byteCount += (chunk ? chunk.length : 0);
        });
        
        req.on('end', function() {
            console.log("Finished uploading " + args.query.name);
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            
            res.end('{ "success" : true, "msg" : "Thank you for submitting. You uploaded "' + byteCount + ' bytes.}"');
        });
        
        return;
    }
    else if (u = req.url.match(/\/(.*?)(\?|$)/)) {
        return serve(res, "/" + u[1]);
    }

    res.writeHead(404, {
        "Content-Type": "text/html"
    });

    res.end("Not XXX found");

});

server.listen(process.env.PORT);

function serve(res, p, mime) {
    path.exists(__dirname + p, function(found) {
        if (found) 
            fs.readFile(__dirname + p, function(err, data) {
                if (err) return error(res, err);

                res.writeHead(200, {
                    "Content-Type": mime || "text/html"
                });
                res.end(data);
            });
        else {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
    
            res.end("Not XXX found ");
        }
    });
}

function error(res, err) {
    res.writeHead(500, {"Content-Type": "text / plain"});
    res.end("Internal server error: " + err);
    console.log(err);
}