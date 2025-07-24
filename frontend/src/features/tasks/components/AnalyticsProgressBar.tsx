interface AnalyticsProgressBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

export const AnalyticsProgressBar: React.FC<AnalyticsProgressBarProps> = ({
  label,
  value,
  total,
  color,
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          {value} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
