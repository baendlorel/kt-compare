<template>
  <div>
    <h2>Initialization Performance Test</h2>
    <div class="controls">
      <button @click="measureInit">Measure Initialization</button>
      <button @click="clearApp">Clear App</button>
    </div>

    <div v-if="showApp">
      <!-- Simulate a typical app structure -->
      <div style="padding: 20px">
        <header style="padding: 20px; background: #2c3e50; color: white; margin-bottom: 20px; border-radius: 4px">
          <h1>Sample Application</h1>
          <nav style="margin-top: 10px">
            <a href="#" style="color: white; margin-right: 15px">Home</a>
            <a href="#" style="color: white; margin-right: 15px">About</a>
            <a href="#" style="color: white; margin-right: 15px">Contact</a>
          </nav>
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px">
          <div
            v-for="card in cards"
            :key="card.id"
            style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
            <button
              style="
                margin-top: 10px;
                padding: 8px 16px;
                background: #42b983;
                color: white;
                border: none;
                border-radius: 4px;
              "
            >
              {{ card.action }}
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px">
          <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)">
            <h3>Recent Items</h3>
            <div v-for="item in recentItems" :key="item.id" style="padding: 10px; border-bottom: 1px solid #eee">
              {{ item.text }}
            </div>
          </div>

          <div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)">
            <h3>Stats</h3>
            <div v-for="stat in stats" :key="stat.label" style="margin: 10px 0">
              <strong>{{ stat.label }}:</strong> {{ stat.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['metrics']);
const showApp = ref(false);

const cards = [
  { id: 1, title: 'Dashboard', description: 'View your dashboard', action: 'Open' },
  { id: 2, title: 'Analytics', description: 'View analytics', action: 'View' },
  { id: 3, title: 'Settings', description: 'Manage settings', action: 'Configure' },
];

const recentItems = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  text: `Recent item ${i + 1} - ${new Date().toLocaleString()}`,
}));

const stats = [
  { label: 'Users', value: '1,234' },
  { label: 'Revenue', value: '$45,678' },
  { label: 'Orders', value: '890' },
  { label: 'Products', value: '456' },
];

const measureInit = () => {
  // Clear first
  showApp.value = false;

  setTimeout(() => {
    const startTime = performance.now();
    const startMemory = performance.memory?.usedJSHeapSize || 0;

    // Trigger render
    showApp.value = true;

    setTimeout(() => {
      const endTime = performance.now();
      const endMemory = performance.memory?.usedJSHeapSize || 0;

      emit('metrics', {
        'Initialization Time': `${(endTime - startTime).toFixed(2)} ms`,
        'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
        Components: '1 Header + 3 Cards + 1 List (20 items) + 1 Stats',
        Framework: 'Vue 3',
      });
    }, 100); // Give time for render to complete
  }, 100);
};

const clearApp = () => {
  showApp.value = false;
  emit('metrics', null);
};
</script>
