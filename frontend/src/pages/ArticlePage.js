import React from "react";
import { useParams } from "react-router-dom";

function ArticlePage() {

    const params = useParams();
    
    return(
        <>
            <h1>This is the { params.name }  article</h1>
        </>
    );

}

export default ArticlePage