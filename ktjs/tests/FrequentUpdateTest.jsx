function FrequentUpdateTest({ onMetrics }) {
  const container = (<div></div>) as HTMLDivElement;
  const gridContainer = (<div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px;"></div>) as HTMLDivElement;

  let isRunning = false;
  let animationId = null;
  let frameCount = 0;
  let startTime = 0;
  const frameTimes = [];
  const items = [];
  const colors = ['#f44336', '#2196F3', '#4CAF50', '#FF9800', '#9C27B0'];

  let startButton;
  let stopButton;

  const initItems = () => {
    gridContainer.innerHTML = '';
    items.length = 0;

    for (let i = 0; i < 100; i++) {
      const itemDiv = (
        <div style={`padding: 10px; background: ${colors[i % colors.length]}; color: white; border-radius: 4px; text-align: center;`}>
          0
        </div>
      ) as HTMLDivElement;
      items.push(itemDiv);
      gridContainer.appendChild(itemDiv);
    }
  };

  const updateItems = () => {
    const frameStart = performance.now();

    // Update all items
    items.forEach(item => {
      const value = Math.floor(Math.random() * 100);
      item.textContent = value.toString();
    });

    frameCount++;
    const frameEnd = performance.now();
    frameTimes.push(frameEnd - frameStart);

    if (frameCount < 1000) {
      animationId = requestAnimationFrame(updateItems);
    } else {
      stopTest();
    }
  };

  const startTest = () => {
    initItems();
    isRunning = true;
    frameCount = 0;
    frameTimes.length = 0;
    startTime = performance.now();
    startButton.disabled = true;
    stopButton.disabled = false;
    animationId = requestAnimationFrame(updateItems);
  };

  const stopTest = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;

    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    const fps = 1000 / avgFrameTime;

    onMetrics({
      'Total Frames': frameCount,
      'Total Time': `${totalTime.toFixed(2)} ms`,
      'Avg Frame Time': `${avgFrameTime.toFixed(2)} ms`,
      'Avg FPS': `${fps.toFixed(2)}`,
      'Target FPS': '60',
      'Performance': fps >= 55 ? '✓ Good' : '✗ Poor'
    });
  };

  startButton = <button on:click={startTest}>Start Test (1000 frames)</button>;
  stopButton = <button on:click={stopTest} disabled>Stop</button>;

  const controls = (
    <div class="controls">
      {startButton}
      {stopButton}
    </div>
  );

  container.appendChild(<h2>Frequent Update Test</h2>);
  container.appendChild(controls);
  container.appendChild(gridContainer);

  return container;
}

export default FrequentUpdateTest;
