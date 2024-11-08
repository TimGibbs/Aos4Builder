import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import List from "../../Types/ListTypes/List";
import listToText from '../../Logic/listToText';
import { useCopyToClipboard } from "usehooks-ts";
import { FaCheck, FaCopy  } from "react-icons/fa";
import DisplayListAsText from "../DisplayListAsText";

export const DisplayListModal: React.FC<{ show: boolean; onClose: () => void; list:List|undefined}> = ({ show, onClose, list }) => {
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if(!list) return;
        setText(listToText(list))
    }, [list]);
    
    if(!list) return <></>;

    const handleClose = (): void => {
        onClose();
    };
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{list.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DisplayListAsText list={list} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=> copyToClipboard(text)}>
                {copiedText === text && <FaCheck />}
                {copiedText !== text && <FaCopy />}
            </Button>
        </Modal.Footer>
    </Modal>;
};


export default DisplayListModal;