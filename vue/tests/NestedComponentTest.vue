<template>
  <div>
    <h2>Nested Component Test</h2>
    <div class="controls">
      <button @click="createTree">Create Tree (10 levels, 5 children each)</button>
      <button @click="updateTree" :disabled="!treeData">Update All Nodes</button>
      <button @click="clearTree">Clear</button>
    </div>

    <NestedNode v-if="treeData" :node="treeData" :level="0" :max-level="10" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NestedNode from '../components/NestedNode.vue';

const emit = defineEmits(['metrics']);
const treeData = ref(null);
let updateCounter = 0;

const createNodeData = (id, level, maxLevel) => {
  const node = {
    id,
    level,
    value: Math.random().toFixed(3),
    updateCount: 0,
    children: [],
  };

  if (level < maxLevel) {
    for (let i = 0; i < 5; i++) {
      node.children.push(createNodeData(`${id}-${i}`, level + 1, maxLevel));
    }
  }

  return node;
};

const createTree = () => {
  const startTime = performance.now();
  const startMemory = performance.memory?.usedJSHeapSize || 0;

  treeData.value = createNodeData('root', 0, 10);

  setTimeout(() => {
    const endTime = performance.now();
    const endMemory = performance.memory?.usedJSHeapSize || 0;

    // Calculate total nodes (5^0 + 5^1 + ... + 5^10)
    const totalNodes = (Math.pow(5, 11) - 1) / 4;

    emit('metrics', {
      'Build Time': `${(endTime - startTime).toFixed(2)} ms`,
      'Total Nodes': totalNodes.toLocaleString(),
      'Memory Delta': `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)} MB`,
      'Avg per Node': `${(((endTime - startTime) / totalNodes) * 1000).toFixed(4)} μs`,
    });
  }, 0);
};

const updateNode = (node) => {
  node.value = Math.random().toFixed(3);
  node.updateCount++;
  node.children.forEach((child) => updateNode(child));
};

const updateTree = () => {
  if (!treeData.value) return;

  const startTime = performance.now();
  updateCounter++;

  updateNode(treeData.value);

  setTimeout(() => {
    const endTime = performance.now();
    const totalNodes = (Math.pow(5, 11) - 1) / 4;

    emit('metrics', {
      'Update Time': `${(endTime - startTime).toFixed(2)} ms`,
      'Update Count': updateCounter,
      'Total Nodes': totalNodes.toLocaleString(),
      'Avg per Node': `${(((endTime - startTime) / totalNodes) * 1000).toFixed(4)} μs`,
    });
  }, 0);
};

const clearTree = () => {
  treeData.value = null;
  updateCounter = 0;
  emit('metrics', null);
};
</script>
