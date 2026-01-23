function EventHandlingTest({ onMetrics }) {
  const container = (<div></div>) as HTMLDivElement;
  const buttonContainer = (<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 5px;"></div>) as HTMLDivElement;
  const clickCountDiv = (<div style="display: none; margin: 15px 0; padding: 10px; background: #e8f5e9; border-radius: 4px;"></div>) as HTMLDivElement;

  let clickCount = 0;
  let buttons = [];

  const handleClick = (id) => {
    const startTime = performance.now();
    clickCount++;
    clickCountDiv.textContent = `Total Clicks: ${clickCount}`;
    clickCountDiv.style.display = 'block';
    const endTime = performance.now();

    onMetrics({
      'Button Count': buttons.length,
      'Last Click': `Button ${id}`,
      'Response Time': `${(endTime - startTime).toFixed(4)} ms`,
      'Total Clicks': clickCount
    });
  };

  const createButtons = (count) => {
    const startTime = performance.now();
    const startMemory = performance.memory?.usedJSHeapSize || 0;

    buttonContainer.innerHTML = '';
    buttons = [];
    clickCount = 0;
    clickCountDiv.style.display = 'none';

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const btn = (
        <button on:click={() => handleClick(i)} style="padding: 8px; font-size: 12px;">
          Btn {i}
        </button>
      );
      buttons.push(btn);
      fragment.appendChild(btn);
    }

    buttonContainer.appendChild(fragment);

    setTimeout(() => {
      const endTime = performance.now();
      const endMemory = performance.memory?.usedJSHeapSize || 0;

      onMetrics({
        'Button Count': count,
        'Binding Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        'Avg per Button': `${((endTime - startTime) / count).toFixed(4)} ms`
      });
    }, 0);
  };

  const clearButtons = () => {
    buttonContainer.innerHTML = '';
    buttons = [];
    clickCount = 0;
    clickCountDiv.style.display = 'none';
    onMetrics(null);
  };

  const controls = (
    <div class="controls">
      <button on:click={() => createButtons(1000)}>Create 1000 Buttons</button>
      <button on:click={() => createButtons(5000)}>Create 5000 Buttons</button>
      <button on:click={clearButtons}>Clear</button>
    </div>
  );

  container.appendChild(<h2>Event Handling Test</h2>);
  container.appendChild(controls);
  container.appendChild(clickCountDiv);
  container.appendChild(buttonContainer);

  return container;
}

export default EventHandlingTest;
