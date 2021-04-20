'use strict'
// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');
const superagent = require('superagent');
const cors = require('cors');

// Environment variables
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded(({extended:true})));
app.use(methodOverride(_method));
app.use(express.static('./public'));
app.set('view engine','ejs');





// Express middleware
// Utilize ExpressJS functionality to parse the body of the request

// Specify a directory for static resources

// define our method-override reference

// Set the view engine for server-side templating

// Use app cors


// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// app routes here
// -- WRITE YOUR ROUTES HERE --


// callback functions
// -- WRITE YOUR CALLBACK FUNCTIONS FOR THE ROUTES HERE --

// helper functions

// app start point
client.connect().then(() =>
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
);

app.get('/',getAllquotes);
function getAllquotes(req ,res) {
    const url='https://thesimpsonsquoteapi.glitch.me/quotes';
    superagent.get(url).set('User-Agent', '1.0').then(results =>{
        const quotes=results.body.map(Object => new   Quotes (Object));
        res.render ('index',{quotes:quotes});
    }
        )
    
}
function Quotes(quotesinfo) {
    this.quote=quotesinfo.quote;
      this.character=quotesinfo.character;
 this.image=quotesinfo.image;
  this.characterDirection =quotesinfo.characterDirection;
    
}

app.post('/favorite-quotess',saveQuotes);
function saveQuotes(req , res) {
    const {quote ,character,image,characterDirection}=req.body;
    const sql="INSERT INTO quotee{quote ,character,image,characterDirection}VALUES{$1,$2 ,$3, $4 ,$5};";
    const safeValue= [quote ,character,image,characterDirection ,'api'];
    client.query(sql ,safeValue).then(()=>{
        res.redirect('/favorite-quotess');
    });
   
    
}
app.get('/favorite-quotess',saveAllQuotes);
 const sql="SELECT * FROM quotee WHERE created_by$1;";
 const safeValue= ['api'];

 client.query(sql ,safeValue).then(results=>{

    res.render('/favorite-quotes' ,{favquet:results.rows});// to the 

});


    
app.get('/favorite-quotes/:quote_id',detailseAllQuotes);
    const quoteId=req.params.quote_id;
    const sql="SELECT * FROM quotee WHERE id=$1;";
    const safeValue= [quoteId];
    client.query(sql ,safeValue).then(results=>{

        res.render('/favorite-quotes/${quote_id}');

        });


app.put('/favorite-quotes/:quote_id',updateAllQuotes);
function updateAllQuotes(req ,res) {

    const quoteId=req.params.quote_id;
    const {quote ,character,image,characterDirection }=req.body;
   
    const sql='UPDATE  quotee WHERE quote=$1,character=$2, image=$3,characterDirection=$4 id=$5;';
    const safeValue= [quote ,character,image,characterDirection ,quoteId];

       client.query(sql ,safeValue).then(results=>{

        res.render('/favorite-quotes');

        });
    
}

app.put('/favorite-quotes/:quote_id',deleteAllQuotes);
function deleteAllQuotes(req ,res) {

    const quoteId=req.params.quote_id;
       
    const sql='DELETE quotee WHERE id=$1;';
    const safeValue= [quoteId];

       client.query(sql ,safeValue).then(results=>{

        res.redirect('/favorite-quotes');

        });
    
}






