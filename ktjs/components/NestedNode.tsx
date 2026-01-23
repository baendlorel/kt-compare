interface NodeData {
  id: string;
  level: number;
  value: string;
  updateCount: number;
  children: NodeData[];
}

interface NestedNodeProps {
  node: NodeData;
  level: number;
  maxLevel: number;
}

function NestedNode({ node, level, maxLevel }: NestedNodeProps): HTMLDivElement {
  const container = (
    <div class="nested-component" style={`margin-left: ${level * 20}px;`}>
      <div>
        <strong>Level {level}:</strong> {node.id} = {node.value} (updates: {node.updateCount})
      </div>
    </div>
  ) as HTMLDivElement;

  // Recursively create child nodes
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      const childNode = <NestedNode node={child} level={level + 1} maxLevel={maxLevel} />;
      container.appendChild(childNode);
    });
  }

  return container;
}

export default NestedNode;
