<template>
  <div>
    <h2>Large List Rendering Test</h2>
    <div class="controls">
      <button @click="generateList(1000)">1,000 Items</button>
      <button @click="generateList(5000)">5,000 Items</button>
      <button @click="generateList(10000)">10,000 Items</button>
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

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['metrics']);
const items = ref([]);

const generateList = (count) => {
  const startTime = performance.now();
  const startMemory = performance.memory?.usedJSHeapSize || 0;

  // Generate data
  const newItems = [];
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
    const endMemory = performance.memory?.usedJSHeapSize || 0;

    emit('metrics', {
      'Render Time': `${(endTime - startTime).toFixed(2)} ms`,
      'Items Count': count,
      'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
      'Avg per Item': `${((endTime - startTime) / count).toFixed(4)} ms`,
    });
  }, 0);
};

const clearList = () => {
  items.value = [];
  emit('metrics', null);
};
</script>
