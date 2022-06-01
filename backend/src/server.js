import express from "express";
import bodyParser from 'body-parser';
import { MongoClient } from "mongodb";
import keys from "../config/keys";
import { param } from "express/lib/request";
import { getSlug } from "../helpers/helpers";
import { query } from "express";

const app = express();

const mongoDB = require('../config/keys').mongoURI;
const dbConnect = async () => {
    const client = await MongoClient.connect(mongoDB, { useNewUrlParser: true });
    return client.db('my-blog');
};

app.use(bodyParser.json());


// GET all articles
app.get('/api/article/', async ( req, res ) => {
    try {
        
        const db = await dbConnect();
        const articles = await db.collection('articles').find({}).toArray();
        db.s.client.close();

        articles.length > 0 ?
            res.status(200).json(articles):
            res.status(404).json({ message: "No articles found" });

    } catch( error ) {
        res.status(500).json({ message: "Error connecting to db", error });
    }
});

// GET a article by name
app.get('/api/article/:name', async (req, res) => {
    try {


        

        // const db = await dbConnect();
        // const article = await db.collection('articles').find({ title: name }).toArray();
        // db.s.client.close();

        // articles.length > 0 ?
        //     res.status(200).json(article) :
        //     res.status(404).json({ message: "No articles found" });

    } catch (error) {
        res.status(500).json({ message: "Error connecting to db", error });
    }
});

// POST a new article
app.post('/api/article/', async ( req, res ) => {
    try{
        // let article = {};
        // const slug = getSlug(req.body.title);

        // const db = await dbConnect();
        const query = await db.collection('articles').find({ slug: slug }).toArray();
        let index = 1;
        // console.log(query.length);
        while ( await query.length > 1) {
            
            console,log("is in");
            slug = slug + index.toString();
            query = await db.collection('articles').find({ slug: slug }).toArray();
            // console.log(slug);
            index = index + 1;
        };

        
        // if ( req.body.title && req.body.content ) {

        //     article = {
        //         "title": req.body.title,
        //         "content": req.body.content,
        //         "upvotes": 0,
        //         "comments": {},
        //         "slug": getSlug(req.body.title),
        //     }

        // } else {
        //     res.status(400).json({ message: "Missing values" });
        // }

        
        // await db.collection('articles').insertOne(article);
        // db.s.client.close();

        // res.status(201).json(article);

    } catch (error) {
        res.status(500).json({ message: "Error saving to db", error });
    }
});

// app.get('/api/article/', async (req, res) => {
//     try {
//         const articleName = req.params.name;

//         const client = await MongoClient.connect(mongoDB, { useNewUrlParser: true });



//         const db = client.db('my-blog');

//         console.log(db);
//         res.send("Success");

//     } catch (error) {
//         res.status(500).json({ message: "Error connecting to db", error });
//     }
// });

app.get('/hello', (req, res) => res.send("Hello!"));
app.get('/hello/:name', (req, res) => res.send(`Hello ${ req.params.name }`));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, () => console.log("Listening on Port 8000"));
