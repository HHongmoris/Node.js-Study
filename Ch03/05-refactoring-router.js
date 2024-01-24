const http = require("http");
// url 모듈 로딩
const url = require("url");

http.createServer((req, res)=> {
    //path명 할당
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");
    // if(path === "/user"){
    //     //user 함수 실행
    //     user(req, res);
    // }else if(path === "/feed"){
    //     // feed 함수 실행
    //     feed(req, res);
    // }else{
    //     // notFound 함수 실행
    //     notFound(req, res);
    // }
    // urlMap에 path가 있는지 확인
    if(path in urlMap){
        //urlMap에 path값으로 매핑된 함수 실행
        urlMap[path](req, res);
    }else{
        notFound(req, res);
    }
}).listen("3000", ()=> console.log("라우터 리펙터링!"));


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

// 라우터 규칙 매핑 키로 path가 들어가고 값에 함수를 할당
const urlMap = {
    "/": (req, res) => res.end("HOME"),
    "/user": user,
    "/feed": feed,
};