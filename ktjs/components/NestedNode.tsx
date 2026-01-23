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

export default function NestedNode({ node, level, maxLevel }: NestedNodeProps) {
  const container = (
    <div class="nested-component" style={`margin-left: ${level * 20}px;`}>
      <div>
        <strong>Level {level}:</strong> {node.id} = {node.value} (updates: {node.updateCount})
      </div>
      <div k-if={node.children && node.children.length > 0}>
        {node.children.map((child) => (
          <NestedNode node={child} level={level + 1} maxLevel={maxLevel} />
        ))}
      </div>
    </div>
  );

  return container;
}
