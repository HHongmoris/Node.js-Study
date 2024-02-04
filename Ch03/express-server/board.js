const express = require("express");
const app = express();
// 게시글 리스트로 사용할 posts에 빈 리스트 할당
let posts = [];

// req.body를 사용하려면 JSON 미들웨어 사용해야함
// 사용하지 않으면 undefined로 반환
app.use(express.json());    //JSON 미들웨어 활성화

// POST 요청 시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true}));  //JSON 미들웨어와 함께 사용

app.get("/", (req, res) => {
    res.json(posts);        //게시글 리스트를 JSON 형식으로 보여줌
});

app.post("/posts", (req, res) => {
    // HTTP 요청의 body 데이터를 변수에 할당
    const {title, name, text} = req.body; 

    // 게시글 리스트에 새로운 게시글 추가
    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date()});
    res.json({ title, name, text});
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;   // app.delete에 설정한 path 정보에서 id 가져옴

    //글 삭제 로직
    const filteredPosts = posts.filter((post) => post.id !== +id);
    //삭제 확인
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;

    if(isLengthChanged){
        //posts의 데이터 개수가 변경되었으면 삭제 성공
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});

app.listen(3000, ()=> {
    console.log("welcome posts START!!");
})