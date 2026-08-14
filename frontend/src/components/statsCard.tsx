
interface StatsCardProps {
    title: string;
    value: number;
}


function StatsCard ({ title, value }: StatsCardProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
}


export default StatsCard;