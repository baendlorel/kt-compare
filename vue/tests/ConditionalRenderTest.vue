<template>
  <div>
    <h2>Conditional Render Test</h2>
    <div class="controls">
      <button @click="startToggleTest" :disabled="isRunning">Toggle 100 times</button>
      <button @click="manualToggle" :disabled="isRunning">Manual Toggle</button>
    </div>

    <ComponentA v-if="showA" />
    <ComponentB v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentA from '../components/ComponentA.vue';
import ComponentB from '../components/ComponentB.vue';

const emit = defineEmits(['metrics']);
const showA = ref(true);
const isRunning = ref(false);

const manualToggle = () => {
  showA.value = !showA.value;
};

const startToggleTest = async () => {
  isRunning.value = true;
  const toggleTimes = [];
  const toggleCount = 100;

  for (let i = 0; i < toggleCount; i++) {
    const startTime = performance.now();
    showA.value = !showA.value;

    // Wait for next tick to ensure render complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    const endTime = performance.now();
    toggleTimes.push(endTime - startTime);
  }

  isRunning.value = false;

  const totalTime = toggleTimes.reduce((a, b) => a + b, 0);
  const avgTime = totalTime / toggleCount;
  const minTime = Math.min(...toggleTimes);
  const maxTime = Math.max(...toggleTimes);

  emit('metrics', {
    'Total Toggles': toggleCount,
    'Total Time': `${totalTime.toFixed(2)} ms`,
    'Avg Toggle Time': `${avgTime.toFixed(2)} ms`,
    'Min Time': `${minTime.toFixed(2)} ms`,
    'Max Time': `${maxTime.toFixed(2)} ms`,
  });
};
</script>
