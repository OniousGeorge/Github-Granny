import { PieChart, Pie, Tooltip } from "recharts";
import type { LanguageData } from "../../../shared/types/languageType";

interface LanguageProps {
    data:LanguageData;
}


function LanguageCard ({data}: LanguageProps) {
    
    const getColor = (index: number, total: number) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 50%)`;
};
const chartData = Object.entries(data).map(([name, val], index) => ({
    name: `${name}: ${val < 0.05 ? "<0.1" : val.toFixed(1)}%`,
    val,
    fill: getColor(index, Object.keys(data).length)
}));
   

    return (
        <div className="language-chart">
        <h2>Languages Used</h2>
         <PieChart width={280} height={190}>
        <Pie
            data={chartData}
            dataKey="val"
            nameKey="name"
            cx={140}
            cy={95}
            outerRadius={68}
        />
        <Tooltip />
    </PieChart>
        <ul className="language-legend">
            {chartData.map(({ name, fill }) => (
                <li key={name}>
                    <span style={{ backgroundColor: fill }} />
                    {name}
                </li>
            ))}
        </ul>
    </div>
    
)
};
export default LanguageCard;