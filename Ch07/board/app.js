const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

// MongoDB 연결 함수
const mongodbClient = require("./configs/mongodb-connection");
const mongodbConnection = require("./configs/mongodb-connection");

const postService = require("./services/post-service");

const { ObjectId } = require("mongodb");

// 템플릿 엔진으로 핸들바 등록
// app.engine("handlebars", handlebars.engine());
app.engine(
    "handlebars", 
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);

// 웹 페이지 로드 템플릿 엔진 설정
app.set("view engine", "handlebars");
// 뷰 디렉터리 설정
app.set("views", __dirname + "/views");


// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 라우터
// app.get("/", (req, res) => {
//     res.render("home", {title: "테스트 게시판", message: "반가워"});
// });

// 리스트 페이지
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        // postService.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    }catch (error){
        console.error(error);
        res.render("home", {title: "테스트 게시판"});   //에러 날 경우 빈 값으로 렌더링
    }
});
    
app.get("/write", (req, res) => {
    res.render("write", {title: "테스트 게시판", mode: "create"});
});

// 상세 페이지
// app.get("/detail/:id", async (req, res) => {
//     res.render("detail", {
//         title: "테스트 게시판",
//     });
// });
app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

// 글쓰기 api
app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
    // res.redirect(`/detail/1`);
});

// 패스워드 체크
app.post("/check-password", async (req, res) => {
    const {id, password} = req.body;
    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if(!post) {
        return res.status(404).json({ isExist: false });
    }else{
        return res.json({ isExist: true });
    }
});


// 수정 페이지 이동
app.get("/modify/:id", async (req, res) => {
    const {id} = req.params.id;
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "테스트 게시판", mode: "modify", post});
});

// 게시글 수정
app.post("/modify/", async (req, res) => {
    const {id, title, writer, password, content} = req.body;
    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };
    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
})


// 게시글 삭제
app.delete("/delete", async (req, res) => {
    const {id, password} = req.body;
    try{
        const result = await collection.deleteOne({ _id: ObjectId(id), password: password});
        if(result.deletedCount !== 1){
            console.log("삭제 실패!");
            return res.json({ isSuccess: false});
        }
        return res.json({ isSuccess: true});
    }catch (error){
        console.error(error);
        return res.json({ isSuccess: false});
    }
});



// 댓글 추가
app.post("/write-comment", async (req, res) => {
    const {id, name, password, comment} = req.body;
    const post = await postService.getPostById(collection, id);

    if(post.comments){
        post.comments.push({
            idx: post.comments.length +1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    }else{
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});


// 댓글 삭제
app.delete("/delete-comment", async (req, res) => {
    const { id, idx, password } = req.body;
    const post = await collection.findOne(
        {
            _id: ObjectId(id),
            comments: { $elemMatch: {idx: parseInt(idx), password}},
        },
        postService.projectionOption,
    );

    if(!post){
        return res.json({ isSuccess: false});
    }

    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    return res.json({ isSuccess: true});
});

// app.listen(3000);

let collection;
app.listen(3000, async () => {
    console.log("Server started");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("post");
    console.log("MongoDB Connected");
});