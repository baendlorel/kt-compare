<template>
  <div style="padding: 20px; background: #e3f2fd; border-radius: 8px">
    <h3>Component A (Large Component)</h3>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px">
      <div
        v-for="item in items"
        :key="item.id"
        style="padding: 15px; background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)"
      >
        <div>
          <strong>{{ item.title }}</strong>
        </div>
        <div>{{ item.description }}</div>
        <div style="color: #666; font-size: 12px">{{ item.timestamp }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Item {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

// Generate 200 items to make component heavy
const items = ref<Item[]>(
  Array.from({ length: 200 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `This is a description for item ${i}`,
    timestamp: new Date().toISOString(),
  })),
);
</script>
