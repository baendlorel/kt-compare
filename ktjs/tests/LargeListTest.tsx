import { KTHTMLElement, ref } from 'kt.js';

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

export default function LargeListTest({ onMetrics }: TestProps) {
  const clearList = (): void => {
    onMetrics(null);
  };

  const list = ref();

  const container = (
    <div>
      <h2>Large List Rendering Test</h2>
      <div class="controls">
        <button on:click={() => generateList(1000)}>1,000 Items</button>
        <button on:click={() => generateList(5000)}>5,000 Items</button>
        <button on:click={() => generateList(10000)}>10,000 Items</button>
        <button on:click={clearList}>Clear</button>
      </div>
      <div ref={list}></div>
    </div>
  );

  const generateList = (count: number): void => {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    list.value.innerHTML = ''; // same speed as list.value.remove();
    list.value = <div></div>;
    // Generate list items
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      fragment.appendChild(
        <div class="list-item">
          <span>Item {i}</span>
          <span>{Math.random().toFixed(2)}</span>
        </div>,
      );
    }
    list.value.appendChild(fragment);

    // Measure after render
    setTimeout(() => {
      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      onMetrics({
        'Render Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Items Count': count,
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        'Avg per Item': `${((endTime - startTime) / count).toFixed(4)} ms`,
      });
    }, 0);
  };

  return container;
}
