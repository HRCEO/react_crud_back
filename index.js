const express = require('express');
const app = express();
const cors = require('cors');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');

const db = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    database: 'reactCRUD',
    user: 'root',
    password: '123a',
    connectionLimit: 50,
    multipleStatements : true
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.send('Welcome to my back server');
})

app.get('/api/get',(req,res)=>{
    const sqlInsert = `SELECT * FROM movie_reviews`;
    db.query(sqlInsert,(result,err)=>{
        debugger;
        res.send(result)
    }).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    });
})

app.post('/api/insert',(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = `INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);`
    db.query(sqlInsert,[movieName, movieReview], (err,result)=>{
        res.send(result);
    }).then(()=>{
        console.log('ok');
    }).catch((err)=>{
        console.log(err);
    });
})


app.listen(3001,()=>{
    console.log('running on port 3001');
})