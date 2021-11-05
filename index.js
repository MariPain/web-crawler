const cheerio = require ('cheerio');
const { text, empty } = require('cheerio/lib/api/manipulation');
const fs = require ('fs');
const { title } = require('process');
const request = require('request');
const rq = require ('request');

//Stores the extractions
const entries = [];

let mayorDeCinco = [];

let titles = [];
let  ranks =[];
let  scores = [];
let comments = [];


// #1 I extract from the page the elements that I will need
request('https://news.ycombinator.com/', (err, res, body)=> {
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        //Extraigo todos los titulos
        $ ('table.itemlist', '#hnmain').each(function(){
            let entrie = $(this).text();
            // entries.push(entrie);
            console.log(entrie);
        })
        
        $ ('a.titlelink', '#hnmain').each(function(){
            let title = $(this).text();
            titles.push(title);
        })
          console.log(titles)
       
        //Posicion ranking
        $ ('span.rank', '#hnmain').each(function(){
            let rank = $(this).text().replace(/[^0-9]/ig,"");
            ranks.push(rank);
        })
          console.log(ranks)
        //Score
        $ ('span.score', '#hnmain').each(function(){
            let score = $(this).text().replace(/[^0-9]/ig,"");//Uso expresión regular para eliminar el texto adicional y obtener solo numero.
            scores.push(score);
        })
        // console.log(scores);

        //Comments
        $ ('td.subtext').each(function(){
            const comment = $(this).children().last().text().replace(/[^0-9]/ig,""); //Uso expresión regular para eliminar el texto adicional.
            comments.push(comment);
        })
        // console.log(comments);
    }
        //This object is provisional. 
        //I should iterate on the scarpping scar the information and fill my object

    entries.push({
        title: titles,
        rank: ranks,
        score: scores,
        comment: comments
    })


    console.log(entries)

});





