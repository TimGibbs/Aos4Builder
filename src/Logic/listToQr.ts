import * as QRCode from 'qrcode';
import LZString from 'lz-string';
import List from '../Types/ListTypes/List';

export function listToQr(list: List): Promise<string> {
    const text = JSON.stringify(list);
    const compressedData = LZString.compressToEncodedURIComponent(text);

       return  QRCode.toDataURL(compressedData)
}

export function qrToList(qr: string): List {
    const decompressedData = LZString.decompressFromEncodedURIComponent(qr);
   
    return JSON.parse(decompressedData);
}

