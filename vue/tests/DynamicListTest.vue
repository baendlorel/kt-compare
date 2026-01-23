<template>
  <div>
    <h2>Dynamic List Operations Test</h2>
    <div class="controls">
      <button @click="initList">Initialize (1000 items)</button>
      <button @click="insertAtStart" :disabled="items.length === 0">Insert at Start</button>
      <button @click="insertAtMiddle" :disabled="items.length === 0">Insert at Middle</button>
      <button @click="insertAtEnd" :disabled="items.length === 0">Insert at End</button>
      <button @click="deleteFromStart" :disabled="items.length === 0">Delete from Start</button>
      <button @click="deleteFromMiddle" :disabled="items.length === 0">Delete from Middle</button>
      <button @click="deleteFromEnd" :disabled="items.length === 0">Delete from End</button>
      <button @click="batchUpdate" :disabled="items.length === 0">Batch Update (100 items)</button>
    </div>

    <div v-if="items.length > 0" style="max-height: 400px; overflow-y: auto; margin-top: 20px">
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
let idCounter = 0;

const initList = (): void => {
  const startTime = performance.now();

  items.value = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
    value: Math.random().toFixed(3),
  }));
  idCounter = 1000;

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Initialize',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const insertAtStart = (): void => {
  const startTime = performance.now();

  items.value.unshift({
    id: idCounter++,
    text: `New Item ${idCounter}`,
    value: Math.random().toFixed(3),
  });

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Insert at Start',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const insertAtMiddle = (): void => {
  const startTime = performance.now();
  const middleIndex = Math.floor(items.value.length / 2);

  items.value.splice(middleIndex, 0, {
    id: idCounter++,
    text: `New Item ${idCounter}`,
    value: Math.random().toFixed(3),
  });

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Insert at Middle',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const insertAtEnd = (): void => {
  const startTime = performance.now();

  items.value.push({
    id: idCounter++,
    text: `New Item ${idCounter}`,
    value: Math.random().toFixed(3),
  });

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Insert at End',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const deleteFromStart = (): void => {
  const startTime = performance.now();
  items.value.shift();

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Delete from Start',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const deleteFromMiddle = (): void => {
  const startTime = performance.now();
  const middleIndex = Math.floor(items.value.length / 2);
  items.value.splice(middleIndex, 1);

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Delete from Middle',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const deleteFromEnd = (): void => {
  const startTime = performance.now();
  items.value.pop();

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Delete from End',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};

const batchUpdate = (): void => {
  const startTime = performance.now();

  // Update 100 random items
  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * items.value.length);
    items.value[randomIndex].value = Math.random().toFixed(3);
  }

  setTimeout(() => {
    const endTime = performance.now();
    emit('metrics', {
      Operation: 'Batch Update (100 items)',
      'Items Count': items.value.length,
      Time: `${(endTime - startTime).toFixed(2)} ms`,
    });
  }, 0);
};
</script>
