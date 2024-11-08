import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import List from "../../Types/ListTypes/List";
import { listToQr } from "../../Logic/listToQr";

export const QrCodeModal: React.FC<{ show: boolean; onClose: () => void; list:List|undefined}> = ({ show, onClose, list }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if(!list) return;
        listToQr(list)
            .then(url => {
                setQrCodeUrl(url); // Set the generated QR code image URL
            })
            .catch(err => {
                console.error('Error generating QR code:', err);
            });
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
            <img src={qrCodeUrl} alt="QR Code" style={{ marginTop: '20px' }} />
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="primary" onClick={()=> copyToClipboard(text)}>
                {copiedText === text && <FaCheck />}
                {copiedText !== text && <FaCopy />}
            </Button>
        </Modal.Footer> */}
    </Modal>;
};


export default QrCodeModal;