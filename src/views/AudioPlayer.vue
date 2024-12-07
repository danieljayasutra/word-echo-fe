<template>
  <div class="audio-player">
    <!-- <button @click="togglePlay">
      <span v-if="isPlaying">Pause</span>
      <span v-else>Play</span>
    </button>
    <button @click="restartAudio">Restart</button> -->
    <audio ref="audioRef" :src="audioSrc" @loadedmetadata="updateDuration"></audio>
    <div class="progress-container" @click="seekAudio">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="time-info">
      <span>{{ formatTime(currentTime) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Props
const props = defineProps({
  audioSrc: {
    type: String,
    required: true,
  },
});

// Refs dan State
const audioRef = ref(null); // Referensi elemen <audio>
const isPlaying = ref(false); // Status pemutaran
const progress = ref(0); // Progress bar (dalam persen)
const duration = ref(0); // Total durasi audio
const currentTime = ref(0); // Waktu saat ini
let animationFrameId = null; // ID untuk requestAnimationFrame

// Fungsi toggle play/pause
const togglePlay = () => {
  if (!audioRef.value) return;

  if (isPlaying.value) {
    audioRef.value.pause();
    cancelAnimationFrame(animationFrameId); // Hentikan animasi
  } else {
    // Jika audio di akhir, mulai dari awal
    if (audioRef.value.currentTime === audioRef.value.duration) {
      audioRef.value.currentTime = 0;
      currentTime.value = 0;
      progress.value = 0;
    }
    audioRef.value.play();
    startAnimation(); // Mulai animasi progress
  }
  isPlaying.value = !isPlaying.value;
};

// Fungsi restart audio
const restartAudio = () => {
  if (!audioRef.value) return;

  // Set waktu audio ke 0
  audioRef.value.currentTime = 0;

  // Update progress bar langsung tanpa menunggu animasi
  currentTime.value = 0;
  progress.value = 0;

  // Mulai audio dan animasi jika audio belum diputar
  if (!isPlaying.value) {
    audioRef.value.play();
    isPlaying.value = true;
  }

  // Mulai animasi progress
  startAnimation();
};

// Fungsi untuk memperbarui durasi total
const updateDuration = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration;
  }
};

// Fungsi untuk memulai animasi progress
const startAnimation = () => {
  const updateProgress = () => {
    if (audioRef.value) {
      currentTime.value = audioRef.value.currentTime;
      progress.value = (currentTime.value / (audioRef.value.duration || 1)) * 100;

      // Jika audio selesai, hentikan animasi
      if (currentTime.value >= audioRef.value.duration) {
        isPlaying.value = false;
        cancelAnimationFrame(animationFrameId);
        return;
      }
    }
    animationFrameId = requestAnimationFrame(updateProgress); // Panggil lagi untuk frame berikutnya
  };

  animationFrameId = requestAnimationFrame(updateProgress); // Mulai animasi
};

// Fungsi untuk menghentikan animasi ketika komponen di-unmount
const stopAnimation = () => {
  cancelAnimationFrame(animationFrameId);
};

// Fungsi untuk mencari posisi audio berdasarkan klik pada progress bar
const seekAudio = (event) => {
  if (!audioRef.value) return;
  const container = event.currentTarget;
  const rect = container.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const newTime = (clickX / width) * audioRef.value.duration;
  audioRef.value.currentTime = newTime;
  progress.value = (newTime / (audioRef.value.duration || 1)) * 100;
};

const resetAudio = () => {
  if (!audioRef.value) return;

  // Set waktu audio ke awal
  audioRef.value.currentTime = 0;

  // Reset state progress bar dan current time
  currentTime.value = 0;
  progress.value = 0;

  // Jika audio sedang dimainkan, jeda audio tanpa memulai
  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
    cancelAnimationFrame(animationFrameId); // Hentikan animasi
  }
};

// Fungsi format waktu menjadi MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Lifecycle hooks untuk membersihkan animasi
onMounted(() => {
  if (audioRef.value) {
    audioRef.value.addEventListener('ended', () => {
      isPlaying.value = false;
      cancelAnimationFrame(animationFrameId);
    });
  }
});

onUnmounted(() => {
  stopAnimation(); // Hentikan animasi ketika komponen di-unmount
});

// expose
defineExpose({
  togglePlay,
  restartAudio,
  isPlaying,
  resetAudio,
});
</script>

<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  width: 100%;
}

button {
  margin-bottom: 10px;
  cursor: pointer;
}

.progress-container {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 5px 0;
  cursor: pointer;
}

.progress-bar {
  height: 100%;
  @apply bg-orange;
  width: 0;
  transition: width 0.1s linear;
}

.time-info {
  display: flex;
  justify-content: space-between;
  @apply text-base;
  color: white;
}
</style>
