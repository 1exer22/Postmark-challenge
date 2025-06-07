<script setup lang="ts">
import { ref, onMounted } from "vue";
import EmailBox from "../components/EmailBox.vue";
import HowItWorks from "../components/HowItWorks.vue";
import { getLatestBeats } from "../firebase/beats";
import type { Beat } from "../types/Beat";

const emailAddress = "5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com";
const latestBeats = ref<Beat[]>([]);

const copyEmail = () => {
  navigator.clipboard.writeText(emailAddress);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

const isCopied = ref(false);

onMounted(async () => {
  latestBeats.value = await getLatestBeats();
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <section
      class="gradient-bg px-4 py-24 flex flex-col items-center justify-center text-center bg-gradient-size"
    >
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center mb-6">
          <div class="text-5xl mr-2">🎵</div>
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
            EmailBeats
          </h1>
        </div>

        <p class="text-xl md:text-2xl mt-4 mb-8 max-w-2xl mx-auto">
          Create music by email! It's as simple as sending a message.
        </p>

        <div class="w-full max-w-md mx-auto">
          <EmailBox
            :email="emailAddress"
            @copy="copyEmail"
            :is-copied="isCopied"
          />
        </div>

        <div class="mt-16 flex flex-col items-center">
          <a
            href="#how-it-works"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-500"
          >
            Try it now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <HowItWorks id="how-it-works" />

    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">
          Latest Created Beats
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="beat in latestBeats"
            :key="beat.id"
            class="bg-dark-300 p-6 rounded-xl hover:bg-dark-200 transition-colors"
          >
            <h3 class="text-xl font-semibold mb-3">{{ beat.title }}</h3>
            <p class="text-gray-400 mb-4">
              Sequence: <span class="text-white">{{ beat.sequence }}</span>
            </p>
            <div class="flex justify-between items-center">
              <router-link
                :to="`/beat/${beat.id}`"
                class="inline-flex items-center text-primary-400 hover:text-primary-300"
              >
                Listen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
              <span class="text-sm text-gray-400">
                {{ new Date(beat.created).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-8 bg-dark-400 mt-auto">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-400">
          &copy; {{ new Date().getFullYear() }} EmailBeats. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
