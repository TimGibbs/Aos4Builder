import { Button, Modal, Form } from "react-bootstrap";
import useSavedLists from "../../Hooks/useSavedLists";
import React, { ChangeEvent, useState } from "react";

export const NewListModal: React.FC<{ show: boolean; onClose: () => void; }> = ({ show, onClose }) => {
    const { createList, addList } = useSavedLists();
    const [name, setName] = useState<string>("");


    const handleClose = (): void => {
        setName("");
        onClose();
    };

    const handleSave = (): void => {
        addList({ ...createList(), name: name });
        setName("");
        onClose();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control type="text" placeholder="name" value={name} onChange={handleInputChange} />
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

export default NewListModal;