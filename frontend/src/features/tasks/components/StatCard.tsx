import { Card } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';
export const StatCard: React.FC<{
  title: string;
  value?: number;
  subtitle?: string;
  color?: string;
  isLoading: boolean;
}> = ({ title, value, subtitle, color = 'blue', isLoading }) => (
  <Card className="text-center">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>

    <div className="mt-2 min-h-[2.5rem] flex justify-center items-center">
      {isLoading ? (
        <Loader2 className={`w-6 h-6 animate-spin text-${color}-600`} />
      ) : (
        <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
      )}
    </div>

    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </Card>
);
