import React, { useEffect, useRef, useState } from "react";
import jsQR from 'jsqr';
import List from "../../Types/ListTypes/List";
import { qrToList } from "../../Logic/listToQr";

export const QrScanner: React.FC<{ setList: (s: List | null) => void; }> = ({ setList }) => {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [videoActive, setVideoActive] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 

    useEffect(() => {
        if (qrCodeData) {
            const list = qrToList(qrCodeData);
            setList(list);
        }
    }, [qrCodeData, setList]);

    useEffect(() => {
        const video = videoRef.current;

        const startVideo = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'environment' }, // Use the back camera (on phones)
                    });
                    if (video) {
                        video.srcObject = stream;

                        // Ensure the video dimensions are loaded before playing
                        video.addEventListener('loadedmetadata', () => {
                            video.play();
                        });
                    }
                } catch (err) {
                    console.error('Error accessing camera: ', err);
                    setErrorMessage("Error accessing camera: Please allow camera access or try a different device.");
                }
            } else {
                setErrorMessage("No camera available or browser does not support camera access.");
            }
        };

        if (videoActive) {
            startVideo();
        }

        // Cleanup when component unmounts or scanning stops
        return () => {
            if (video && video.srcObject) {
                const tracks = (video.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [videoActive]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        const scanQRCode = () => {
            if (canvas && video) {
                const ctx = canvas.getContext('2d');
                if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
                    // Set canvas size to match video size
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    // Draw the current video frame onto the canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    // Decode the QR code from the image data using jsQR
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        setQrCodeData(code.data); // If QR code is found, update the state
                        setIsScanning(false); // Stop scanning when a QR code is found
                        setVideoActive(false); // Stop video when a QR code is found
                    }
                }
            }
        };

        if (isScanning) {
            const interval = setInterval(scanQRCode, 100); // Scan every 100ms
            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [isScanning]);

    const handleStartScan = () => {
        setList(null)
        setQrCodeData(null);
        setErrorMessage(null); // Clear any previous errors
        setIsScanning(true);
        setVideoActive(true);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {!videoActive && !qrCodeData && (
                <>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={handleStartScan}>Start Scanning</button>
                </>
            )}

            {videoActive && (
                <>
                    {/* Video element to display the camera feed */}
                    <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />

                    {/* Hidden canvas to process video frames */}
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </>
            )}

            {qrCodeData && (
                <>
                    <button onClick={handleStartScan}>Scan Again</button>
                </>
            )}
        </div>
    );
};

export default QrScanner;
