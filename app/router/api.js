let path = require('path');
var express = require('express');
var router = express.Router();
let http = require('http');
let mysql = require('mysql');
let file = require('express-fileupload');
let fs = require('fs');
let client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'snapsnack'
});
let urlencodedParser = require('body-parser').urlencoded({extended: false});
var tem = null;

router.post("/type", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    client.query('SELECT * FROM dish WHERE type="'+request.body.type+'"', function(error, result, fields){
        if(result.length>0){
            tem = result; 
            response.send('Success');            
        }
        else{
           
        }
});
});
router.post("/newDish", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    let sampleFile = request.files.sampleFile;
    console.log(__dirname);
     sampleFile.mv(__dirname+'/../public/img/'+request.body.title+'.jpg', function(err) {
        client.query('INSERT INTO `dish`(`type`, `title`, `image`, `description`, `price`) VALUES ('+request.body.type+','+request.body.title+',"img/'+request.body.title+'.jpg",'+request.body.description+','+request.body.price+')', function(error, result, fields){
        console.log(error);
        
          });
     });
   
});
router.post("/delete", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    client.query('DELETE FROM `dish` WHERE id='+request.body.id+'', function(error, result, fields){
        console.log(error);
         fs.unlinkSync(__dirname+'/../public/img/11.jpg');
    
          });
   
});
router.post("/update", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    if(request.files.sampleFile!=undefined){
    let sampleFile = request.files.sampleFile;
     sampleFile.mv(__dirname+'/../public/img/'+request.body.title+'.jpg', function(err) {
    client.query('SELECT `title` FROM `dish` WHERE id='+request.body.id+'', function(error, result, fields){
        fs.unlinkSync(__dirname+'/../public/img/'+result[0].title+'.jpg');        
    });
       
    client.query('UPDATE `dish` SET `type`='+request.body.type+',`title`="'+request.body.title+'",`image`="img/'+request.body.title+'.jpg",`description`='+request.body.description+',`price`='+request.body.price+' WHERE id='+request.body.id+'', function(error, result, fields){
        console.log(error);
    
          });
        
});
    }
else{
 client.query('UPDATE `dish` SET `type`='+request.body.type+',`title`="'+request.body.title+'",`description`='+request.body.description+',`price`='+request.body.price+' WHERE id='+request.body.id+'', function(error, result, fields){
                console.log(error);
            
                  });
        }
});
router.post("/login", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    client.query('SELECT * FROM users WHERE email="'+request.body.email+'" AND password="'+request.body.password+'"', function(error, result, fields){
            if(result.length>0){
                console.log(request.body)
                response.send('Success');   
            }
            else{
               response.send('Error');
            }
    });
});
let id_item;
router.post("/id_item", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    id_item = request.body.id;
    console.log(id_item);
    response.send('Success');
});
router.post("/item", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    response.send(tem);
});
let basket = new Array();
router.post("/basket", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    if(request.body.price!= undefined)
    basket.push(request.body);    
    console.log(request.body)
    response.send(basket);
});



router.get("/temp", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
        response.send(tem);
});

router.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
            client.query("INSERT INTO `users`(`surname`, `name`, `email`, `password`, `phone`, `access`) VALUES ('"+request.body.surname+"','"+request.body.name+"','"+request.body.email+"','"+request.body.password+"','"+request.body.phone+"','0')", function(error, result, fields){
                if(error==null)
                {
                    response.send('Success');
                }
            });
       
});
module.exports = router;