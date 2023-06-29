// Stock Market Portfolio App
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const path = require('path');

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

app.get('/',function(req,res){
    res.render('home',{
        stuff: 'This is stuff'
    });
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log('Server listening on Port:',PORT));
