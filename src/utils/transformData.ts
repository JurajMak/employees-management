import { TreeNode } from 'primereact/treenode';
import { Employee } from '@/service/models/employees';

type TreeNopeType = TreeNode & {
  type?: string;
};

function transformData(data: Employee[]): TreeNode[] {
  data.sort((a, b) => {
    if (a.manager_id === null && b.manager_id === null) return 0;
    if (a.manager_id === null) return -1;
    if (b.manager_id === null) return 1;
    return a.manager_id - b.manager_id;
  });

  const idToNode: Record<number, TreeNode> = {};

  data.forEach((employee) => {
    const node: TreeNopeType = {
      expanded: false,
      type: 'person',
      data: {
        image: employee.imageUrl,
        name: `${employee.firstName} ${employee.lastName}`,
        title: employee.position,
        managerId: employee.manager_id,
      },
      children: [],
    };

    idToNode[employee.id] = node;

    if (employee.manager_id !== null) {
      for (let i = data.indexOf(employee) - 1; i >= 0; i--) {
        if ((data[i].manager_id as number) < employee.manager_id) {
          idToNode[data[i].id].children!.push(node);
          break;
        }
      }
    }
  });

  return Object.values(idToNode).filter((node) => node.data.managerId === null);
}

export default transformData;
