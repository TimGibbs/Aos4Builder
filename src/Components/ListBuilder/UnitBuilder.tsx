import { Form } from "react-bootstrap"
import { EnrichedWarscroll } from "../../Hooks/useWarscrolls"
import Unit from "../../Types/ListTypes/Unit"
import EnhancementSelector from "./EnhancementSelector"
import { useList } from "../../Hooks/useList"

interface UnitBuilderParams {
    unit : Unit
    setUnit : (unit : Unit) => void
    warscrolls : EnrichedWarscroll[]
}

const UnitBuilder: React.FC<UnitBuilderParams> = ({unit, setUnit, warscrolls}) => {

    const { allListUnits, allListWarscrollIds } = useList();
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const warscrollId = event.target.value;
        setUnit({...unit, warscrollId:warscrollId})
    }

    const isntDuplicateUnique = (warscroll: EnrichedWarscroll) =>  warscroll.isUnique === false || allListWarscrollIds.includes(warscroll.id) === false;
    const isntLimited = (warscroll: EnrichedWarscroll) => !warscroll.limitingWarscrollId || allListUnits.filter(o=>o.id === warscroll.limitingWarscrollId).length > allListUnits.filter(o=>o.id === warscroll.id).length;
   
    const warscroll = warscrolls.find(o=>o.id===unit?.warscrollId)
    const reinforce = unit.reinforced ? 2 : 1;
    return <><div className="d-flex p-2 bd-highlight"> 
    <Form.Select value={unit?.warscrollId ?? ""} onChange={handleSelectChange} aria-label="Default select example">
      <option>-</option>
      {warscrolls.map(x=>(<option key={x.id} value={x.id} disabled={!isntDuplicateUnique(x) || !isntLimited(x)} >{x.name} {(x.points ?? 0)  > 0 ? `${(x.points ?? 0) * reinforce}pts`: ""}</option>))}
    </Form.Select>
  {warscroll && !warscroll?.cannotBeReinforced && unit && <Form.Check reverse label={`Reinforced`} className="fs-3" type='checkbox' checked={unit.reinforced} id={`checkbox-${unit.id}`} onChange={()=>setUnit({...unit, reinforced:!unit.reinforced})}/>}
  </div>
  {warscroll && warscroll?.isHero && !warscroll?.isUnique && unit && <EnhancementSelector unit={unit} />}
  </>
}

export default UnitBuilder;