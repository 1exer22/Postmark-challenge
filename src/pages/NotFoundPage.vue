<script setup lang="ts">
// 404 Page
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="text-6xl mb-4">🎵</div>
    <h1 class="text-4xl font-bold mb-4">404 - Beat Not Found</h1>
    <p class="text-xl text-gray-400 mb-8">
      Sorry, we couldn't find the beat you're looking for
    </p>
    <router-link
      to="/"
      class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors"
    >
      Back to home
    </router-link>
  </div>
</template>
