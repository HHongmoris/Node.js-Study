const http = require("http");
// url 모듈 로딩
const url = require("url");

http.createServer((req, res)=> {
    //path명 할당
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if(path === "/user"){
        //user 함수 실행
        user(req, res);
    }else if(path === "/feed"){
        // feed 함수 실행
        feed(req, res);
    }else{
        // notFound 함수 실행
        notFound(req, res);
    }
}).listen("3000", ()=> console.log("라우터를 만들어보자!"));

const user = (req, res) => {
    res.end("[user] name : andy, age: 30");
};

const feed = (req, res) => {
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};