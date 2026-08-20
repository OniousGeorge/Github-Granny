import { PieChart, Pie, Tooltip, Legend, } from "recharts";
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
        <>
   <Legend
    formatter={(value, entry) => {
        const payload = entry.payload as { val: number };

        const percentage =
            payload.val < 0.05
                ? "<0.1"
                : payload.val.toFixed(1);

        return `${value}: ${percentage}%`;
    }}
/>
         <PieChart width={400} height={400}>
        <Pie
            data={chartData}
            dataKey="val"
            nameKey="name"
        />
        <Tooltip />
        <Legend />
    </PieChart>
    </>
    
)
};
export default LanguageCard;