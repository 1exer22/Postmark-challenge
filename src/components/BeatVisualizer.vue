<script setup lang="ts">
defineProps<{
  bars: number[];
  isPlaying: boolean;
}>();
</script>

<template>
  <div class="flex items-end justify-between h-24 bg-dark-400 rounded-lg p-2 overflow-hidden">
    <div 
      v-for="(height, index) in bars" 
      :key="index" 
      class="visualizer-bar bg-gradient-to-t from-primary-600 to-accent-500 w-full mx-0.5 rounded-t"
      :class="{ 'opacity-50': !isPlaying }"
      :style="{
        height: `${Math.max(4, height * 100)}%`,
        transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.3)'
      }"
    ></div>
  </div>
</template>