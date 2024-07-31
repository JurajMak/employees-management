import { TreeNode } from 'primereact/treenode';
import { Employee } from '@/service/models/employees';

type TreeNopeType = TreeNode & {
  type?: string;
};

function transformData(data: Employee[]): TreeNode[] {
  const idToPerson: Record<number, Employee> = data.reduce(
    (acc, person) => {
      acc[person.id] = person;
      return acc;
    },
    {} as Record<number, Employee>,
  );

  function buildTree(personId: number, isTopLevel: boolean = false): TreeNode | null {
    const person = idToPerson[personId];
    if (!person) return null;

    const node: TreeNopeType = {
      expanded: isTopLevel,
      type: 'person',
      data: {
        image: person.imageUrl,
        name: `${person.firstName} ${person.lastName}`,
        title: person.position,
      },
      children: [],
    };

    const children = data.reduce<TreeNode[]>((acc, p) => {
      if (p.manager_id === personId) {
        const childNode = buildTree(p.id);
        if (childNode) acc.push(childNode);
      }
      return acc;
    }, []);

    node.children = children;
    return node;
  }

  return data.reduce<TreeNode[]>((acc, person) => {
    if (person.manager_id === null) {
      const node = buildTree(person.id, true);
      if (node) acc.push(node);
    }
    return acc;
  }, []);
}

export default transformData;
