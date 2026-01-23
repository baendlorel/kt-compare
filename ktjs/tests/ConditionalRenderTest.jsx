import ComponentA from '../components/ComponentA';
import ComponentB from '../components/ComponentB';

function ConditionalRenderTest({ onMetrics }) {
  const container = (<div></div>) as HTMLDivElement;
  const componentContainer = (<div></div>) as HTMLDivElement;

  let showA = true;
  let isRunning = false;
  let startButton;
  let manualButton;

  // Initial render
  componentContainer.appendChild(<ComponentA />);

  const manualToggle = () => {
    showA = !showA;
    componentContainer.innerHTML = '';
    componentContainer.appendChild(showA ? <ComponentA /> : <ComponentB />);
  };

  const startToggleTest = async () => {
    isRunning = true;
    startButton.disabled = true;
    manualButton.disabled = true;

    const toggleTimes = [];
    const toggleCount = 100;

    for (let i = 0; i < toggleCount; i++) {
      const startTime = performance.now();
      
      showA = !showA;
      componentContainer.innerHTML = '';
      componentContainer.appendChild(showA ? <ComponentA /> : <ComponentB />);

      // Wait for next frame to ensure render complete
      await new Promise(resolve => setTimeout(resolve, 0));

      const endTime = performance.now();
      toggleTimes.push(endTime - startTime);
    }

    isRunning = false;
    startButton.disabled = false;
    manualButton.disabled = false;

    const totalTime = toggleTimes.reduce((a, b) => a + b, 0);
    const avgTime = totalTime / toggleCount;
    const minTime = Math.min(...toggleTimes);
    const maxTime = Math.max(...toggleTimes);

    onMetrics({
      'Total Toggles': toggleCount,
      'Total Time': `${totalTime.toFixed(2)} ms`,
      'Avg Toggle Time': `${avgTime.toFixed(2)} ms`,
      'Min Time': `${minTime.toFixed(2)} ms`,
      'Max Time': `${maxTime.toFixed(2)} ms`
    });
  };

  startButton = <button on:click={startToggleTest}>Toggle 100 times</button>;
  manualButton = <button on:click={manualToggle}>Manual Toggle</button>;

  const controls = (
    <div class="controls">
      {startButton}
      {manualButton}
    </div>
  );

  container.appendChild(<h2>Conditional Render Test</h2>);
  container.appendChild(controls);
  container.appendChild(componentContainer);

  return container;
}

export default ConditionalRenderTest;
