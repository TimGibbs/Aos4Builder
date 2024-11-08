import { Form } from "react-bootstrap";
import React, { ChangeEvent, useEffect, useState } from "react";
import List from "../../Types/ListTypes/List";
import textToList from "../../Logic/textToList";

export const TextImport: React.FC<{ setList: (t:List) => void; }> = ({ setList }) => {
    const [content, setContent] = useState<string>("");

    useEffect(()=>{
        if(content && content.length>0){
            setList(textToList(content))
        }
    },[content, setList])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    return  <Form.Control as="textarea" rows={8} value={content} onChange={handleInputChange} />
};

export default TextImport;