var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var id = require('shortid');
var shortid = require('shortid');
var jsonPath = path.join(__dirname, "data.json");
    
app.use(bodyParser.json());

//Get Post
app.get('/chirps', function (req, res) {
    console.log('Posted')
   
     fs.readFile(jsonPath, function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            res.write(file);
            res.end();
        });
});
//Checking port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
//Posts
app.post('/chirps', function (req, res) {
    console.log('chirp posted')
     var chunks = '',
            data;

        req.on('data', function(chunk) {
            chunks += chunk;

            if (chunks.length > 1e6) {
                req.connection.destroy();
            }

            data = JSON.parse(chunks);
        
         fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            var arr = JSON.parse(file);

            data.id = shortid.generate();

            arr.push(data);

            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Couldn\'t successfull store data');
                } else {
                    res.writeHead(201, 'Created');
                    res.end(JSON.stringify(arr));
                }
            });
        });
    });
});   

//Delete Post
app.delete('/api/chirps/:id', function (req, res) {});
//Update Post
app.put('/api/chirps/:id', function (req, res) {
    var user = req.param.id;
    var message = req.param.message;
})

// router.param('/api/user/', function(req, res, next, user){
//     console.log('validating users')
//     req.user = user;
//     next();
// })