const http = require('http');
//const https = require('https');
//const fs = require("fs");
//const read = fs.readFileSync;
const express = require("express");

console.log("will serve on http port 80");

// Your app
let app = express();

var giveaways = {};
var channelLatest = {};

app.get('/join-giveaway/:channel/:key', (req, res) => {
    var response;
    if(!req.params.channel){
        response = 'Nightbot command not correct, channel must be passed.';
    }else if(!req.params.key){
        response = "Error! No giveaway key specified. e.g. '!new-multi-giveaway key'";
    }else{
        if(giveaways.hasOwnProperty(req.params.key)){
            response = `${req.params.key} giveaway joined by channel ${req.params.channel}! Use '!join' to enter!`;
        }else{
            giveaways[req.params.key] = {
                registeredUsers: [],
                winner: false
            };
            response = `${req.params.key} giveaway started! Use '!join' to enter!`
        }
        channelLatest[req.params.channel] = req.params.key;
    }
    console.log(response);
    res.send(response);
});

app.get('/register/:channel/:user', (req, res)=>{
    var response;
    if(!req.params.channel){
        response = 'Nightbot command not correct, channel must be passed.';
    }else{   
        if(!channelLatest.hasOwnProperty(req.params.channel)){
            response = "Channel has not joined a giveaway!";
        }else{
            const giveaway = giveaways[channelLatest[req.params.channel]];
            if(giveaway.winner){
                response = `Contest has ended.  Congrats to ${giveaway.winner}!`;
            }else if(giveaway.registeredUsers.indexOf(req.params.user) === -1){
                giveaway.registeredUsers.push(req.params.user);
                response = `Registered user ${req.params.user}!`;
            }else{
                response = `User ${req.params.user} already registered!`;
            }
        }
    }
    console.log(response);
    res.send(response);
});

app.get('/get-winner/:channel', (req, res) => {
    var response;
    if(!req.params.channel){
        response = 'Nightbot command not correct, channel must be passed.';
    }else{
        if(!channelLatest.hasOwnProperty(req.params.channel)){
            response = "Channel has not joined a giveaway!";
        }else{
            const giveaway = giveaways[channelLatest[req.params.channel]];
            if(giveaway.registeredUsers.length > 0){    
                if(!giveaway.winner){
                    var userIdx = Math.floor(giveaway.registeredUsers.length * Math.random());
                    var user = giveaway.registeredUsers[userIdx];
                    giveaway.winner = user;
                }
                response = `And the winner is...  ${giveaway.winner}!`;
            }else{
                response = "Nobody registered to win. :'(";
            }
        }
    }
    console.log(response);
    res.send(response);
});

app.get('/new-winner/:channel', (req, res) => {
    var response;
    if(!req.params.channel){
        response = 'Nightbot command not correct, channel must be passed.';
    }else{
        if(!channelLatest.hasOwnProperty(req.params.channel)){
            response = "Channel has not joined a giveaway!";
        }else{
            const giveaway = giveaways[channelLatest[req.params.channel]];

            if(giveaway.winner){
                console.log(`Removing old winner ${giveaway.winner}`);
                giveaway.registeredUsers.splice(
                    giveaway.registeredUsers.indexOf(giveaway.winner),
                    1
                );
                giveaway.winner = false;
            }

            if(giveaway.registeredUsers.length > 0){
                var userIdx = Math.floor(giveaway.registeredUsers.length * Math.random());
                var user = giveaway.registeredUsers[userIdx];
                giveaway.winner = user;
                response = `Ok, the new winner is...  ${giveaway.winner}!`;
            }else{
                response = "Ran out of registered users. :'(";
            }
        }
    }
    console.log(response);
    res.send(response);
});

app.get('/debug', (req, res) => {
    let response = {giveaways, channelLatest};
    console.log(response);
    res.send(JSON.stringify(response));
});

// HTTP server
http.createServer(app).listen(80);

// HTTPS server
// let certificate = read("./certs/website.crt", 'utf8');
// let chainLines = read("./certs/intermediate_domain_ca.crt", 'utf8').split("\n");
// let cert = [];
// let ca = [];
// chainLines.forEach(function(line) {
//   cert.push(line);
//   if (line.match(/-END CERTIFICATE-/)) {
//     ca.push(cert.join("\n"));
//     cert = [];
//   }
// });

// let httpsOptions = {
//   key: read('./certs/privatekey.key'),
//   cert: certificate,
//   ca: ca
// };

// secServer = https.createServer(httpsOptions, app);
// secServer.listen(443);
