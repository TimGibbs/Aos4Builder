import { Table } from "react-bootstrap";
import Rule from "../../Types/DataTypes/Rule";
import { EnrichedWarscrollWeapon } from "../../Types/DataTypes/WarscrollWeapon";

const DesktopWeaponsSection: React.FC<{ weapons: EnrichedWarscrollWeapon[], weaponAbilites: Record<string, Rule> }> = ({ weapons, weaponAbilites }) => {
    return <Table striped >
        <thead>
            <tr>
                <th>Weapon</th>
                <th>Range</th>
                <th>Attacks</th>
                <th>Hit</th>
                <th>Wound</th>
                <th>Rend</th>
                <th>Damage</th>
                <th style={{ textAlign: "left" }}>Abilities</th>
            </tr>
        </thead>
        <tbody>
            {weapons.map(o => <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.range ?? "Melee"}</td>
                <td>{o.attacks}</td>
                <td>{o.hit}</td>
                <td>{o.wound}</td>
                <td>{o.rend}</td>
                <td>{o.damage}</td>
                <td style={{ textAlign: "left" }}>{o.weaponAbilities.map(p => weaponAbilites[p].name).join("\n")}</td>
            </tr>)}
        </tbody>
    </Table>
}

export default DesktopWeaponsSection;