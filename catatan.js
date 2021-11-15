const express = require("express");
const bodyParser = require("body-parser");

const Pool = require("pg").Pool;
const app = express();
const port = 3003;

// const db = new Pool({
//   user: "cnmdarcyrltovx",
//   host: "ec2-54-83-55-122.compute-1.amazonaws.com",
//   database: "d59giflsthop75",
//   password: "71e70d2c138c872aeaf3564a8a9d1661e7e3d95956d80ea3f8454f0e892a1fd6",
//   port: 5432,
//   ssl: true,
// });

const db = new Pool({
  user: "yyuxogekzdymfz",
  host: "ec2-3-226-59-11.compute-1.amazonaws.com",
  database: "d7jhvhv1lhhi7q",
  password: "fae34528deb3add322becd64fe769fb79f77b2984a1c1b0e31bb188ca50eede3",
  port: 5432,
  //   ssl: true,

  ssl: {
    rejectUnauthorized: false,
  },
});

let data = [
  {
    // id:Number(new Date),
    id: 1572072997496,
    nama: "Mirana",
    umur: 77,
    alamat: "qwe",
  },
  {
    // id:Number(new Date),
    id: 1572072997499,
    nama: "LIna",
    umur: 72,
    alamat: "qwe",
  },
];
app.use(bodyParser());

//get semua data
app.get("/zxc/", async (req, res) => {
  const resData = await db.query("select * from company");
  console.log(resData.rows);
  res.json(resData.rows);
});

//get dengan spesifik id
app.get("/zxc/:id", async (req, res) => {
  const id = req.params.id;
  const resData = await db.query(`select * from testing2 where id = ${id}`);
  // const obj = data.find(item=>item.id == id)
  // console.log(req.params)
  // res.json(obj)
  res.json(resData.rows);
});

//post tambah data
app.post("/zxc/", async (req, res) => {
  // res.json('mode spot')
  // const {nama, umur, alamat}  = req.body
  const { umur, alamat } = req.body;
  // const id = Number(new Date)
  console.log(req.body);
  // const resData = await db.query(`insert into testing2 (nama, umur, alamat) values ('${nama}', ${umur}, '${alamat}')`)
  const resData = await db.query(
    `insert into testing2 (umur, alamat) values ('${umur}, '${alamat}')`
  );
  // data.push({id, nama, umur, alamat})
  res.json("Data berhasil ditambahss");
});

//put edit data
app.put("/zxc/:id", async (req, res) => {
  const { nama, umur, alamat } = req.body;
  const id = req.params.id;
  // const index = data.findIndex(item=>item.id == id)
  // data[index] = {id:data[index].id ,nama, umur, alamat,}
  const resData = await db.query(
    `update testing2 set nama = '${nama}', umur = ${umur}, alamat = '${alamat}' where id = ${id};`
  );
  res.json("data berhasil diubahs");
});

//delete
app.delete("/zxc/:id", async (req, res) => {
  const id = req.params.id;
  const resData = await db.query(`delete from testing2 where id = ${id}`);
  // const newData = data.filter(item => item.id != id )
  // data = newData
  res.json("Data terhapus");
});

app.listen(port, () => console.log("localhost:3003"));

//note
// 1. tanpa async program tidak bisa di run
// 2. tanpa querry dari program, request dari browser atau postman yang dirunning tidak memberi kejelasan, ngerun wae ga ngasih apa2
// 3. querry harus betul ( ya iyalah :| ) maksudnya jika nemu error column "zxcxcz" does not exist berarti querrynya tambah (') petik atau semacamnya (just in case), aslinya ga semua error solusinya cuma itu aja, adaptasilah
// 4. seeperti biasa yang update kalo misalkan salah satu body di postman ex: alamat dihilangkan datanya jadi undifined
