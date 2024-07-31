import { TreeNode } from 'primereact/treenode';

const NodeTemplate = (node: TreeNode) => {
  if (!node) return null;

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center ">
        <img
          alt={node.data.name}
          src={node.data.image}
          className="w-20 h-20 inline-block object-cover rounded-full pointer-events-none	"
        />
        <p className="font-bold mt-2 ">{node.data.name}</p>
        <p className="mb-2 ">{node.data.title}</p>
      </div>
    </div>
  );
};

export default NodeTemplate;
