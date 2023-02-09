const express = require('express')
const app = express()
const mysql = require('mysql2');
const cors = require("cors");

const jwt = require('jsonwebtoken');
const jwtkey = 'dentist_24';

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "ciacloud.in",
    user: "diitremote",
    password: "%TGBbgt5",
    database: "bravo"
  });

  app.post("/login", async(req, res) => {
    const user = {
        email : req.body.email,
        password : req.body.password
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
  })

app.post('/register', (req, res) => {
   console.log(req.body)
   res.json({status:'ok'})
  });

   app.get('/', (req, res) => {
        res.send("Hello World");
  });

  app.post('/create', (req, res) => {
    const name = req.body.name
    const contact = req.body.contact
    const address = req.body.address
    const email = req.body.email
    const age = req.body.age
    const disability = req.body.disability
    const gender = req.body.gender


    con.query('INSERT INTO patients (name, contact, address, email, age, disability, gender) VALUES (?,?,?,?,?,?,?)', 
    [name, contact, address, email, age, disability, gender], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("values inserted")
        }
    }
    );
  });

  app.get('/listing', (req, res) => {
    
    con.query('SELECT * FROM  patients', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
  });
  });
 
  app.put('/update/:id', (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;
    const email = req.body.email
    const age = req.body.age
    const disability = req.body.disability
    const gender = req.body.gender

    con.query("UPDATE patients SET name = ?, address = ?, contact = ?, email = ?, age = ?, disability = ?, gender = ? WHERE id = ?", [ name,address, contact, email, age, disability, gender, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send({id:id, name: name, address: address, contact: contact})
        }
    })
  })

 app.delete('/delete/:id',(req, res) =>{
    const id = req.params.id
    con.query("DELETE FROM patients WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err)
        }else{
            res.send(result)
        }
    })
 })

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running");
});