const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

var arr = [];
var jsonData = {
    name : "",
    email :"",
    gender: "",
    location : {
        city : "",
        state: "",
        country: "",
    },
    picture : {
        large:"",
        medium : "",
        thumbnail : ""
    }
}

app.get("/hello", (req, res)=> {
    res.send("Hello World")
})

axios.get("https://randomuser.me/api/?results=5")
    .then((res)=>{
        var results = res.data.results;
        console.log(results.length)
        for( let i = 0 ; i<= results.length; i++){
            jsonData = {};
            var obj = results[i];
            console.log(results[i].name["title"] + " " + results[i].name["first"] + " " + results[i].name["last"])
            jsonData.name = obj.name["title"] + " " + obj.name["first"] + " " + obj.name["last"];
            jsonData.email = obj.email;
            jsonData.gender = obj.gender;
            jsonData.location = {
                "city" : obj.location["city"],
                "state" : obj.location["state"],
                "country" : obj.location["country"],
            };
            jsonData.picture = {
                "large" : obj.picture["large"],
                "medium" : obj.picture["medium"],
                "thumbnail" : obj.picture["thumbnail"],
            };
            arr.push(jsonData);
        }
        
    })
    .catch((err)=> {
        console.log(err.message)
    })


app.get("/userDetails", (req, res)=> {
    res.json(arr);
})
app.listen(8000, () => console.log("Server is running in port 8000") );
