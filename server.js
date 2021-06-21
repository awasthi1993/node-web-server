const express = require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT ||3000;
var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});

app.use((req,res,next) => {
    var now= new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err) =>{
        if(err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
});
/*app.use((req,res,next) =>{
    res.render('maintanance.hbs');
});*/
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  res.render('home.hbs',{
      pageTitle:'home page',
   
      welcomeMessage:'welcome to my website'
  });
});
app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle:'about page'
  

});
});
app.get('/projects',(req,res) => {
    res.render('projects.hbs', {
        pageTitle:'Projects'
    });
});
app.get('/bad',(req,res) => {
    res.send({errormessage:'unable to find request'
});
});

app.listen(port,()=>{
console.log(`server is on port ${port}`);
});