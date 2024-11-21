import { Button, Container, Toast, ToastContainer } from "react-bootstrap"
import FactionSelector from "../Components/ListBuilder/FactionSelector"
import { ListProvider, useList } from "../Hooks/useList";
import { listSum } from "../Logic/pointSums";
import TerrainSelector from "../Components/ListBuilder/TerrainSelector";
import LoreSelector from "../Components/ListBuilder/LoreSelector";
import FormationSelector from "../Components/ListBuilder/FormationSelector";
import RegimentsSelector from "../Components/ListBuilder/RegimentsSelector";
import ListNameSelector from "../Components/ListBuilder/ListNameSelector";
import { useParams } from "react-router";
import useSavedLists from "../Hooks/useSavedLists";
import { useState } from "react";
import { useData } from "../Hooks/useData";

const ListBuilder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { readList } = useSavedLists();

    if (!id) return <div>Unrecognised Id</div>
    const list = readList(id)
    if (!list) return <div>List not found</div>

    return <ListProvider value={list}>
        <ListBuilderInternal />
    </ListProvider>
}

const ListBuilderInternal: React.FC = () => {
    const { list } = useList();
    const data = useData();
    const { updateList } = useSavedLists();
    const [show, setShow] = useState(false);
    if (!list) return <></>
    return <Container className="ListBuilder">
        <Button onClick={() => { updateList(list); setShow(true) }}>Save</Button>
        <SavedDiaglog close={() => setShow(false)} show={show} />
        <ListNameSelector />
        <h5>{listSum(list, Object.values(data.warscrolls))}pts</h5>
        <FactionSelector />
        {list.factionId && <FormationSelector />}
        {list.factionId && <LoreSelector />}
        {list.factionId && <RegimentsSelector />}
        <TerrainSelector />
    </Container>
}

const SavedDiaglog: React.FC<{ show: boolean, close: () => void }> = ({ show, close }) => {
    return <ToastContainer className="p-3" position="top-center" >
        <Toast onClose={() => close()} show={show} delay={3000} autohide>
            <Toast.Body>Saved</Toast.Body>
        </Toast>
    </ToastContainer>
}

export default ListBuilder;