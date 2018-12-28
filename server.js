const express=require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//     // next();
// });
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let log = `Date:${new Date().toString()}\nMethod: ${req.method}, Path: ${req.path}`;
    // fs.appendFileSync('server.log',log+'\n');
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log(err);
        }
    })
    next();
});





app.get('/',(req,res)=>{
    // res.send('Hello Express!');
    // res.send({
    //     name:'chongliang',
    //     age:28
    // })
    res.render('index.hbs',{
        pageTitle:'Index Page',
        welcomeMessage:'Hi This is the index page!!!'
    });
});

app.get('/bad',(req,res)=>{
    res.send({errorMessage:'not good'});
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});
app.get('/index',(req,res)=>{
    res.render('index.hbs',{
        welcomeMessage:'welcome to landing page'
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        projectsInfo:'Portfolio pages here'
    })
});
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});