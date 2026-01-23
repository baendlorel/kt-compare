<template>
  <div class="nested-component" :style="{ marginLeft: `${level * 20}px` }">
    <div>
      <strong>Level {{ level }}:</strong>
      {{ node.id }} = {{ node.value }} (updates: {{ node.updateCount }})
    </div>
    <NestedNode v-for="child in node.children" :key="child.id" :node="child" :level="level + 1" :max-level="maxLevel" />
  </div>
</template>

<script setup>
defineProps({
  node: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  maxLevel: {
    type: Number,
    required: true,
  },
});
</script>
