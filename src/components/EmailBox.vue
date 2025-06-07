<script setup lang="ts">
defineProps<{
  email: string;
  isCopied: boolean;
}>();

defineEmits(["copy"]);
</script>

<template>
  <div
    class="bg-dark-300 border border-dark-100 rounded-lg p-4 flex items-center justify-between transition-all hover:border-primary-500 group"
  >
    <div class="flex items-center flex-1 overflow-hidden">
      <span class="text-gray-400 mr-2">📧</span>
      <span
        class="text-white font-mono overflow-hidden text-ellipsis whitespace-nowrap"
        >{{ email }}</span
      >
    </div>

    <button
      @click="$emit('copy')"
      class="ml-4 px-3 py-2 rounded-md bg-dark-200 text-white hover:bg-primary-600 transition-colors flex items-center"
      aria-label="Copy email address"
    >
      <span v-if="isCopied">Copied!</span>
      <span v-else>Copier</span>
      <svg
        v-if="!isCopied"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path
          d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
