const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

// 글쓰기
// 글쓰기 함수
async function writePost(collection, post){
  post.hits = 0;
  post.createdDt = new Date().toISOString();
  return await collection.insertOne(post);  //collection의 insertOne()함수 사용, 결과는 프로미스로 반환됨
};

// 글 목록
async function list(collection, page, search){
  const perPage = 10;
  // title과 찾은 부분 일치하는지
  const query = {title: new RegExp(search, "i")};
  // limit 10개, skip은 설정된 만큼 건너뜀
  const cursor = collection.find(query, {limit: perPage, skip: (page-1) * perPage}).sort({
    createdDt: -1,
  });
  // 검색어에 나오는 게시물 총합
  const totalCount = await collection.count(query);
  // 커서로 데이터를 리스트로 변경
  const posts = await cursor.toArray();
  // paginator 생성
  const paginatorObj = paginator({totalCount, page, perPage: perPage});
  return [posts, paginatorObj];
}

// 글 상세 조회
const projectionOption = {
  projection: {
    password: 0,
    "comments.password": 0,
  },
};

async function getDetailPost(collection, id){
  return await collection.findOneAndUpdate({ _id: ObjectId(id)}, { $inc: { hits: 1}}, projectionOption);
}

// 게시글 수정!
// 아이디 체크
async function getPostByIdAndPassword(collection, {id, password}) {
  return await collection.findOne({ _id: ObjectId(id), password: password}, projectionOption);
}
//id 맞는 데이터 불러오기
async function getPostById(collection, id){
  return await collection.findOne({ _id: ObjectId(id)}, projectionOption);
}
// 게시글 수정
async function updatePost(collection, id, post){
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({_id: ObjectId(id)}, toUpdatePost);
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  updatePost,
  getPostById,
  getPostByIdAndPassword,
};