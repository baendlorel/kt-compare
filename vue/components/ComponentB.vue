<template>
  <div style="padding: 20px; background: #fff3e0; border-radius: 8px">
    <h3>Component B (Large Component)</h3>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px">
      <div
        v-for="card in cards"
        :key="card.id"
        style="padding: 15px; background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)"
      >
        <div style="font-size: 24px; margin-bottom: 10px">{{ card.icon }}</div>
        <div>
          <strong>{{ card.name }}</strong>
        </div>
        <div style="color: #666">{{ card.value }}</div>
        <div style="font-size: 12px; color: #999">{{ card.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const icons = ['📊', '📈', '📉', '💰', '🎯', '⚡', '🔥', '⭐'];

// Generate 200 cards to make component heavy
const cards = ref(
  Array.from({ length: 200 }, (_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    name: `Card ${i}`,
    value: (Math.random() * 1000).toFixed(2),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  })),
);
</script>
