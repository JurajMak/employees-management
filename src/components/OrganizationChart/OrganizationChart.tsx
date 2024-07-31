import React from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { TreeNode } from 'primereact/treenode';
import { Employee } from '@/service/models/employees';
import transformData from '@/utils/transformData';
import { NodeTemplate } from '../NodeTemplate';
import { debounce } from '@/utils/debounce';

type OwnProps = {
  data: Employee[];
  isSuccess: boolean;
};

const OrgChart: React.FC<OwnProps> = ({ data, isSuccess }) => {
  const [chartData, setChartData] = React.useState<TreeNode[]>([]);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback(
    debounce((event: MouseEvent) => {
      if (!isPanning) return;
      setTranslate({ x: event.clientX - origin.x, y: event.clientY - origin.y });
    }, 10),
    [isPanning, origin],
  );

  const onMouseDown = (event: MouseEvent) => {
    if (chartRef.current) {
      setIsPanning(true);
      setOrigin({ x: event.clientX - translate.x, y: event.clientY - translate.y });
      chartRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseUp = () => {
    setIsPanning(false);
    if (chartRef.current) {
      chartRef.current.style.cursor = 'default';
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setChartData(transformData(data));
    }
  }, []);

  React.useEffect(() => {
    if (chartRef.current) {
      const handleMouseMoveWrapper = (event: MouseEvent) => handleMouseMove(event);

      chartRef.current.addEventListener('mousemove', handleMouseMoveWrapper);
      chartRef.current.addEventListener('mouseup', onMouseUp);
      chartRef.current.addEventListener('mousedown', onMouseDown);

      return () => {
        if (chartRef.current) {
          chartRef.current.removeEventListener('mousemove', handleMouseMoveWrapper);
          chartRef.current.removeEventListener('mouseup', onMouseUp);
          chartRef.current.removeEventListener('mousedown', onMouseDown);
          handleMouseMove.cancel();
        }
      };
    }
  }, [handleMouseMove, onMouseUp, onMouseDown]);

  return (
    <div className="flex justify-center py-12" ref={chartRef} style={{ overflow: 'hidden' }}>
      {chartData.length > 0 && (
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)  `,
          }}
        >
          <OrganizationChart value={chartData} selectionMode="multiple" nodeTemplate={NodeTemplate} />
        </div>
      )}
    </div>
  );
};

export default OrgChart;
