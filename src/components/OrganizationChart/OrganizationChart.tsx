import React from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import { TreeNode } from 'primereact/treenode';
import { Employee } from '@/service/models/employees';
import transformData from '@/utils/transformData';

type OwnProps = {
  data: Employee[];
  isSuccess: boolean;
};

const OrgChart: React.FC<OwnProps> = ({ data, isSuccess }) => {
  const [selection, setSelection] = React.useState<TreeNode[]>([]);
  const [chartData, setChartData] = React.useState<TreeNode[]>([]);

  React.useEffect(() => {
    if (isSuccess) {
      setChartData(transformData(data));
    }
  }, []);

  const nodeTemplate = (node: TreeNode) => {
    if (node) {
      return (
        <div className="flex w-[150px] justify-center border rounded-2xl p-3">
          <div className="flex flex-col items-center">
            <img alt={node.data.name} src={node.data.image} className=" w-24 h-24 object-cover rounded-full" />
            <p className="font-bold mb-2">{node.data.name}</p>
            <p className="">{node.data.title}</p>
          </div>
        </div>
      );
    }

    return node;
  };
  // console.log(chartData);
  return (
    <>
      {chartData.length > 0 && (
        <div className="flex justify-center overflow-x-auto ">
          <OrganizationChart
            value={chartData}
            selectionMode="multiple"
            selection={selection}
            // onSelectionChange={(e) => setSelection(e.data)}
            onSelectionChange={(e) => console.log(e.data)}
            nodeTemplate={nodeTemplate}
          />
        </div>
      )}
    </>
  );
};

export default OrgChart;
