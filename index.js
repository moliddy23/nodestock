// Stock Market Portfolio App
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY : pk_eef8080dd7cc4f18a645bbd28e8c185c

// Create call API function

function callAPI(finishedAPI,ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_eef8080dd7cc4f18a645bbd28e8c185c',{json: true},(err,res,body)=>{
    if(err) {return console.log(err)};
    if(res.statusCode === 200){
        finishedAPI(body);
    }
    });
    
};

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

// Set handlebar index GET route
app.get('/',function(req,res){
    callAPI(function(doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    },"fb");
});

// Set handlebar index POST route
app.post('/',function(req,res){
    callAPI(function(doneAPI){
        // Access content from form
        // ticker = req.body.stock_ticker;
        res.render('home',{
            stock: doneAPI,
        });
    },req.body.stock_ticker);
});

// Create About page Route
app.get('/about.html',function(req,res){
    res.render('about');
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log('Server listening on Port:',PORT));
