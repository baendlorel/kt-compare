interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

interface Card {
  id: number;
  title: string;
  description: string;
  action: string;
}

interface RecentItem {
  id: number;
  text: string;
}

interface Stat {
  label: string;
  value: string;
}

function InitializationTest({ onMetrics }: TestProps): HTMLDivElement {
  const container = (<div></div>) as HTMLDivElement;
  const appContainer = (<div></div>) as HTMLDivElement;

  let showApp = false;

  const cards: Card[] = [
    { id: 1, title: 'Dashboard', description: 'View your dashboard', action: 'Open' },
    { id: 2, title: 'Analytics', description: 'View analytics', action: 'View' },
    { id: 3, title: 'Settings', description: 'Manage settings', action: 'Configure' },
  ];

  const recentItems: RecentItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    text: `Recent item ${i + 1} - ${new Date().toLocaleString()}`,
  }));

  const stats: Stat[] = [
    { label: 'Users', value: '1,234' },
    { label: 'Revenue', value: '$45,678' },
    { label: 'Orders', value: '890' },
    { label: 'Products', value: '456' },
  ];

  const createApp = (): HTMLDivElement => {
    const app = (
      <div style="padding: 20px;">
        <header style="padding: 20px; background: #2c3e50; color: white; margin-bottom: 20px; border-radius: 4px;">
          <h1>Sample Application</h1>
          <nav style="margin-top: 10px;">
            <a href="#" style="color: white; margin-right: 15px;">
              Home
            </a>
            <a href="#" style="color: white; margin-right: 15px;">
              About
            </a>
            <a href="#" style="color: white; margin-right: 15px;">
              Contact
            </a>
          </nav>
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          {cards.map((card) => (
            <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button style="margin-top: 10px; padding: 8px 16px; background: #ff6b6b; color: white; border: none; border-radius: 4px;">
                {card.action}
              </button>
            </div>
          ))}
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
          <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Recent Items</h3>
            {recentItems.map((item) => (
              <div style="padding: 10px; border-bottom: 1px solid #eee;">{item.text}</div>
            ))}
          </div>

          <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Stats</h3>
            {stats.map((stat) => (
              <div style="margin: 10px 0;">
                <strong>{stat.label}:</strong> {stat.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    ) as HTMLDivElement;

    return app;
  };

  const measureInit = (): void => {
    // Clear first
    appContainer.innerHTML = '';
    showApp = false;

    setTimeout(() => {
      const startTime = performance.now();
      const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Trigger render
      showApp = true;
      const app = createApp();
      appContainer.appendChild(app);

      setTimeout(() => {
        const endTime = performance.now();
        const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

        onMetrics({
          'Initialization Time': `${(endTime - startTime).toFixed(2)} ms`,
          'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
          Components: '1 Header + 3 Cards + 1 List (20 items) + 1 Stats',
          Framework: 'KT.js',
        });
      }, 100); // Give time for render to complete
    }, 100);
  };

  const clearApp = (): void => {
    appContainer.innerHTML = '';
    showApp = false;
    onMetrics(null);
  };

  const controls = (
    <div class="controls">
      <button on:click={measureInit}>Measure Initialization</button>
      <button on:click={clearApp}>Clear App</button>
    </div>
  );

  container.appendChild(<h2>Initialization Performance Test</h2>);
  container.appendChild(controls);
  container.appendChild(appContainer);

  return container;
}

export default InitializationTest;
