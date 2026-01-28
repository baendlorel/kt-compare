import { KTFor, KTHTMLElement } from 'kt.js';

interface TestProps {
  onMetrics: (metrics: Record<string, string | number> | null) => void;
}

interface ListItem {
  id: number;
  text: string;
  value: string;
}

interface ButtonRefs {
  init: HTMLButtonElement;
  insertStart: HTMLButtonElement;
  insertMiddle: HTMLButtonElement;
  insertEnd: HTMLButtonElement;
  deleteStart: HTMLButtonElement;
  deleteMiddle: HTMLButtonElement;
  deleteEnd: HTMLButtonElement;
  batchUpdate: HTMLButtonElement;
}

function DynamicListTest({ onMetrics }: TestProps) {
  const container = <div></div>;

  let items: ListItem[] = [];
  let idCounter = 0;
  let buttons: Partial<ButtonRefs> = {};

  // Create KTFor list component with key-based optimization
  const listComponent = (
    <KTFor
      list={items}
      key={(item) => item.id}
      map={(item) => (
        <div class="list-item">
          <span>{item.text}</span>
          <span>{item.value}</span>
        </div>
      )}
    />
  ) as any;

  const listContainer = (
    <div style="max-height: 400px; overflow-y: auto; margin-top: 20px;">{listComponent}</div>
  ) as KTHTMLElement<HTMLDivElement>;

  const initList = (): void => {
    const startTime = performance.now();

    items = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Item ${i}`,
      value: Math.random().toFixed(3),
    }));
    idCounter = 1000;

    listComponent.redraw({ list: items });

    // Enable operation buttons
    Object.values(buttons).forEach((btn) => {
      if (btn && 'disabled' in btn) btn.disabled = false;
    });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Initialize',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const insertAtStart = (): void => {
    const startTime = performance.now();

    items = [
      {
        id: idCounter++,
        text: `New Item ${idCounter}`,
        value: Math.random().toFixed(3),
      },
      ...items,
    ];

    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Insert at Start',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const insertAtMiddle = (): void => {
    const startTime = performance.now();
    const middleIndex = Math.floor(items.length / 2);

    items = [
      ...items.slice(0, middleIndex),
      {
        id: idCounter++,
        text: `New Item ${idCounter}`,
        value: Math.random().toFixed(3),
      },
      ...items.slice(middleIndex),
    ];

    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Insert at Middle',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const insertAtEnd = (): void => {
    const startTime = performance.now();

    items = [
      ...items,
      {
        id: idCounter++,
        text: `New Item ${idCounter}`,
        value: Math.random().toFixed(3),
      },
    ];

    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Insert at End',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const deleteFromStart = (): void => {
    const startTime = performance.now();
    items = items.slice(1);
    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Delete from Start',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const deleteFromMiddle = (): void => {
    const startTime = performance.now();
    const middleIndex = Math.floor(items.length / 2);
    items = [...items.slice(0, middleIndex), ...items.slice(middleIndex + 1)];
    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Delete from Middle',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const deleteFromEnd = (): void => {
    const startTime = performance.now();
    items = items.slice(0, -1);
    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Delete from End',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  const batchUpdate = (): void => {
    const startTime = performance.now();

    // Update 100 random items - create new array with updated values
    items = items.map((item) => {
      if (Math.random() < 100 / items.length) {
        return { ...item, value: Math.random().toFixed(3) };
      }
      return item;
    });

    // Ensure exactly 100 items are updated if random selection didn't hit 100
    const updateCount = Math.min(100, items.length);
    for (let i = 0; i < updateCount; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      items[randomIndex] = { ...items[randomIndex], value: Math.random().toFixed(3) };
    }

    listComponent.redraw({ list: items });

    setTimeout(() => {
      const endTime = performance.now();
      onMetrics({
        Operation: 'Batch Update (100 items)',
        'Items Count': items.length,
        Time: `${(endTime - startTime).toFixed(2)} ms`,
      });
    }, 0);
  };

  // Create buttons and store references
  buttons = {
    init: (<button on:click={initList}>Initialize (1000 items)</button>) as KTHTMLElement<HTMLButtonElement>,
    insertStart: (
      <button on:click={insertAtStart} disabled>
        Insert at Start
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    insertMiddle: (
      <button on:click={insertAtMiddle} disabled>
        Insert at Middle
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    insertEnd: (
      <button on:click={insertAtEnd} disabled>
        Insert at End
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    deleteStart: (
      <button on:click={deleteFromStart} disabled>
        Delete from Start
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    deleteMiddle: (
      <button on:click={deleteFromMiddle} disabled>
        Delete from Middle
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    deleteEnd: (
      <button on:click={deleteFromEnd} disabled>
        Delete from End
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
    batchUpdate: (
      <button on:click={batchUpdate} disabled>
        Batch Update (100 items)
      </button>
    ) as KTHTMLElement<HTMLButtonElement>,
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
