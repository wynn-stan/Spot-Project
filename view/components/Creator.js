import React from "react";
import FooterNav from "./FooterNav";
import { Editor } from "react-draft-wysiwyg";

function Creator(){
    return (
        <>
            <Editor />
            <FooterNav />
        </>
    )
}

export default Creator;