import { createRedrawable } from 'kt.js';
import ComponentA from '../components/ComponentA';
import ComponentB from '../components/ComponentB';

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

function ConditionalRenderTest({ onMetrics }: TestProps) {
  let showA = true;

  // fixme redrawable比vue慢 1ms
  const componentContainer = createRedrawable(() => (
    <div>
      <div k-if={showA}>
        <ComponentA />
      </div>

      <div k-if={!showA}>
        <ComponentB />
      </div>
    </div>
  ));

  const manualToggle = (): void => {
    showA = !showA;
    componentContainer.redraw();
  };

  const startToggleTest = async (): Promise<void> => {
    const toggleTimes: number[] = [];
    const toggleCount = 100;

    for (let i = 0; i < toggleCount; i++) {
      const startTime = performance.now();

      showA = !showA;
      // componentContainer.innerHTML = '';
      // componentContainer.appendChild(showA ? <ComponentA /> : <ComponentB />);
      componentContainer.redraw();

      // Wait for next frame to ensure render complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      const endTime = performance.now();
      toggleTimes.push(endTime - startTime);
    }

    const totalTime = toggleTimes.reduce((a, b) => a + b, 0);
    const avgTime = totalTime / toggleCount;
    const minTime = Math.min(...toggleTimes);
    const maxTime = Math.max(...toggleTimes);

    onMetrics({
      'Total Toggles': toggleCount,
      'Total Time': `${totalTime.toFixed(2)} ms`,
      'Avg Toggle Time': `${avgTime.toFixed(2)} ms`,
      'Min Time': `${minTime.toFixed(2)} ms`,
      'Max Time': `${maxTime.toFixed(2)} ms`,
    });
  };

  return (
    <div>
      <h2>Conditional Render Test</h2>
      <div class="controls">
        <button on:click={startToggleTest}>Toggle 100 times</button>
        <button on:click={manualToggle}>Manual Toggle</button>
      </div>
      {componentContainer}
    </div>
  );
}

export default ConditionalRenderTest;
