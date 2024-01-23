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

//매개변수에 따라 동적으로 응답이 변하게
const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    //쿼리 스트링 데이터를 userInfo에 할당
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
    //결과값으로 이름과 나이 설정
};