const http = require("http");
// url 모듈 로딩
const url = require("url");

http.createServer((req, res)=> {
    //path명 할당
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if(path === "/user"){
        res.end("[user] name : andy, age: 30");
    }else if(path === "/feed"){
        res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
            </ul>`);
    }else{
        res.statusCode = 404;
        res.end("404 page not found");
    }
}).listen("3000", ()=> console.log("라우터를 만들어보자!"));