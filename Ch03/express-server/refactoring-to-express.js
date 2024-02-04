const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {

    console.log("익스프레스로 라우터 리펙터링!");
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const user = url.parse(req.url, true).query;

    res.json(`[user] name : ${user.name}, age : ${user.age}`);
}

function feed(_, res) {
    // 교재에서는 res.json을 사용했지만
    // .json은 HTML 태그를 잘 인식하지 못함!
    // 따라서 여기서는 .send를 사용했다.    
    res.send(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
}