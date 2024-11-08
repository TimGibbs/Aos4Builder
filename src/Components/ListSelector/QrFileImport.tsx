import {Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import jsQR from 'jsqr';
import List from "../../Types/ListTypes/List";
import { qrToList } from "../../Logic/listToQr";

export const QrFileImport: React.FC<{ setList: (t:List) => void; }> = ({ setList }) => {
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(()=>  {
        if(decodedText){
            setList(qrToList(decodedText))
        }
    },[decodedText, setList])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (context) {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                        if (qrCode) {
                            setDecodedText(qrCode.data); // Display the decoded QR code text
                        } else {
                            setDecodedText('No QR code found.');
                        }
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return <Form.Control type="file" accept="image/*" ref={inputRef} onChange={handleImageUpload} />

};

export default QrFileImport;