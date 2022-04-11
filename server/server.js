
import fetch from "node-fetch";
import express from 'express';

const app = express();
const port = 9000;

//cors
import cors from 'cors';
app.use(cors());
// routes will go here

app.get('/server', function(req, response) {
    const user_id = req.query.id;
    const token = req.query.token;
    const params = {
        otp : token,
        userid : user_id,
        key : 'c072628bd2d07bf355e74babeb5ef9995c2dc7c5JwxEJjL1TkyMofQxMUe2gCdf1'
    }
    var url = new URL("https://textbelt.com/otp/verify");
    url.search = new URLSearchParams(params);
    url = url.toString();
    console.log("The URL trying to connect"+url);
    fetch(url, {
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            response.send(res);
        });
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);