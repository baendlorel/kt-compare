import { ref } from 'kt.js';

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

export default function EventHandlingTest({ onMetrics }: TestProps) {
  const createButtons = (count: number): void => {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    if (!btns.value) {
      return;
    }

    const handleClick = (id: number): void => {
      const startTime = performance.now();
      clickCount++;
      clickCountDiv.value.textContent = `Total Clicks: ${clickCount}`;
      clickCountDiv.value.style.display = 'block';
      const endTime = performance.now();

      onMetrics({
        'Last Click': `Button ${id}`,
        'Response Time': `${(endTime - startTime).toFixed(4)} ms`,
        'Total Clicks': clickCount,
      });
    };

    btns.value.style.display = 'none';

    btns.value.innerHTML = '';
    clickCount = 0;
    clickCountDiv.value.style.display = 'none';

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const btn = (
        <button on:click={() => handleClick(i)} style="padding: 8px; font-size: 12px;">
          Btn {Math.random()}
        </button>
      );
      fragment.appendChild(btn);
    }

    btns.value.appendChild(fragment);
    btns.value.style.display = 'grid';

    requestAnimationFrame(() => {
      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      onMetrics({
        'Button Count': count,
        'Binding Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        'Avg per Button': `${((endTime - startTime) / count).toFixed(4)} ms`,
      });
    });
  };

  const clearButtons = (): void => {
    btns.value.innerHTML = '';
    clickCount = 0;
    clickCountDiv.value.style.display = 'none';
    onMetrics(null);
  };

  let clickCount = 0;
  const btns = ref();
  const clickCountDiv = ref();
  const container = (
    <div>
      <h2>Event Handling Test</h2>
      <div class="controls">
        <button on:click={() => createButtons(1000)}>Create 1000 Buttons</button>
        <button on:click={() => createButtons(5000)}>Create 5000 Buttons</button>
        <button on:click={clearButtons}>Clear</button>
      </div>
      <div
        ref={clickCountDiv}
        style="display: none; margin: 15px 0; padding: 10px; background: #e8f5e9; border-radius: 4px;"
      ></div>
      <div
        ref={btns}
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 5px;"
      ></div>
    </div>
  );

  return container;
}
