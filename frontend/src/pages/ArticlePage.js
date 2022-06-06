import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function ArticlePage() {

    const slug = useParams().slug;
    const [ error, setError ] = useState({ status: false, message: "" });
    const [ articleData, setArticleData ] = useState({ 
                                                        title: "",
                                                        content: "",
                                                        upvotes: 0,
                                                        comments: [],
                                                    });

    useEffect( () => {
        
        const fetchData = async () => {

            const result = await fetch(`/api/article/${ slug }`);
            const body = await result.json();

            body.error ? setError({ status: true, message: body.error }) : setArticleData( body );
            console.log(body.error);
            console.log( error );

        };

        
        fetchData();
                

    }, [ slug ]);

    if ( error.status )
        return ( <NotFoundPage /> );

    return(
        <>
            <h1>This is the { articleData.title } article</h1>
            <p>This article has been upvoted { articleData.upvotes } times.</p>
        </>
    );

}

export default ArticlePage