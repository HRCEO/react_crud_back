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

app.get('/api/get',cors(),(req,res)=>{
    const sqlInsert = `SELECT * FROM movie_reviews`;
    db.query(sqlInsert,(result,err)=>{
        res.send(result)
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    });
})

app.post('/api/insert',cors(),(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = `INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);`
    db.query(sqlInsert,[movieName, movieReview], (err,result)=>{
        res.send(result);
    }).then(()=>{
        res.send('OK')
    }).catch((err)=>{
        res.send(err)
    });
})

app.put('/api/update',cors(),(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = `UPDATE movie_reviews SET movieReview =? WHERE movieName =?`

    db.query(sqlUpdate, [review,name],(err,result)=>{
        if (err) console.log(err);
    })
})

app.delete("/api/delete/:movieName",cors(),(req,res)=>{
    const name = req.params.movieName;
    const sqlDelete = `DELETE FROM movie_reviews WHERE movieName=?`

    db.query(sqlDelete,name,(err,result)=>{
        if(err) console.log(err);
    }).then(()=>{
        console.log('Delete Movie Review Succeed')
    }).catch((err)=>{
        console.log('Delete Err :',err);
    })

})

app.listen(3001,()=>{
    console.log('running on port 3001');
})
