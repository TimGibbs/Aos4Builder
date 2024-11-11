import { Button, Container, Row, Col } from "react-bootstrap"
import List from "../Types/ListTypes/List"
import useSavedLists from "../Hooks/useSavedLists"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NewListModal from "../Components/ListSelector/NewListModal";
import DisplayListModal from "../Components/ListSelector/DisplayListModal";
import { FaEye, FaPencilAlt, FaQrcode, FaTrash } from "react-icons/fa";
import QrCodeModal from "../Components/ListSelector/QrCodeModal";
import ImportListModal from "../Components/ListSelector/ImportListModal";
import { GiDungeonGate } from "react-icons/gi";

const ListsSelector : React.FC = ()=> {
    const { lists } = useSavedLists();
    const [displayList,setDisplayList] = useState<List|undefined>()
    const [showNewList, setShowNewList] = useState<boolean>(false);
    const [showImport, setShowImport] = useState<boolean>(false);
    const [showDisplay, setShowDisplay] = useState<boolean>(false);
    const [showQr, setShowQr] = useState<boolean>(false);
    const handleShowDisplay = (list:List) => {
        setDisplayList(list);
        setShowDisplay(true);
    }
    const handleShowQr = (list:List) => {
        setDisplayList(list);
        setShowQr(true);
    }
    return <Container>
        {lists.map(o=><DisplayList key={o.id} list={o} display={()=>handleShowDisplay(o)} qr={()=>handleShowQr(o)}/>)}
        <Button onClick={() => setShowNewList(true)}>NEW</Button>
        <Button onClick={() => setShowImport(true)}>IMPORT</Button>
        <ImportListModal show={showImport} onClose={()=>setShowImport(false)}/>
        <NewListModal show={showNewList} onClose={()=>setShowNewList(false)}/>
        <DisplayListModal show={showDisplay} onClose={()=>setShowDisplay(false)} list={displayList}/>
        <QrCodeModal show={showQr} onClose={()=>setShowQr(false)} list={displayList}/>
    </Container>
}

const DisplayList : React.FC<{list:List, display:()=>void, qr:()=>void}>  = ({list, display, qr}) => {
    const { deleteList } = useSavedLists();
    const navigate = useNavigate();

    const editList = (id:string) => {
        navigate(`/edit/${id}`);
      };


    const goToDisplayPage = (id:string) => {
    navigate(`/display/${id}`);
    };

    return <Row>
        <Col>
            {list.name}
        </Col>
        <Col>
            <Button onClick={()=>editList(list.id)}><FaPencilAlt /></Button>
            <Button variant="success" onClick={()=>display()}><FaEye /></Button>
            <Button variant="success" onClick={()=>goToDisplayPage(list.id)}><GiDungeonGate /></Button>
            <Button variant="success" onClick={()=>qr()}><FaQrcode /></Button>
            <Button variant="danger" onClick={()=>deleteList(list)}><FaTrash /></Button>
        </Col>
        
    </Row>
}

export default ListsSelector