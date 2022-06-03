import { dbConnect } from "../services/db.service";

export const voteController = {
    // Quick check of API status
    status: (req, res) => res.json({ message: "API is running" }),

    // Saves a new article to the db
    upvote: async (req, res) => {
                try {
                    const slug = req.params.slug;

                    const db = await dbConnect();
                    const article = await db.collection('articles').findOne({ slug: slug });
                    
                    if (!article) {
                        return res.status(200).json({ error: "Article not found" });
                    }

                    article.upvotes++;

                    await db.collection('articles').updateOne({ slug: slug }, { $set: { 'upvotes': article.upvotes } } );
                    db.s.client.close();
                    res.status(201).json(article);

                } catch (error) {
                    res.status(500).json({ error: "Error saving to db" });
                }
            },

};