<template>
  <div class="container">
    <h1>Vue Performance Test Suite</h1>

    <div class="test-selector">
      <button
        v-for="test in tests"
        :key="test.id"
        :class="{ active: currentTest === test.id }"
        @click="selectTest(test.id)"
      >
        {{ test.name }}
      </button>
    </div>

    <div class="metrics" v-if="metrics">
      <div class="metrics-item">Framework: Vue {{ vueVersion }}</div>
      <div class="metrics-item" v-for="(value, key) in metrics" :key="key">{{ key }}: {{ value }}</div>
    </div>

    <div class="test-area">
      <component :is="currentTestComponent" @metrics="updateMetrics" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, version, type Component } from 'vue';
import LargeListTest from './tests/LargeListTest.vue';
import FrequentUpdateTest from './tests/FrequentUpdateTest.vue';
import NestedComponentTest from './tests/NestedComponentTest.vue';
import ConditionalRenderTest from './tests/ConditionalRenderTest.vue';
import EventHandlingTest from './tests/EventHandlingTest.vue';
import DynamicListTest from './tests/DynamicListTest.vue';
import InitializationTest from './tests/InitializationTest.vue';

interface Test {
  id: string;
  name: string;
  component: Component;
}

const vueVersion = version;
const currentTest = ref<string>('large-list');
const metrics = ref<Record<string, string | number> | null>(null);

const tests: Test[] = [
  { id: 'large-list', name: 'Large List', component: LargeListTest },
  { id: 'frequent-update', name: 'Frequent Update', component: FrequentUpdateTest },
  { id: 'nested-component', name: 'Nested Component', component: NestedComponentTest },
  { id: 'conditional-render', name: 'Conditional Render', component: ConditionalRenderTest },
  { id: 'event-handling', name: 'Event Handling', component: EventHandlingTest },
  { id: 'dynamic-list', name: 'Dynamic List', component: DynamicListTest },
  { id: 'initialization', name: 'Initialization', component: InitializationTest },
];

const currentTestComponent = computed(() => {
  return tests.find((t) => t.id === currentTest.value)?.component;
});

const selectTest = (testId: string): void => {
  currentTest.value = testId;
  metrics.value = null;
};

const updateMetrics = (newMetrics: Record<string, string | number> | null): void => {
  metrics.value = newMetrics;
};
</script>
