import { Table } from "react-bootstrap";
import useKeywords from "../../Hooks/useKeywords";
import { EnrichedWarscroll } from "../../Types/DataTypes/Warscroll";

const WarscrollStatsSection: React.FC<{ warscroll: EnrichedWarscroll }> = ({ warscroll }) => {
    const { common } = useKeywords();
    const ward = warscroll.keywords.includes(common.ward3) ? "3+"
        : warscroll.keywords.includes(common.ward4) ? "4+"
            : warscroll.keywords.includes(common.ward5) ? "5+"
                : warscroll.keywords.includes(common.ward6) ? "6+" : "-"
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