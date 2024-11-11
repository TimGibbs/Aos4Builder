import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import useSavedLists from "../../Hooks/useSavedLists";
import React, { useCallback, useState } from "react";
import TextImport from "./TextImport";
import QrFileImport from "./QrFileImport";
import QrScanner from "./QrScanner";
import List from "../../Types/ListTypes/List";
import DisplayListAsText from "../DisplayListAsText";

export const ImportListModal: React.FC<{ show: boolean; onClose: () => void; }> = ({ show, onClose }) => {
    const { addList } = useSavedLists();
    const [content, setContent] = useState<List | null>(null);

    const handleClose = (): void => {
        setContent(null);
        onClose();
    };

    const handleSave = (): void => {
        if(content){
            addList(content);
            setContent(null);
        }   
        onClose();
    };

    const setFn = useCallback((s:List | null)=>setContent(s),[setContent])

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Import List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DisplayListAsText list={content} />
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="text" title="Text">
                    <TextImport setList={setFn} />
                </Tab>
                <Tab eventKey="qr" title="QR">
                    <QrFileImport setList={setFn} />
                </Tab>
                <Tab eventKey="qrscan" title="QR Scan">
                    <QrScanner setList={setFn} />
                </Tab>
            </Tabs>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>;
};

export default ImportListModal;