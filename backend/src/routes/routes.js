import express from "express";
import { articleApi } from './api/article';


module.exports = function( app ) {
    app.use(express.json());

    app.get( '/api', articleApi.status );
    app.get( '/api/article/', articleApi.index );
    app.get('/api/article/:slug', articleApi.show);
    app.post('/api/article/', articleApi.create);
    app.delete('/api/article/:slug', articleApi.delete);
}