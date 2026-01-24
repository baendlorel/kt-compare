<template>
  <div>
    <h2>Event Handling Test</h2>
    <div class="controls">
      <button @click="createButtons(1000)">Create 1000 Buttons</button>
      <button @click="createButtons(5000)">Create 5000 Buttons</button>
      <button @click="clearButtons">Clear</button>
    </div>

    <div v-if="clickCount > 0" style="margin: 15px 0; padding: 10px; background: #e8f5e9; border-radius: 4px">
      Total Clicks: {{ clickCount }}
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 5px">
      <button
        aaa
        v-for="btn in buttons"
        :key="btn.id"
        @click="handleClick(btn.id)"
        style="padding: 8px; font-size: 12px"
      >
        {{ btn.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

interface Button {
  id: number;
  label: string;
}

const emit = defineEmits<{
  metrics: [metrics: Record<string, string | number> | null];
}>();

const buttons = ref<Button[]>([]);
const clickCount = ref<number>(0);

const createButtons = async (count: number): Promise<void> => {
  const startTime = performance.now();
  const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

  buttons.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    label: `Btn ${Math.random()}`,
  }));

  clickCount.value = 0;
  console.log(document.querySelector('button[aaa]'));

  // Wait for DOM updates to complete
  await nextTick();
  console.log(document.querySelector('button[aaa]'));

  const endTime = performance.now();
  const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

  emit('metrics', {
    'Button Count': count,
    'Binding Time': `${(endTime - startTime).toFixed(2)} ms`,
    'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
    'Avg per Button': `${((endTime - startTime) / count).toFixed(4)} ms`,
  });
};

const handleClick = (id: number): void => {
  const startTime = performance.now();
  clickCount.value++;
  const endTime = performance.now();

  emit('metrics', {
    'Button Count': buttons.value.length,
    'Last Click': `Button ${id}`,
    'Response Time': `${(endTime - startTime).toFixed(4)} ms`,
    'Total Clicks': clickCount.value,
  });
};

const clearButtons = (): void => {
  buttons.value = [];
  clickCount.value = 0;
  emit('metrics', null);
};
</script>
