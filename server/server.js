require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.DATABASE_URL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: false
})
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: 'tasks',
//     multipleStatements: false
// })
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/', (req, res) => {
    // simple query
    con.query(
        'SELECT * FROM `ListTasks`',
        function(err, results, fields) {
            if(err) console.log(err)
            res.json(results)    
        }
    );
    
})

app.post('/', (req,res) => {
    const jsonData = req.body
    const onlyLettersPattern = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9_\- ]*$/;

    if(!jsonData.taskTitle.match(onlyLettersPattern)){
        return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }

    if(!jsonData.taskDescription.match(onlyLettersPattern)){
        return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }
    const SQL = 'INSERT INTO `ListTasks` (taskTitle, taskDescription, taskDate) VALUES (?,?,?)'

    con.query(
        SQL, [jsonData.taskTitle,jsonData.taskDescription, jsonData.taskDate],
        function(err, results, fields) {
            if(err) console.log(err)
            return
        }
    );
    res.json({status: "Created"})
})

app.put('/', (req,res) => {
    const jsonData = req.body
    const onlyLettersPattern = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9_\- ]*$/;

    if(isNaN(Number(jsonData.taskID))) {
        return res.status(400).json({ err: "Numbers only, please!"})
    }

    if(!jsonData.taskTitle.match(onlyLettersPattern)){
        console.log('No special characters and no numbers on taskTitle, please!')
        return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }

    if(!jsonData.taskDescription.match(onlyLettersPattern)){
        console.log('No special characters and no numbers on taskDescription, please!')
        return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }

    const SQL = 'UPDATE `ListTasks` SET taskTitle=?, taskDescription=? WHERE taskID=?'
    con.query(
        SQL, [jsonData.taskTitle,jsonData.taskDescription,jsonData.taskID],
        function(err, results, fields) {
            if(err) console.log(err)
        }
    );
    res.json({'status':"updated"})
})

app.delete('/', (req,res) => {
    const jsonData = req.body

    if(isNaN(Number(jsonData.taskID))) {
        return res.status(400).json({ err: "Numbers only, please!"})
    }

    const SQL = 'DELETE FROM `ListTasks` WHERE taskID=?'
    
    con.query(
        SQL,[jsonData.taskID],
        function(err, results, fields) {
            if(err) console.log(err)
            res.json({"status":"removed"})
        }
    );
    
})

app.listen(3000, () => {
    console.log("running at port 3000....")
})