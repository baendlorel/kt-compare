import { ref } from 'kt.js';
import NestedNode from '../components/NestedNode';

interface NodeData {
  id: string;
  level: number;
  value: string;
  updateCount: number;
  children: NodeData[];
}

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

function NestedComponentTest({ onMetrics }: TestProps) {
  const createNodeData = (id: string, level: number, maxLevel: number): NodeData => {
    const node: NodeData = {
      id,
      level,
      value: Math.random().toFixed(3),
      updateCount: 0,
      children: [],
    };

    if (level < maxLevel) {
      for (let i = 0; i < 5; i++) {
        node.children.push(createNodeData(`${id}-${i}`, level + 1, maxLevel));
      }
    }

    return node;
  };

  const createTree = (): void => {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    treeData = createNodeData('root', 0, 5);
    treeContainer.value.innerHTML = '';
    treeElement = <NestedNode node={treeData} level={0} maxLevel={10} />;
    treeContainer.value.appendChild(treeElement);

    (updateButton as any).disabled = false;

    setTimeout(() => {
      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Calculate total nodes (5^0 + 5^1 + ... + 5^10)
      const totalNodes = (Math.pow(5, 11) - 1) / 4;

      onMetrics({
        'Build Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Total Nodes': totalNodes.toLocaleString(),
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        'Avg per Node': `${(((endTime - startTime) / totalNodes) * 1000).toFixed(4)} μs`,
      });
    }, 0);
  };

  const updateNode = (node: NodeData, element: HTMLElement): void => {
    node.value = Math.random().toFixed(3);
    node.updateCount++;

    // Update the element's text content
    const textNode = element.childNodes[0];
    if (textNode) {
      (textNode as HTMLDivElement).textContent =
        `Level ${node.level}: ${node.id} = ${node.value} (updates: ${node.updateCount})`;
    }

    // Update children
    if (node.children.length > 0) {
      const childElements = Array.from(element.children).slice(1) as HTMLDivElement[]; // Skip first child which is the text div
      node.children.forEach((child, index) => {
        if (childElements[index]) {
          updateNode(child, childElements[index]);
        }
      });
    }
  };

  const updateTree = (): void => {
    if (!treeData || !treeElement) return;

    const startTime = performance.now();
    updateCounter++;

    updateNode(treeData, treeElement);

    setTimeout(() => {
      const endTime = performance.now();
      const totalNodes = (Math.pow(5, 11) - 1) / 4;

      onMetrics({
        'Update Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Update Count': updateCounter,
        'Total Nodes': totalNodes.toLocaleString(),
        'Avg per Node': `${(((endTime - startTime) / totalNodes) * 1000).toFixed(4)} μs`,
      });
    }, 0);
  };

  const clearTree = (): void => {
    treeContainer.value.innerHTML = '';
    updateCounter = 0;
    updateButton.value.disabled = true;
    onMetrics(null);
  };

  let treeData: NodeData;
  let treeElement: HTMLElement;
  let updateCounter = 0;
  const updateButton = ref<HTMLButtonElement>();
  const treeContainer = ref();

  return (
    <div>
      <h2>Nested Component Test</h2>
      <div class="controls">
        <button on:click={createTree}>Create Tree (10 levels, 5 children each)</button>
        <button ref={updateButton} on:click={updateTree} disabled>
          Update All Nodes
        </button>
        <button on:click={clearTree}>Clear</button>
      </div>
      <div ref={treeContainer}></div>
    </div>
  );
}

export default NestedComponentTest;
