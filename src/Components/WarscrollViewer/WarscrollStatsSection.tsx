import { Table } from "react-bootstrap";
import { EnrichedWarscroll } from "../../Types/DataTypes/Warscroll";
import { useData } from "../../Hooks/useData";

const WarscrollStatsSection: React.FC<{ warscroll: EnrichedWarscroll }> = ({ warscroll }) => {

    const data = useData();

    const ward = warscroll.keywords.includes(data.commonKeywords.ward3) ? "3+"
        : warscroll.keywords.includes(data.commonKeywords.ward4) ? "4+"
            : warscroll.keywords.includes(data.commonKeywords.ward5) ? "5+"
                : warscroll.keywords.includes(data.commonKeywords.ward6) ? "6+" : "-"
    return <Table>
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
}
export default WarscrollStatsSection;