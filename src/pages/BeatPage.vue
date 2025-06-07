<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as Tone from "tone";
import QRCode from "qrcode";
import BeatVisualizer from "../components/BeatVisualizer.vue";
import EmailBox from "../components/EmailBox.vue";
import { getBeat } from "../firebase/beats";
import type { Beat } from "../types/Beat";

const route = useRoute();
const router = useRouter();
const beatId = ref<string>(route.params.id as string);

const beatData = ref<Beat>({
  id: beatId.value,
  created: new Date().toISOString(),
  sequence: "kick snare kick kick snare",
  email: "anonymous@example.com",
  title: "My Awesome Beat",
});

const sequenceToPattern = (sequence: string) => {
  const parts = sequence.split(" ");
  return parts.map((part) => part.trim()).filter((part) => part.length > 0);
};

const isPlaying = ref(false);
const pattern = ref<string[]>(sequenceToPattern(beatData.value.sequence));
const instrumentsReady = ref(false);
const beatUrl = ref<string>(window.location.href);
const qrCodeUrl = ref<string>("");
const isCopied = ref(false);
const visualizerBars = ref<number[]>(Array(16).fill(0));

const copyBeatUrl = () => {
  navigator.clipboard.writeText(beatUrl.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

const generateQRCode = async () => {
  try {
    qrCodeUrl.value = await QRCode.toDataURL(beatUrl.value);
  } catch (err) {
    console.error(err);
  }
};

const togglePlay = async () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
    isPlaying.value = false;
    return;
  }

  await Tone.start();

  if (!instrumentsReady.value) {
    // Create synthetic instruments instead of using samples
    const kick = new Tone.MembraneSynth().toDestination();
    const snare = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.0 },
    }).toDestination();
    const hat = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();
    const clap = new Tone.NoiseSynth({
      noise: { type: "brown" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.0 },
    }).toDestination();
    const tom = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 },
    }).toDestination();
    const bass = new Tone.MonoSynth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 },
    }).toDestination();

    // Store instruments in a global object
    (window as any).instruments = { kick, snare, hat, clap, tom, bass };
    instrumentsReady.value = true;
    startSequence();
  } else {
    startSequence();
  }
};

const startSequence = () => {
  Tone.Transport.cancel();

  const seq = new Tone.Sequence(
    (time, index) => {
      if (index < pattern.value.length) {
        const instrument = pattern.value[index];
        const instruments = (window as any).instruments;

        if (instruments && instrument in instruments) {
          // Trigger synthetic instruments based on type
          switch (instrument) {
            case "kick":
              instruments.kick.triggerAttackRelease("C2", "8n", time);
              break;
            case "snare":
            case "clap":
              instruments[instrument].triggerAttackRelease("8n", time);
              break;
            case "hat":
              instruments.hat.triggerAttackRelease("C4", "32n", time);
              break;
            case "tom":
              instruments.tom.triggerAttackRelease("G2", "8n", time);
              break;
            case "bass":
              instruments.bass.triggerAttackRelease("C1", "4n", time);
              break;
          }

          visualizerBars.value = visualizerBars.value.map((_, i) => {
            if (i === index % visualizerBars.value.length) {
              return Math.random() * 0.8 + 0.2;
            }
            return Math.max(0, visualizerBars.value[i] - 0.1);
          });
        }
      }
    },
    Array.from({ length: pattern.value.length }, (_, i) => i),
    "8n"
  );

  seq.start(0);
  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();
  isPlaying.value = true;
};

const createNewBeat = () => {
  navigator.clipboard.writeText(
    "5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com"
  );
  alert(
    "Email address copied! Send your sequence to 5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com"
  );
};

onMounted(async () => {
  if (!beatId.value || beatId.value === "undefined") {
    router.push("/");
    return;
  }

  const beat = await getBeat(beatId.value);
  if (beat) {
    beatData.value = beat;
    pattern.value = sequenceToPattern(beat.sequence);
  } else {
    router.push("/404");
    return;
  }

  await generateQRCode();
});

onBeforeUnmount(() => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
  }

  // Clean up synthetic instruments
  const instruments = (window as any).instruments;
  if (instruments) {
    Object.values(instruments).forEach((instrument: any) => {
      if (instrument && instrument.dispose) {
        instrument.dispose();
      }
    });
    (window as any).instruments = null;
  }
});
</script>

<template>
  <!-- The rest of the template remains unchanged -->
  <div class="min-h-screen flex flex-col">
    <header class="p-4 bg-dark-400">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <router-link
          to="/"
          class="flex items-center text-white hover:text-primary-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Accueil
        </router-link>

        <div class="flex items-center">
          <div class="text-2xl">🎵</div>
          <h1 class="text-xl font-bold">EmailBeats</h1>
        </div>

        <div class="w-24"></div>
      </div>
    </header>

    <main class="flex-1 flex flex-col p-4">
      <div class="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div class="bg-dark-300 p-6 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-1">{{ beatData.title }}</h2>
          <p class="text-gray-400 mb-4">
            Created on {{ new Date(beatData.created).toLocaleDateString() }}
          </p>

          <div
            class="p-4 bg-dark-400 rounded-lg font-mono mb-6 overflow-x-auto"
          >
            <code>{{ beatData.sequence }}</code>
          </div>

          <div class="flex justify-center mb-8">
            <button
              @click="togglePlay"
              class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-300 transition-all transform hover:scale-105"
            >
              <svg
                v-if="!isPlaying"
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <BeatVisualizer :bars="visualizerBars" :is-playing="isPlaying" />
        </div>

        <div class="bg-dark-300 p-6 rounded-xl mb-8">
          <h3 class="text-xl font-semibold mb-4">Share this beat</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="mb-4">
                <label class="block text-gray-400 mb-2">Link</label>
                <div class="flex">
                  <input
                    type="text"
                    readonly
                    :value="beatUrl"
                    class="flex-1 px-4 py-2 rounded-l-lg bg-dark-400 text-white border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    @click="copyBeatUrl"
                    class="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  >
                    <span v-if="isCopied">✓</span>
                    <span v-else>Copy</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-gray-400 mb-2">Email</label>
                <EmailBox
                  email="5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com"
                  :is-copied="false"
                  @copy="createNewBeat"
                />
                <p class="mt-2 text-sm text-gray-400">
                  Send an email to this address to create a new beat!
                </p>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center">
              <label class="block text-gray-400 mb-2">Scan to listen</label>
              <div
                v-if="qrCodeUrl"
                class="bg-white p-4 rounded-lg transform transition-all hover:scale-105"
              >
                <img
                  :src="qrCodeUrl"
                  alt="QR Code for sharing the beat"
                  class="w-32 h-32"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-primary-700 to-accent-700 p-8 rounded-xl text-center mb-8"
        >
          <h3 class="text-2xl font-bold mb-4">Create your own beat!</h3>
          <p class="mb-6">
            It's easy and fun - just send an email with your sequence
          </p>
          <button
            @click="createNewBeat"
            class="px-8 py-4 bg-white text-dark-500 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Create my beat
          </button>
        </div>
      </div>
    </main>

    <footer class="py-8 bg-dark-400">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-400">
          &copy; {{ new Date().getFullYear() }} EmailBeats. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
