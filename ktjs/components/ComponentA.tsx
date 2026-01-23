interface Item {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

function ComponentA(): HTMLDivElement {
  const items: Item[] = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `This is a description for item ${i}`,
    timestamp: new Date().toISOString(),
  }));

  return (
    <div style="padding: 20px; background: #e3f2fd; border-radius: 8px;">
      <h3>Component A (Large Component)</h3>
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
        {items.map((item) => (
          <div style="padding: 15px; background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div>
              <strong>{item.title}</strong>
            </div>
            <div>{item.description}</div>
            <div style="color: #666; font-size: 12px;">{item.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  ) as HTMLDivElement;
}

export default ComponentA;
