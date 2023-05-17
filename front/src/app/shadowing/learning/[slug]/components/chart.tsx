import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type chartProps = {
  value: number;
};

export const Chart = ({ value = 0 }: chartProps) => {
  return (
    <div className="relative">
      <CircularProgressbar value={value} text={`${value}%`} />;
    </div>
  );
};
