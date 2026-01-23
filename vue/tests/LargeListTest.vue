<template>
  <div>
    <h2>Large List Rendering Test</h2>
    <div class="controls">
      <button @click="generateList(1000)">1,000 Items</button>
      <button @click="generateList(5000)">5,000 Items</button>
      <button @click="generateList(10000)">10,000 Items</button>
      <button @click="generateList(100000)">10,000 Items</button>
      <button @click="clearList">Clear</button>
    </div>

    <div v-if="items.length > 0">
      <div class="list-item" v-for="item in items" :key="item.id">
        <span>{{ item.text }}</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ListItem {
  id: number;
  text: string;
  value: string;
}

const emit = defineEmits<{
  metrics: [metrics: Record<string, string | number> | null];
}>();

const items = ref<ListItem[]>([]);

const generateList = (count: number): void => {
  const startTime = performance.now();
  const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

  // Generate data
  const newItems: ListItem[] = [];
  for (let i = 0; i < count; i++) {
    newItems.push({
      id: i,
      text: `Item ${i}`,
      value: Math.random().toFixed(2),
    });
  }

  // Trigger render
  items.value = newItems;

  // Measure after next tick
  setTimeout(() => {
    const endTime = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

    emit('metrics', {
      'Render Time': `${(endTime - startTime).toFixed(2)} ms`,
      'Items Count': count,
      'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
      'Avg per Item': `${((endTime - startTime) / count).toFixed(4)} ms`,
    });
  }, 0);
};

const clearList = (): void => {
  items.value = [];
  emit('metrics', null);
};
</script>
