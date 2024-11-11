import { Accordion, Card, Table } from "react-bootstrap"
import { EnrichedWarscroll } from "../../Hooks/useWarscrolls"
import { useState } from "react";
import useKeywords from "../../Hooks/useKeywords";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import useWeaponAbilities from "../../Hooks/useWeaponAbilities";
import AbilityViewer from "../AbilityViewer/AbilityViewer";
import './WarscrollViewer.css';
import useIsMobile from "../../Hooks/useIsMobile";
import { GiPocketBow } from "react-icons/gi";

export interface WarscrollViewerParams {
    warscroll: EnrichedWarscroll,
    includeAbilites : boolean
}

export const WarscrollViewer: React.FC<WarscrollViewerParams> = ({ warscroll, includeAbilites }) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { dictionary, common } = useKeywords();
    const weaponAbilites = useWeaponAbilities();

    const filteredKeywords = warscroll.keywords.map(o => dictionary[o])

    const ward = warscroll.keywords.includes(common.ward3) ? "3+"
                : warscroll.keywords.includes(common.ward4) ? "4+"
                : warscroll.keywords.includes(common.ward5) ? "5+"
                : warscroll.keywords.includes(common.ward6) ? "6+" : "-"


    const footnoteArray = ['†', '‡', '§', 'ǁ', '¤', '¢']

    return <Card className={`warscrollViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center warscrollViewerHeader`} onClick={() => setIsOpen(!isOpen)}>
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{warscroll.name}</span>
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <>
                    <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Move</th>
                                    <th>Health</th>
                                    <th>Control</th>
                                    <th>Save</th>
                                    <th>Ward</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{warscroll.move}</td>
                                    <td>{warscroll.health}</td>
                                    <td>{warscroll.control}</td>
                                    <td>{warscroll.save}</td>
                                    <td>{ward}</td>
                                </tr>
                            </tbody>
                        </Table>

                        {!isMobile && warscroll.weapons.length >0 && <Table striped >
                            <thead>
                                <tr>
                                    <th>Weapon</th>
                                    <th>Range</th>
                                    <th>Attacks</th>
                                    <th>Hit</th>
                                    <th>Wound</th>
                                    <th>Rend</th>
                                    <th>Damage</th>
                                    <th style={{textAlign:"left"}}>Abilities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warscroll.weapons.map(o=> <tr key={o.id}>
                                    <td>{o.name}</td>
                                    <td>{o.range ?? "Melee"}</td>
                                    <td>{o.attacks}</td>
                                    <td>{o.hit}</td>
                                    <td>{o.wound}</td>
                                    <td>{o.rend}</td>
                                    <td>{o.damage}</td>
                                    <td style={{textAlign:"left"}}>{o.weaponAbilities.map(p=>weaponAbilites[p].name).join("\n")}</td>
                                </tr>)}
                            </tbody>
                        </Table>}
                        {(isMobile && warscroll.weapons.length >0) && <Table striped >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><GiPocketBow /></th>
                                    <th>A</th>
                                    <th>H</th>
                                    <th>W</th>
                                    <th>R</th>
                                    <th>D</th>
                                    <th style={{textAlign:"left"}}>Abilities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warscroll.weapons.map((o,i)=> <tr key={o.id}>
                                    <td>{footnoteArray[i]}</td>
                                    <td>{o.range ?? "-"}</td>
                                    <td>{o.attacks}</td>
                                    <td>{o.hit}</td>
                                    <td>{o.wound}</td>
                                    <td>{o.rend}</td>
                                    <td>{o.damage}</td>
                                    <td style={{textAlign:"left"}}>{o.weaponAbilities.map(p=>weaponAbilites[p].name).join("\n")}</td>
                                </tr>)}
                            </tbody>
                        </Table>}
                        {(isMobile && warscroll.weapons.length >0) && warscroll.weapons.map((o,i)=><div>{footnoteArray[i]}: {o.name}</div>)}
                        {includeAbilites && warscroll.abilities.map(o=><AbilityViewer key={o.id} ability={o}/>)}
                    </Card.Body>
                    <Card.Footer className="text-muted">{filteredKeywords.join(" ")}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
}