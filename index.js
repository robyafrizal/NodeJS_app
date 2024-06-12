const express = require("express");
const app = express(); //app adl instance object dari express yang mengatur segala sesuatu terkait HTTP(baik req / res)
const bodyParser = require("body-parser");
let posts = require("./db/posts.json");
const port = 3000;

//app.Method() termasuk get,post,update,delete, berisi argumen path dan callback
//digunakan untuk menampilkan sebuah handler pada suatu endpoint tertentu
//endpoint adl ujung dari suatu network digunakan untuk menghandle request secara spesifik
//path adalah endpoint yang dipakai buat routing suatu request

app.use(express.json()); //Agar syntax json bisa dijalankan

console.log("------------------contoh_sederhana----------------------");
app.get("/", function (req, res) {
  res.status(200).send({
    header: req.headers["auth-token"],
    body: req.body,
    message: "Hello from get",
  });
  //method: send, status, JSON, sendFile, render
});
app.get("/product", (req, res) => {
  res.json(["Apple", "Redmi", "One Plus"]);
});
app.get("/order", (req, res) => {
  res.json([
    { id: 1, paid: false, user_id: 1 },
    { id: 2, paid: false, user_id: 1 },
  ]);
});

console.log("-----------------Run_di_Postman-----------------------");
//Biar bisa memparsing/mengirimkan file json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/posts", function (req, res) {
  res.status(200).json(posts);
});
app.get("/api/v1/post/:id", (req, res) => {
  const post = posts.find((i) => i.id == req.params.id);
  res.status(200).json(post);
});
app.post("/api/v1/posts", (req, res) => {
  const { title, body } = req.body;
  const id = ++posts[posts.length - 1].id;
  const post = { id, title, body };
  posts.push(post);
  // console.log(post);
  // console.log(posts);
  res.status(201).json(post);
});
app.delete("/api/v1/posts/:id", (req, res) => {
  const post = posts.filter((i) => i.id == req.params.id);
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == req.params.id) {
      delete posts[i];
    }
  }
  // console.log(post);
  // console.log(posts);
  res.status(200).json({
    message: `Data dengan id ${req.params.id} sudah berhasil dihapus`,
  });
});

//app.listen() wajib ada, untuk menyalakan web server ketika file dijalankan, berisi argumen port dan callback
app.listen(port, () => {
  console.log("Hello from listen on port:", port);
});

//routing digunakan untuk membuat semua request yang ada tidak dibebankan pada satu endpoint saja (request yang ada dihandle secara spesifik)
//syntax routing = app.Method(path,handler)
