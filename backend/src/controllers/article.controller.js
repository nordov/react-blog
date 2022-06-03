import { dbConnect } from "../services/db.service";
import { getSlug } from "../utils/helpers";

export const articleController = {
    // Quick check of API status
    status: (req, res) => res.json({ message: "API is running" }),

    // List all articles in db
    index:  async (req, res) => {
                try {

                    const db = await dbConnect();
                    const articles = await db.collection('articles').find({}).toArray();
                    db.s.client.close();

                    articles.length > 0 ?
                        res.status(200).json(articles) :
                        res.status(404).json({ error: "No articles found" });

                } catch (error) {
                    res.status(500).json({ error: "Error connecting to db" });
                }
            },

    // Finds article in db by the slug
    show:   async (req, res) => {
                try {
                    const db = await dbConnect();
                    const article = await db.collection('articles').findOne({ slug: req.params.slug });
                    db.s.client.close();

                    article ?
                        res.status(200).json(article) :
                        res.status(404).json({ error: "No articles found" });

                } catch (error) {
                    res.status(500).json({ error: "Error connecting to db" });
                }
            },

    // Saves a new article to the db
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
                    res.status(500).json({ error: "Error saving to db" });
                }
            },

    // Updates name and/or content of an existing article
    update: async (req, res) => {
                try {
                    const slug = getSlug(req.body.title);

                    const db = await dbConnect();
                    const result = await db.collection('articles')
                                            .updateOne( 
                                                { slug: req.params.slug },
                                                { $set: { 
                                                    'title': req.body.title, 
                                                    'content': req.body.content,
                                                    'slug': slug,
                                                } },
                                            );

                    const article = await db.collection('articles').findOne({ slug: slug });
                    db.s.client.close();

                    if ( !result.modifiedCount ) {
                        console.log("No changes");
                        return res.status(500).json({ error: "No record was modified." });
                    }

                    if (!article) {
                        return res.status(500).json({ error: "Unknown error happened." });
                    }

                    res.status(201).json(article);

                } catch (error) {
                    res.status(500).json({ error: "Error connecting to db" });
                }
            },

    // Deletes from DB and existing article
    delete: async (req, res) => {
                try {
                    const db = await dbConnect();
                    const article = await db.collection('articles').find({ slug: req.params.slug }).toArray();


                    if (!article.length) {
                        return res.status(404).json({ error: "No articles found" });
                    }

                    await db.collection('articles').deleteOne({ slug: req.params.slug });
                    db.s.client.close();

                    res.status(200).json(article);


                } catch (error) {
                    res.status(500).json({ error: "Error connecting to db" });
                }
            },
};