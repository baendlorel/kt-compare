function LargeListTest({ onMetrics }) {
  const container = (<div></div>) as HTMLDivElement;
  const listContainer = (<div></div>) as HTMLDivElement;

  const generateList = (count) => {
    const startTime = performance.now();
    const startMemory = performance.memory?.usedJSHeapSize || 0;

    // Clear previous list
    listContainer.innerHTML = '';

    // Generate list items
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const item = (
        <div class="list-item">
          <span>Item {i}</span>
          <span>{Math.random().toFixed(2)}</span>
        </div>
      );
      fragment.appendChild(item);
    }

    listContainer.appendChild(fragment);

    // Measure after render
    setTimeout(() => {
      const endTime = performance.now();
      const endMemory = performance.memory?.usedJSHeapSize || 0;

      onMetrics({
        'Render Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Items Count': count,
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        'Avg per Item': `${((endTime - startTime) / count).toFixed(4)} ms`
      });
    }, 0);
  };

  const clearList = () => {
    listContainer.innerHTML = '';
    onMetrics(null);
  };

  const controls = (
    <div class="controls">
      <button on:click={() => generateList(1000)}>1,000 Items</button>
      <button on:click={() => generateList(5000)}>5,000 Items</button>
      <button on:click={() => generateList(10000)}>10,000 Items</button>
      <button on:click={clearList}>Clear</button>
    </div>
  );

  container.appendChild(<h2>Large List Rendering Test</h2>);
  container.appendChild(controls);
  container.appendChild(listContainer);

  return container;
}

export default LargeListTest;
