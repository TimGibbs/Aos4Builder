import { Accordion, Card, Table } from "react-bootstrap"
import { EnrichedWarscroll } from "../../Hooks/useWarscrolls"
import { useState } from "react";
import useKeywords from "../../Hooks/useKeywords";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

export interface WarscrollViewerParams {
    warscroll: EnrichedWarscroll,
}

export const WarscrollViewer: React.FC<WarscrollViewerParams> = ({ warscroll }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { dictionary, common } = useKeywords();

    const filteredKeywords = warscroll.keywords.map(o => dictionary[o])

    const ward = warscroll.keywords.includes(common.ward3) ? "3+"
                : warscroll.keywords.includes(common.ward4) ? "4+"
                : warscroll.keywords.includes(common.ward5) ? "5+"
                : warscroll.keywords.includes(common.ward6) ? "6+" : "-"

    return <Card className={`warscrollViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center`} onClick={() => setIsOpen(!isOpen)}>
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

                        <Table>
                            <thead>
                                <tr>
                                    <th>Weapon</th>
                                    <th>Range</th>
                                    <th>Attacks</th>
                                    <th>Hit</th>
                                    <th>Wound</th>
                                    <th>Rend</th>
                                    <th>Damage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warscroll.weapons.map(o=>                              <tr>
                                    <td>{o.name}</td>
                                    <td>{o.range ?? "Melee"}</td>
                                    <td>{o.attacks}</td>
                                    <td>{o.hit}</td>
                                    <td>{o.wound}</td>
                                    <td>{o.rend}</td>
                                    <td>{o.damage}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted">{filteredKeywords.join(" ")}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
}