import { Table } from "react-bootstrap";
import { useData } from "../../Hooks/useData";

const DesktopWeaponsSection: React.FC<{ weaponIds: string[] }> = ({ weaponIds }) => {

    const data = useData();
    const weapons = weaponIds.map(o=>data.warscrollWeapons[o]);
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
                <td style={{ textAlign: "left" }}>{o.weaponAbilities.map(p => data.weaponAbilities[p].name).join("\n")}</td>
            </tr>)}
        </tbody>
    </Table>
}

export default DesktopWeaponsSection;