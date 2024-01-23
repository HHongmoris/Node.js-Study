// const { log } = require("console");
const http = require("http");

let count = 0;

const server = http.createServer((req, res)=>{
  // console.log((count += 1)); 
  log(count);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n");

  //prettier-ignore
  setTimeout(()=>{
    res.end("Node.js");
  }, 2000);
});

function log(count){
  console.log((count +=1));
}

// server.listen(8000, () => console.log("Hello Node.js"));
server.listen(8000);