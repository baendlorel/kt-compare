function DynamicListTest({ onMetrics }) {
  const container = (<div></div>) as HTMLDivElement;
  const listContainer = (<div style="max-height: 400px; overflow-y: auto; margin-top: 20px;"></div>) as HTMLDivElement;

  let items = [];
  let idCounter = 0;
  let buttons = {};

  const renderList = () => {
    listContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      const itemDiv = (
        <div class="list-item">
          <span>{item.text}</span>
          <span>{item.value}</span>
        </div>
      );
      fragment.appendChild(itemDiv);
    });

    listContainer.appendChild(fragment);
  };

  const initList = () => {
    const startTime = performance.now();

    items = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Item ${i}`,
      value: Math.random().toFixed(3)
    }));
    idCounter = 1000;

    renderList();

    // Enable operation buttons
    Object.values(buttons).forEach(btn => {
      if (btn.disabled !== undefined) btn.disabled = false;
    });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Initialize',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const insertAtStart = () => {
    const startTime = performance.now();

    items.unshift({
      id: idCounter++,
      text: `New Item ${idCounter}`,
      value: Math.random().toFixed(3)
    });

    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Insert at Start',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const insertAtMiddle = () => {
    const startTime = performance.now();
    const middleIndex = Math.floor(items.length / 2);

    items.splice(middleIndex, 0, {
      id: idCounter++,
      text: `New Item ${idCounter}`,
      value: Math.random().toFixed(3)
    });

    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Insert at Middle',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const insertAtEnd = () => {
    const startTime = performance.now();

    items.push({
      id: idCounter++,
      text: `New Item ${idCounter}`,
      value: Math.random().toFixed(3)
    });

    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Insert at End',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const deleteFromStart = () => {
    const startTime = performance.now();
    items.shift();
    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Delete from Start',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const deleteFromMiddle = () => {
    const startTime = performance.now();
    const middleIndex = Math.floor(items.length / 2);
    items.splice(middleIndex, 1);
    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Delete from Middle',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const deleteFromEnd = () => {
    const startTime = performance.now();
    items.pop();
    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Delete from End',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  const batchUpdate = () => {
    const startTime = performance.now();

    // Update 100 random items
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      items[randomIndex].value = Math.random().toFixed(3);
    }

    renderList();

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        'Operation': 'Batch Update (100 items)',
        'Items Count': items.length,
        'Time': `${(endTime - startTime).toFixed(2)} ms`
      });
    }, 0);
  };

  // Create buttons and store references
  buttons = {
    init: <button on:click={initList}>Initialize (1000 items)</button>,
    insertStart: <button on:click={insertAtStart} disabled>Insert at Start</button>,
    insertMiddle: <button on:click={insertAtMiddle} disabled>Insert at Middle</button>,
    insertEnd: <button on:click={insertAtEnd} disabled>Insert at End</button>,
    deleteStart: <button on:click={deleteFromStart} disabled>Delete from Start</button>,
    deleteMiddle: <button on:click={deleteFromMiddle} disabled>Delete from Middle</button>,
    deleteEnd: <button on:click={deleteFromEnd} disabled>Delete from End</button>,
    batchUpdate: <button on:click={batchUpdate} disabled>Batch Update (100 items)</button>
  };

  const controls = (
    <div class="controls">
      {buttons.init}
      {buttons.insertStart}
      {buttons.insertMiddle}
      {buttons.insertEnd}
      {buttons.deleteStart}
      {buttons.deleteMiddle}
      {buttons.deleteEnd}
      {buttons.batchUpdate}
    </div>
  );

  container.appendChild(<h2>Dynamic List Operations Test</h2>);
  container.appendChild(controls);
  container.appendChild(listContainer);

  return container;
}

export default DynamicListTest;
