<template>
  <div class="w-full h-screen flex items-end px-[5%] lg:px-[10%]">
    <div class="w-full h-screen flex flex-col justify-between gap-5 py-[20%] lg:py-[15%]">
      <div class="flex justify-center lg:justify-start">
        <div class="w-[150px] lg:w-[200px]">
          <img src="../assets/word-echo.svg" alt="" />
        </div>
      </div>
      <div class="lg:px-[20%]">
        <div class="space-y-10">
          <div class="flex items-center gap-10">
            <div class="space-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>
              <div class="text-xs">Play Audio</div>
            </div>
            <div class="text-xl mb-5">Listen to the audio and type what you hear</div>
          </div>
          <div class="w-full">
            <textarea rows="5" class="w-full py-5 px-8 outline-none overflow-hidden border-4 rounded-xl" placeholder="Type Here . . ." />
          </div>
        </div>
      </div>
      <div class="flex justify-center lg:justify-end gap-8">
        <button class="bg-white px-10 lg:px-20 text-black rounded-xl py-4 text-2xl font-bold">Skip</button>
        <button @click="$router.push('/choose-level')" class="bg-orange px-10 lg:px-20 text-black rounded-xl py-4 text-2xl font-bold">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const level = computed(() => route.query.lv);
</script>

<style scoped>
textarea {
  @apply bg-gray-600 text-xl;
}
</style>
