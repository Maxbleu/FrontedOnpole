const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    LapTime:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
            </div>
        );
    }
};

export default CustomTooltip;
