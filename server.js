const express = require('express')
const app = express();
const cors = require('cors');
// Middleware for POST request data 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/',express.static(__dirname+'/public'));

app.post('/',function(req,res){
    // console.log(req.body); // this base64 encoded
   //var base64Data = req.body.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("input.png", req.body.encoded, 'base64', function(err) {
        console.log(err);
    });

    // Promise function
    getOutput()
    .then(function(output){
        res.send(output);
    })
    .catch(function(err){
        res.send(err);
    });

});

function getOutput(){

    console.log('Version 1: calling Python script from a Node child process');
    var spawn = require('child_process').spawn;
    var process = spawn('python',['./model.py']);

    return new Promise(function(resolve,reject){
        process.stdout.on('data',function(result){
            var textChunk = result.toString('utf-8'); // buffer to string
            console.log(textChunk);
            console.log("Sending the response.")
            //res.send(textChunk);
            resolve(textChunk);
        });
    })
}

app.listen(process.env.PORT || 4444,function(){
    console.log('Server started');
})