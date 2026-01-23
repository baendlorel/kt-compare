function NestedNode({ node, level, maxLevel }) {
  const container = (
    <div class="nested-component" style={`margin-left: ${level * 20}px;`}>
      <div>
        <strong>Level {level}:</strong> {node.id} = {node.value} (updates: {node.updateCount})
      </div>
    </div>
  ) as HTMLDivElement;

  // Recursively create child nodes
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      const childNode = <NestedNode node={child} level={level + 1} maxLevel={maxLevel} />;
      container.appendChild(childNode);
    });
  }

  return container;
}

export default NestedNode;
