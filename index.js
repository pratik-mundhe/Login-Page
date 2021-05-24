const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const loginid = req.body.id;
    const password = req.body.password;
    const email = req.body.email;
    // console.log(loginid, password, email);

    const data = {             
        members: [{           
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: loginid,
                LNAME: password,
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us19.api.mailchimp.com/3.0/lists/ad5e4ce24e";

    const options = {
        method: "POST",           
        auth: "pratik:c6c761500a7c5b1e464430efd898d41d-us19"
    }

    const request = https.request(url, options, function(response) { 
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            // console.log(JSON.parse(data));
        });
    });

    

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});



