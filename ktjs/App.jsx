import { KTHTMLElement } from 'kt.js';
import LargeListTest from './tests/LargeListTest';
import FrequentUpdateTest from './tests/FrequentUpdateTest';
import NestedComponentTest from './tests/NestedComponentTest';
import ConditionalRenderTest from './tests/ConditionalRenderTest';
import EventHandlingTest from './tests/EventHandlingTest';
import DynamicListTest from './tests/DynamicListTest';
import InitializationTest from './tests/InitializationTest';

function App() {
  const tests = [
    { id: 'large-list', name: 'Large List', component: LargeListTest },
    { id: 'frequent-update', name: 'Frequent Update', component: FrequentUpdateTest },
    { id: 'nested-component', name: 'Nested Component', component: NestedComponentTest },
    { id: 'conditional-render', name: 'Conditional Render', component: ConditionalRenderTest },
    { id: 'event-handling', name: 'Event Handling', component: EventHandlingTest },
    { id: 'dynamic-list', name: 'Dynamic List', component: DynamicListTest },
    { id: 'initialization', name: 'Initialization', component: InitializationTest },
  ];

  let currentTest = 'large-list';
  let currentMetrics = null;

  const ktVersion = '0.14.6'; // KT.js version

  const metricsDiv = (<div class="metrics" style="display: none;"></div>) as KTHTMLElement;
  const testArea = (<div class="test-area"></div>) as HTMLDivElement;

  const updateMetrics = (metrics) => {
    if (!metrics) {
      metricsDiv.style.display = 'none';
      return;
    }

    currentMetrics = metrics;
    metricsDiv.style.display = 'block';
    metricsDiv.innerHTML = '';
    
    const frameworkItem = document.createElement('div');
    frameworkItem.className = 'metrics-item';
    frameworkItem.textContent = `Framework: KT.js ${ktVersion}`;
    metricsDiv.appendChild(frameworkItem);

    Object.entries(metrics).forEach(([key, value]) => {
      const item = document.createElement('div');
      item.className = 'metrics-item';
      item.textContent = `${key}: ${value}`;
      metricsDiv.appendChild(item);
    });
  };

  const renderTest = (testId) => {
    currentTest = testId;
    currentMetrics = null;
    metricsDiv.style.display = 'none';
    testArea.innerHTML = '';

    const test = tests.find(t => t.id === testId);
    if (test) {
      const testComponent = <test.component onMetrics={updateMetrics} />;
      testArea.appendChild(testComponent);
    }

    // Update active button state
    testButtons.forEach(btn => {
      if (btn.dataset.testId === testId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const testButtons = tests.map(test => {
    const btn = (
      <button 
        data-test-id={test.id}
        class={test.id === currentTest ? 'active' : ''}
        on:click={() => renderTest(test.id)}
      >
        {test.name}
      </button>
    );
    return btn;
  });

  // Initial render
  setTimeout(() => renderTest(currentTest), 0);

  return (
    <div class="container">
      <h1>KT.js Performance Test Suite</h1>
      
      <div class="test-selector">
        {...testButtons}
      </div>

      {metricsDiv}
      {testArea}
    </div>
  );
}

export default App;
