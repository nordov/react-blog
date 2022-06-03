import express from "express";
import { articleController } from '../controllers/article.controller';
import { voteController } from '../controllers/vote.controller';


module.exports = function( app ) {
    app.use(express.json());

    // Articles
    app.get( '/api', articleController.status );
    app.get( '/api/article/', articleController.index );
    app.get( '/api/article/:slug', articleController.show );
    app.post( '/api/article/', articleController.create );
    app.put( '/api/article/:slug', articleController.update );
    app.delete( '/api/article/:slug', articleController.delete );

    // Upvotes
    app.put( '/api/article/upvote/:slug', voteController.upvote );
}