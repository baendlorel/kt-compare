import { ref } from 'kt.js';

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

export default function FrequentUpdateTest({ onMetrics }: TestProps) {
  const initItems = (): void => {
    gridContainer.value.innerHTML = '';
    items.length = 0;

    for (let i = 0; i < 100; i++) {
      const itemDiv = (
        <div
          style={`padding: 10px; background: ${colors[i % colors.length]}; color: white; border-radius: 4px; text-align: center;`}
        >
          0
        </div>
      );
      items.push(itemDiv);
    }
    gridContainer.value.append(...items);
  };

  const updateItems = (): void => {
    const frameStart = performance.now();
    // Use firstChild.nodeValue for faster text updates
    items.forEach((item) => {
      item.firstChild!.nodeValue = Math.floor(Math.random() * 100).toString();
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

  const startTest = (): void => {
    initItems();
    frameCount = 0;
    frameTimes.length = 0;
    startTime = performance.now();
    animationId = requestAnimationFrame(updateItems);
  };

  const stopTest = (): void => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

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
      Performance: fps >= 55 ? '✓ Good' : '✗ Poor',
    });
  };
  const gridContainer = ref();

  const container = (
    <div>
      <h2>Frequent Update Test</h2>
      <div class="controls">
        <button on:click={startTest}>Start Test (1000 frames)</button>
        <button on:click={stopTest} disabled>
          Stop
        </button>
      </div>
      <div ref={gridContainer} style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px;"></div>
    </div>
  );

  let animationId: number | null = null;
  let frameCount = 0;
  let startTime = 0;
  const frameTimes: number[] = [];
  const items: HTMLElement[] = [];
  const colors = ['#f44336', '#2196F3', '#4CAF50', '#FF9800', '#9C27B0'];

  return container;
}
