<template>
  <div>
    <h2>Frequent Update Test</h2>
    <div class="controls">
      <button @click="startTest" :disabled="isRunning">Start Test (1000 frames)</button>
      <button @click="stopTest" :disabled="!isRunning">Stop</button>
    </div>

    <div v-if="items.length > 0" style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px">
      <div
        v-for="item in items"
        :key="item.id"
        :style="{
          padding: '10px',
          background: item.color,
          color: 'white',
          borderRadius: '4px',
          textAlign: 'center',
        }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Item {
  id: number;
  value: number;
  color: string;
}

const emit = defineEmits<{
  metrics: [metrics: Record<string, string | number> | null];
}>();

const items = ref<Item[]>([]);
const isRunning = ref<boolean>(false);
let animationId: number | null = null;
let frameCount = 0;
let startTime = 0;
const frameTimes: number[] = [];

const colors = ['#f44336', '#2196F3', '#4CAF50', '#FF9800', '#9C27B0'];

const initItems = (): void => {
  items.value = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    value: 0,
    color: colors[i % colors.length],
  }));
};

const updateItems = (): void => {
  const frameStart = performance.now();

  // Update all items
  items.value.forEach((item) => {
    item.value = Math.floor(Math.random() * 100);
  });

  frameCount++;
  const frameEnd = performance.now();
  frameTimes.push(frameEnd - frameStart);

  if (frameCount < 1000) {
    animationId = requestAnimationFrame(updateItems);
  } else {
    stopTest();
  }
};

const startTest = (): void => {
  initItems();
  isRunning.value = true;
  frameCount = 0;
  frameTimes.length = 0;
  startTime = performance.now();
  animationId = requestAnimationFrame(updateItems);
};

const stopTest = (): void => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  isRunning.value = false;

  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
  const fps = 1000 / avgFrameTime;

  emit('metrics', {
    'Total Frames': frameCount,
    'Total Time': `${totalTime.toFixed(2)} ms`,
    'Avg Frame Time': `${avgFrameTime.toFixed(2)} ms`,
    'Avg FPS': `${fps.toFixed(2)}`,
    'Target FPS': '60',
    Performance: fps >= 55 ? '✓ Good' : '✗ Poor',
  });
};
</script>
