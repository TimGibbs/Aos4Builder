import React, { useEffect, useState } from "react";
import List from "../Types/ListTypes/List";
import listToText from '../Logic/listToText';

export const DisplayListAsText: React.FC<{ list:List | null}> = ({ list }) => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if( !list) return;
        setText(listToText(list))
    }, [list]);
    
    if(!list) return <></>;
    return <p style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{__html: text}}/>
};


export default DisplayListAsText;