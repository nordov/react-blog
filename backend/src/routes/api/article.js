import { MongoClient } from "mongodb";
import keys from "../../../config/keys";
import { param } from "express/lib/request";
import { getSlug } from "../../../helpers/helpers";
import { query } from "express";

// todo: remove db to its own location
const mongoDB = keys.mongoURI;
const dbConnect = async () => {
    const client = await MongoClient.connect(mongoDB, { useNewUrlParser: true });
    return client.db('my-blog');
};

export const articleApi = {
    status: (req, res) => res.json({ message: "API is running" }),


    index:  async (req, res) => {
                try {

                    const db = await dbConnect();
                    const articles = await db.collection('articles').find({}).toArray();
                    db.s.client.close();

                    articles.length > 0 ?
                        res.status(200).json(articles) :
                        res.status(404).json({ message: "No articles found" });

                } catch (error) {
                    res.status(500).json({ message: "Error connecting to db", error });
                }
            },


    show:   async (req, res) => {
                try {
                    const db = await dbConnect();
                    const article = await db.collection('articles').find({ slug: req.params.slug }).toArray();
                    db.s.client.close();

                    article.length > 0 ?
                        res.status(200).json(article) :
                        res.status(404).json({ message: "No articles found" });

                } catch (error) {
                    res.status(500).json({ message: "Error connecting to db", error });
                }
            },


    create: async (req, res) => {
                try {

                    if (!(req.body.title && req.body.content)) {
                        return res.status(200).json({ error: "Missing values" });
                    }

                    const slug = getSlug(req.body.title);

                    const db = await dbConnect();
                    const query = await db.collection('articles').find({ slug: slug }).toArray();

                    if (query.length) {
                        return res.status(200).json({ message: "Article already exists" });
                    }

                    const article = {
                        "title": req.body.title,
                        "content": req.body.content,
                        "upvotes": 0,
                        "comments": {},
                        "slug": slug,
                    }

                    await db.collection('articles').insertOne(article);
                    db.s.client.close();
                    res.status(201).json(article);

                } catch (error) {
                    res.status(500).json({ message: "Error saving to db", error });
                }
            },

    delete: async (req, res) => {
                try {
                    const db = await dbConnect();
                    const article = await db.collection('articles').find({ slug: req.params.slug }).toArray();


                    if (!article.length) {
                        return res.status(404).json({ message: "No articles found" });
                    }

                    await db.collection('articles').deleteOne({ slug: req.params.slug });
                    db.s.client.close();

                    res.status(200).json(article);


                } catch (error) {
                    res.status(500).json({ message: "Error connecting to db", error });
                }
            },
};










