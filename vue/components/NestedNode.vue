<template>
  <div class="nested-component" :style="{ marginLeft: `${level * 20}px` }">
    <div>
      <strong>Level {{ level }}:</strong>
      {{ node.id }} = {{ node.value }} (updates: {{ node.updateCount }})
    </div>
    <NestedNode v-for="child in node.children" :key="child.id" :node="child" :level="level + 1" :max-level="maxLevel" />
  </div>
</template>

<script setup lang="ts">
interface NodeData {
  id: string;
  level: number;
  value: string;
  updateCount: number;
  children: NodeData[];
}

defineProps<{
  node: NodeData;
  level: number;
  maxLevel: number;
}>();
</script>
