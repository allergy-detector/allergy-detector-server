        // server.js

      // set up ========================
      var express  = require('express');
      var app      = express();                 // create our app w/ express
      var mongoose = require('mongoose');           // mongoose for mongodb
      var morgan = require('morgan');       // log requests to the console (express4)
      var bodyParser = require('body-parser');  // pull information from HTML POST (express4)
      var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
      var https = require('https');
      var http = require('http');
      var fs = require('fs');
      var path = require('path');
      var sys = require('sys');
      var exec = require('child_process').exec;
      var cwd = require('child_process').cwd;
      var formidable = require('formidable');
      var fs = require('fs');
      var ip = require('ip');
      var cors = require('cors')

      // configuration =================
      mongoose.connect('mongodb://nelson:nelson123@ds045021.mongolab.com:45021/allergydetector');   // connect to mongoDB database on modulus.io
      app.use(express.static(__dirname + '/public'));         // set the static files location /client/img will be /img for users
      app.use(morgan('dev'));                     // log every request to the console
      app.use(bodyParser.urlencoded({'extended':'true'}));      // parse application/x-www-form-urlencoded
      app.use(bodyParser.json());                   // parse application/json
      app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
      app.use(methodOverride());
      app.use(cors())

      // define model ================================================================
      var User = mongoose.model('User', {
        username : String,
        password : String,
        allergies: []
      });

      var rootdir = process.argv[1].replace('/server.js','');

      // listen (start app with node server.js) ======================================
      http.createServer(app).listen(8080);

      // app.listen(8080);
      console.log("App listening on HTTP address ".concat(ip.address()).concat(":8080"));

      app.post('/user/authenticate', function(req, res) {
        var userInfo = req.body;
        console.log(userInfo);
        User.find({name: userInfo.name, password: userInfo.password}).exec(function(err, data){
          console.log(data);
          if(data.length > 0){
            res.status(200).send('Autenticação efetuada com sucesso!');
            http.get();
          }
          else{
            res.status(401).send('Usuário ou senha inválidos');
          }
        })

      });

      app.post('/user/create', function(req, res) {
        console.log('calling server');
        var newUser = req.body;

        // newUser.allergies = newUser.allergies.split(',');
        console.log(newUser);

        User.find({username:newUser.username}).exec(function(err, data){
          if(data.length > 0){
            res.status(401).send('Usuário já existe na base de dados');
          }
          else{
            persistUserData(newUser, res);
          }
        })
      });

      function persistUserData(newUser, res){
       User.create(newUser, function (err, userCreated) {
        if (err) 
          return handleError(err);
        res.send("Usuário criado com sucesso!");
          // saved!
          console.log(userCreated);
        })
     }

     app.post('/user/checkin', function(req, res) {
      var userData = req.body;
      console.log(userData);

      http.get("http://192.168.1.204:8000/listarAlergenicos", function(jenaResponse) {
        var allergenicData;
        jenaResponse.on('data', function (chunk) {
         allergenicData += chunk;
       });

        jenaResponse.on('end', function() {
          res.send(allergenicData);
        });
      }).on('error', function(e) {
        res.send(e);
        console.log("Got error: " + e.message);
      });

    });


      // application -------------------------------------------------------------
      app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
      });