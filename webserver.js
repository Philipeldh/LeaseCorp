/* 
Webserverapplikation för Leasingcompany.
authors:
Bojan Radosavljevic & Philip Kjellson

Applikationen är en del av det databas-kunnande som ska visas upp i kursen DA372A
*/

//Nödvändiga Node-plugins
var http = require ('http');
var ip = require('ip');
var pgp = require('pg-promise')();
var url = require('url');

var sqlConn = pgp ({
    user:'',
    password:'',
    database:'leasing',
    host:'pgserver.mah.se',
    client_enconding: 'UTF8'
    
});

var sendBasPage = function(resp) {
    resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><body><title>Leasingcompany</title></body>")

    
    resp.write("<head><style>body{background-image: url('http://static.feber.se/article_images/33/63/77/336377_1280.jpg'); background-repeat: no-repeat; background-attachment: fixed;}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><h1><i class='w3-large w3-spin fa fa-car'></i> Välkommen till Leasingcompany</li><style>h1 {text-align:center;text-decoration: underline;font-family: 'Times New Roman'; font-size: 400%; color: white; text-shadow: 4px 4px 2px #000000;}</style></head></h1><style>h2 {font-style:italic;font-size:100%;}</style><br></br><h2>Gör ditt val..</h2></body><br></br>")
            
    resp.write("<head><style>li {list-style-type : none;}.button{display: inline-block; padding: 5px 21px; font-size: 24px; cursor: pointer; text-align: center;text-decoration: none; outline: none; color: #fff; background-color: #008CBA; border: none; border-radius: 15px; box-shadow: 0 6px #4CAECE;}.button:hover{background-color: #006CBA}.button:active{background-color: #006CBA; box-shadow: 0 2px #666; transform: translateY(4px);}</style><li><a href='clientcarlist.html'><button class='button'>1. Kunder och deras bilar</button><br></br>");
   
    resp.write("<head><style>li {list-style-type : none;}.button{display: inline-block; padding: 5px 21px; font-size: 24px; cursor: pointer; text-align: center;text-decoration: none; outline: none; color: #fff; background-color: #008CBA; border: none; border-radius: 15px; box-shadow: 0 6px #4CAECE;}.button:hover{background-color: #006CBA}.button:active{background-color: #006CBA; box-shadow: 0 2px #666; transform: translateY(4px);}</style><li><a href='clientsalesmanlist.html'><button class='button'>2. Försäljare och deras kunder </button><br></br>");
    
    resp.write("<head><style>li {list-style-type : none;}.button{display: inline-block; padding: 5px 21px; font-size: 18px; cursor: pointer; text-align: center;text-decoration: none; outline: none; color: #fff; background-color: #008CBA; border: none; border-radius: 15px; box-shadow: 0 6px #666;}.button:hover{background-color: #006CBA}.button:active{background-color: #006CBA; box-shadow: 0 2px #4CAECE; transform: translateY(4px);}</style><li><a href='clientsonly.html'><button class='button'>3. Kunder och deras närmsta serviceverkstad </button></a><br><br>");
    
    resp.write("<form action=representerarkund method='GET'>\n");
    resp.write("<br></br><style>body{color: white;} </style>Representant-ID (Persnr): <input type='text' name='representant'><br>\n");
    resp.write("<style>.button1 {background-color: white; color: black; border: 2px solid #008CBA;border-radius: 50%;padding: 5px; box-shadow: 0 4px #666; font-size: 14px;}<input type='submit' value='Ok'></style><button class='button button1'>OK</button>\n");
    resp.write("</form>\n");
    resp.end();
}
var sendNotFound = function(url, resp) {
    resp.statusCode = 404;
    resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><title>Not Found!</title>");
    resp.write("Kan inte hitta den sökta url:n " +url);
    resp.end();
}

//visar klienter och deras bilar/regnr
var sendClientCarList = function(resp) {
    var handleClientCarList = function(rows) {
        
        resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><title>Kundernas bilar</title>\n")
        resp.write("<head><style>body{background-color:#008CBA; color:#fff;}</style><br><p><h1><strong>Info om kund och vilken bil denne leasat</strong></h1></p><br></br><style>table, th, td{border: 1px solid black;}table {width:80%;}th{height: 50px;}th{text-align: center; color: #fff;}</style><table><tr><th>Kundens persnr</th><th>Kundens namn</th><th>Bilens reg-nr</th><th>Biltyp</th></tr>\n");
        
        for (i = 0; i < rows.length; i++) {
            resp.write("<tr><td>" + rows[i].kundpersnr+"</td><td>" + rows[i].kundnamn+"</td><td>" + rows[i].regnr+"</td><td>" + rows[i].bilnamn+"</td></tr>\n" );
        }
        
    resp.end("</table></body></head>");
        
    }
    
    var handleError = function (err) {
        resp.end("<!DOCTYPE html><meta charset = 'UTF-8'><title>Fel!</title> Det blev ett fel! " + err);
    }
    sqlConn.any('select kundpersnr, kundnamn, regnr, bil.bilnamn from (kund join bil on kund.kundpersnr=bil.bilhyrare)')
    .then(handleClientCarList)
    .catch(handleError);
}

//Denna var skickar sql för att merga salesman och client och skapa en clientlist med ansvarande salesman
var sendClientSalesman = function(resp) {
    var handleClientSalesman = function(rows) {
    resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><title>Kundlista</title>\n");
         resp.write("<br><p><h1><head><style>body{background-color:#008CBA; color:#fff;}</style><strong>Representant och dennes kunder</strong></h1></p><br></br><body><style>table, th, td{border: 1px solid black;}table {width:80%;}th{height: 50px;}th{text-align: center;}</style><table><tr><th>Namn på representant</th><th>Kundens namn</th><th>Representant ID</th></tr>\n");
    for (i = 0; i<rows.length; i++) {
        resp.write("<tr><td>" +rows[i].representantnamn+ "</td><td> " +rows[i].kundnamn+ "</td><td> " +rows[i].representantpersnr+ "</td></tr>\n");
       
    }
    resp.end("</head></body></table>");
    sqlConn.end();
    }
    var handleError = function(err) {
        resp.end ("<!DOCTYPE html><meta charset = 'UTF-8'><title>Fel!</title>Det blev fel!" + err);
    }
    sqlConn.any('select representant.representantnamn, kund.kundnamn, representant.representantpersnr from kund join representant on kund.representerasAv=representant.representantPersnr')
        .then(handleClientSalesman)
        .catch(handleError);
}

//kunder och deras närmsta bilverkstad
var sendClientslist = function(resp) {
    var handleClientslist = function(rows) {
    resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><title>Kunder och deras närmsta serviceverkstad</title>\n");
        resp.write("<br><h1><style>body{background-color:#008CBA; color:#fff;}</style>Kundinfo samt närmaste verkstad</h1></p><br></br><style>table, th, td{border: 1px solid black;}table {width:80%;}th{height: 50px;}th{text-align: center;}</style><table><tr><th>Kundens personnr</th><th>Kundens namn</th><th>Kundens adress</th><th>Kundens epost</th><th>Ort för kundens närmaste service verkstad</th></tr>\n");
    for (i = 0; i<rows.length; i++) {
        resp.write("<tr><td>" + rows[i].kundpersnr+ "</td><td> " +rows[i].kundnamn+"</td><td> "+rows[i].kundadress+ "</td><td> " +rows[i].kundepost+ "</td><td>"+rows[i].kundnarmasteserviceverkstad+"</td></tr>\n");
    }
    resp.end("</table>");
    sqlConn.end();
        
    }
    var handleError = function(err) {
        resp.end ("<!DOCTYPE html><meta charset = 'UTF-8'><title>Fel!</title>Det blev fel!" + err);
    }
    sqlConn.any('select * from kund')
        .then(handleClientslist)
        .catch(handleError);
}


//aktivt kunna manipulera sql query till databasen för att användaren ska kunna begära en försäljare och alla hans kunder
    
var sendKunder = function(representant, resp){
    var handleKunder = function(rows) {
        resp.write("<!DOCTYPE html><meta charset = 'UTF-8'><title> Kunder för " +representant+"</title>\n");
        resp.write("<head><style>body{background-color:#008CBA; color:#fff;}</style><h1> Kunder som representant med persnr "+representant+" har:</h1><body>");
        resp.write("<ul>\n");
        for (i = 0; i < rows.length; i++) {
            resp.write("<li>"+rows[i].kundnamn+"     "+rows[i].kundpersnr+"</li>\n");
        }
        resp.end("</ul></head></body>");
    }
    var handleError = function(err) {
        resp.end("<!DOCTYPE html><meta charset = 'UTF-8'><title>Fel!</title> Det blev ett fel! " + err);
    }
    sqlConn.any('select kund.kundnamn, kund.kundpersnr from kund join representant on representant.representantPersnr=kund.representerasAv where representantpersnr=$1', [representant])
    .then(handleKunder)
    .catch(handleError);
}

/*

Nedan följer kärn-hanterare, dessa sätter upp webbservern och hanterer de svar som functionerna ovan outputar och hanterar html-indexeringen korrekt på webservern

*/

var handleWebRequest = function(req, resp) {
    var parsed = url.parse(req.url, true);
    var param;

    for (param in parsed.query) {
        console.log("Parameter: "+param+", värde: "+parsed.query[param]);
    }
    
    if (req.url == "/" || req.url == "/index.html" ) {
        sendBasPage(resp);
    }
    else if (req.url == "/clientcarlist.html" ) {
        sendClientCarList(resp);
    }
    else if (req.url == "/clientsalesmanlist.html") {
        sendClientSalesman(resp);
    }
    else if (req.url == "/clientsonly.html") {
        sendClientslist(resp);
    }
    
    else if (parsed.pathname == "/representerarkund") {
        sendKunder(parsed.query.representant, resp);
    }
    else {
        sendNotFound(req.url, resp);
    }
}

/* Här skapas själva webserverapplikationen */

var httpConn = http.createServer(handleWebRequest);
var port = 8888;
httpConn.listen(port);
console.log("Inväntar att applikationen ska visas på http://"+ip.address() + ":" + port);
