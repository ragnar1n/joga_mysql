const express=require('express')
const app=express()

const path=require('path')
const hbs=require('express-handlebars')
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname+'/views/layouts/',
}))

app.use(express.static('public'))

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: 'joga_mysql'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/',(req,res)=>{
    let sql=`SELECT*FROM article;`
    con.query(sql,(err,result)=>{
        if (err) throw err;
        res.render('index',{
            articles:result
        })
    })

})

app.get('/article/:slug',(req,res)=>{
    let sql=`SELECT*FROM article where slug="${req.params.slug}"`
    con.query(sql,(err,result)=>{
        if (err) throw err;
        res.render('article',{
            article:result
        })
    })
})

app.listen(3004,()=>{
 console.log('Server started')
})

// app.use(express.json())
// app.use