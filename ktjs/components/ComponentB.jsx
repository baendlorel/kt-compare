function ComponentB() {
  const icons = ['📊', '📈', '📉', '💰', '🎯', '⚡', '🔥', '⭐'];

  const cards = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    name: `Card ${i}`,
    value: (Math.random() * 1000).toFixed(2),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  }));

  return (
    <div style="padding: 20px; background: #fff3e0; border-radius: 8px;">
      <h3>Component B (Large Component)</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
        {cards.map((card) => (
          <div style="padding: 15px; background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="font-size: 24px; margin-bottom: 10px;">{card.icon}</div>
            <div>
              <strong>{card.name}</strong>
            </div>
            <div style="color: #666;">{card.value}</div>
            <div style="font-size: 12px; color: #999;">{card.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentB;
