import React from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

import { Employee } from '@/service/models/employees';
import transformData from '@/utils/transformData';
import { NodeTemplate } from '../NodeTemplate';
import { debounce } from '@/utils/debounce';

type OwnProps = {
  data: Employee[];
};

const OrgChart: React.FC<OwnProps> = ({ data }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  const chartData = React.useMemo(() => transformData(data), [data]);

  const panningRef = React.useRef({
    isPanning: false,
    origin: { x: 0, y: 0 },
    translate: { x: 0, y: 0 },
  });

  const handleMouseMove = debounce((event: MouseEvent) => {
    if (!panningRef.current.isPanning) return;

    const { origin, translate } = panningRef.current;

    panningRef.current.translate = {
      x: translate.x + event.clientX - origin.x,
      y: translate.y + event.clientY - origin.y,
    };

    if (chartRef.current) {
      chartRef.current.style.transform = `translate(${panningRef.current.translate.x}px, ${panningRef.current.translate.y}px)`;
    }

    panningRef.current.origin = { x: event.clientX, y: event.clientY };
  }, 15);

  const onMouseDown = (event: MouseEvent) => {
    panningRef.current.isPanning = true;
    panningRef.current.origin = { x: event.clientX, y: event.clientY };
    if (chartRef.current) {
      chartRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseUp = () => {
    panningRef.current.isPanning = false;
    if (chartRef.current) {
      chartRef.current.style.cursor = 'default';
    }
  };

  React.useEffect(() => {
    const handleMouseMoveWrapper = (event: MouseEvent) => handleMouseMove(event);
    const handleMouseDownWrapper = (event: MouseEvent) => onMouseDown(event);
    const handleMouseUpWrapper = () => onMouseUp();

    document.addEventListener('mousemove', handleMouseMoveWrapper);
    document.addEventListener('mouseup', handleMouseUpWrapper);
    document.addEventListener('mousedown', handleMouseDownWrapper);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWrapper);
      document.removeEventListener('mouseup', handleMouseUpWrapper);
      document.removeEventListener('mousedown', handleMouseDownWrapper);
      handleMouseMove.cancel();
    };
  }, []);

  return (
    <div className="flex justify-center py-12 w-screen" ref={chartRef}>
      {chartData.length > 0 && (
        <OrganizationChart
          value={chartData}
          selectionMode="multiple"
          nodeTemplate={NodeTemplate}
          className="select-none	"
        />
      )}
    </div>
  );
};

export default OrgChart;
