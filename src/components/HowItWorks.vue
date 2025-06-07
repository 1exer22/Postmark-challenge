<script setup lang="ts">
// This component shows the 3 steps of how the service works
</script>

<template>
  <section id="how-it-works" class="py-16 px-4 bg-dark-400">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-16">How it works</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Step 1 -->
        <div
          class="bg-dark-300 p-6 rounded-xl flex flex-col items-center text-center transform transition-all hover:scale-105"
        >
          <div
            class="bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">1. Send an email</h3>
          <p class="text-gray-400">Send an email with your musical sequence</p>
        </div>

        <!-- Step 2 -->
        <div
          class="bg-dark-300 p-6 rounded-xl flex flex-col items-center text-center transform transition-all hover:scale-105"
        >
          <div
            class="bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">
            2. Our AI composes the beat
          </h3>
          <p class="text-gray-400">
            We transform your text into a professional musical sequence
          </p>
        </div>

        <!-- Step 3 -->
        <div
          class="bg-dark-300 p-6 rounded-xl flex flex-col items-center text-center transform transition-all hover:scale-105"
        >
          <div
            class="bg-primary-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">
            3. Receive and share your beat
          </h3>
          <p class="text-gray-400">
            Receive a response with a link to listen and share your beat with
            the world
          </p>
        </div>
      </div>

      <div class="mt-12 bg-dark-300 p-6 rounded-xl">
        <h3 class="text-xl font-semibold mb-4">How to write your sequence</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium mb-2">Available instruments:</h4>
            <ul class="list-disc list-inside text-gray-300">
              <li>kick - bass drum</li>
              <li>snare - snare drum</li>
              <li>hat - hi-hat</li>
              <li>clap - handclap</li>
              <li>tom - tom drum</li>
              <li>bass - bass synth</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-2">Sequence example:</h4>
            <code
              class="block bg-dark-500 p-3 rounded text-primary-300 font-mono"
            >
              kick snare kick kick snare hat hat hat
            </code>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
