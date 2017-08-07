var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var ids = require('shortid');
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

//Posts
app.post('/chirps', function (req, res) {
    console.log('posted')    
         fs.readFile(jsonPath, 'utf-8', function(err, file) {
            var arr = JSON.parse(file);

            req.body.id = shortid.generate();
            arr.push(req.body);
            console.log(req.body)
            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(201);
                    res.send(req.body);
                }
            });
        });

});

//Delete Post
app.delete('/api/chirps/:id', function (req, res) {});
//Update Post
app.put('/chirps/:id', function (req, res) {
    console.log('posted')    
         fs.readFile(jsonPath, 'utf-8', function(err, file) {
            var arr = JSON.parse(file);
            var result;
            var id = req.params.id;
            arr.forEach(function(a) {
                if (a.id === id) {
                    result = a;
                    result.user = req.body.user;
                    result.message = req.body.message;
                }
            });
            console.log(req.body)
            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(201);
                    res.send(req.body);
                }
            });
        });

});

// router.param('/api/user/', function(req, res, next, user){
//     console.log('validating users')
//     req.user = user;
//     next();
// })
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})