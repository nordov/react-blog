import express from "express";

// todo: remove bodyparser

const app = express();
require( './routes/routes' )( app );

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on Port ${ port }`));
