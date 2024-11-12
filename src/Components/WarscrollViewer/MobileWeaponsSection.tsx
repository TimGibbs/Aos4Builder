import { Table } from "react-bootstrap";
import { GiPocketBow } from "react-icons/gi";
import Rule from "../../Types/DataTypes/Rule";
import { EnrichedWarscrollWeapon } from "../../Types/DataTypes/WarscrollWeapon";

const MobileWeaponsSection: React.FC<{ weapons: EnrichedWarscrollWeapon[], weaponAbilites: Record<string, Rule> }> = ({ weapons, weaponAbilites }) => {
    const footnoteArray = ['†', '‡', '§', 'ǁ', '¤', '¢']
    return <>
        <Table striped >
            <thead>
                <tr>
                    <th></th>
                    <th><GiPocketBow /></th>
                    <th>A</th>
                    <th>H</th>
                    <th>W</th>
                    <th>R</th>
                    <th>D</th>
                    <th style={{ textAlign: "left" }}>Abilities</th>
                </tr>
            </thead>
            <tbody>
                {weapons.map((o, i) => <tr key={o.id}>
                    <td>{footnoteArray[i]}</td>
                    <td>{o.range ?? "-"}</td>
                    <td>{o.attacks}</td>
                    <td>{o.hit}</td>
                    <td>{o.wound}</td>
                    <td>{o.rend}</td>
                    <td>{o.damage}</td>
                    <td style={{ textAlign: "left" }}>{o.weaponAbilities.map(p => weaponAbilites[p].name).join("\n")}</td>
                </tr>)}
            </tbody>
        </Table>
        <div className="weaponsNames">{weapons.map((o, i) => <div key={o.id}>{footnoteArray[i]} {o.name}</div>)}</div>
    </>
}

export default MobileWeaponsSection;