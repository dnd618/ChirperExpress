var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    bodyParser = require('body-parser')