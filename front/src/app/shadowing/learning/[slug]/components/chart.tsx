import { useRef } from 'react';
import { VictoryPie } from 'victory';

type dataType = { x: number; y: number };

export const Chart = (props: any) => {
  const dataRef = useRef<dataType[]>();
  const value = props.value.toFixed();
  dataRef.current = [
    { x: 1, y: value },
    { x: 2, y: 100 - value },
  ];
  return (
    <div className="relative">
      <VictoryPie
        animate={{ duration: 1000 }}
        width={400}
        height={400}
        labels={() => null}
        innerRadius={110}
        data={dataRef.current}
        style={{
          data: {
            fill: ({ datum }) => {
              return datum.x === 1 ? '#7D17FF' : '#ffffff';
            },
          },
        }}
      />
      <p className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        {dataRef.current[0].y}점
      </p>
    </div>
  );
};
