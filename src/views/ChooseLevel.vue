<template>
  <div class="w-full h-screen flex items-end px-[5%] lg:px-[10%]">
    <div class="w-full h-screen flex flex-col justify-between gap-5 py-[20%] lg:py-[15%]">
      <div class="flex justify-center lg:justify-start">
        <div class="w-[150px] lg:w-[200px]">
          <img src="../assets/word-echo.svg" alt="" />
        </div>
      </div>
      <div class="flex justify-end">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-12 lg:col-span-6 space-y-8">
            <div class="text-cyan text-4xl font-bold text-center lg:text-right">Choose Level</div>
            <div class="text-center flex flex-col items-center lg:items-end space-y-6 font-bold text-xl">
              <div @click="chooseLevel('easy')" :class="{ 'text-orange': level == 'easy' }" class="flex items-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
                <span>Entry Level</span>
              </div>
              <div @click="chooseLevel('medium')" :class="{ 'text-orange': level == 'medium' }" class="flex items-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
                <span>Intermediet</span>
              </div>
              <div @click="chooseLevel('hard')" :class="{ 'text-orange': level == 'hard' }" class="flex items-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
                <span>Hard</span>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1 flex justify-center">
            <div class="bg-white w-[5px] h-full"></div>
          </div>
          <div class="col-span-12 lg:col-span-5 space-y-5 text-center lg:text-left">
            <div class="space-y-3">
              <div class="text-cyan text-xl font-bold">{{ textLevel }}</div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Atque, consequatur! Enim aliquam repudiandae explicabo.
              </div>
            </div>
            <div class="flex justify-center lg:justify-start">
              <button
                @click="$router.push(`/quiz-process?lv=${level}`)"
                class="bg-orange px-10 lg:px-32 text-black rounded-xl py-4 text-2xl font-bold"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const level = ref('easy');
const textLevel = computed(() => {
  if (level.value == 'medium') return 'Intermediet';
  if (level.value == 'hard') return 'Hard';
  return 'Entry Level';
});

function chooseLevel(val) {
  level.value = val;
}
</script>
