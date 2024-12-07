<template>
  <div class="w-full h-screen flex items-end px-[5%] py-[10%] lg:p-[10%]">
    <div class="w-full space-y-20 lg:space-y-40">
      <div class="flex justify-center lg:justify-start">
        <div class="w-[250px] lg:w-[500px]">
          <img src="../assets/word-echo.svg" alt="" />
        </div>
      </div>
      <div class="flex justify-end">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-5 lg:col-span-6 space-y-5">
            <div>
              <div class="text-2xl text-cyan font-bold">{{ textLevel }}</div>
              <div class="text-xs">Difficulty</div>
            </div>
            <div class="space-y-7">
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                  <path
                    d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"
                  />
                  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                </svg>
                <div class="font-bold">
                  <div class="text-2xl">{{ getDone().length }}/{{ totalLimit }}</div>
                  <div class="text-xs text-cyan">Challenges</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-bullseye" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
                <div class="font-bold">
                  <div class="text-2xl">{{ calcAccuration(getDone().length, totalLimit) }}%</div>
                  <div class="text-xs text-cyan">Accuracy</div>
                </div>
              </div>
              <button @click="toHome" class="bg-orange px-8 lg:px-16 text-black rounded-xl py-4 text-2xl font-bold">Try Again</button>
            </div>
          </div>
          <div class="lg:col-span-1 flex justify-center">
            <div class="bg-white w-[5px] h-full"></div>
          </div>
          <div class="col-span-12 lg:col-span-5 space-y-5 text-center lg:text-left">
            <div class="font-bold text-lg">List of Quizzes</div>
            <div v-for="(val, idx) in quizFinished" :key="idx" class="flex gap-3 items-center border-b pb-2 border-gray-500">
              <div>{{ idx + 1 }})</div>
              <div class="flex-grow">{{ val.sentence }}</div>
              <div>
                <svg
                  v-if="val.done"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  class="bi bi-check2-circle text-lime-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
                <svg
                  v-if="!val.done"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  class="bi bi-x-circle text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const level = computed(() => route.query.lv);
const textLevel = computed(() => {
  if (level.value == 'medium') return 'Intermediet';
  if (level.value == 'hard') return 'Hard';
  return 'Entry Level';
});

function toHome() {
  sessionStorage.clear();
  router.replace('/introduction');
}

const quizFinished = ref(undefined);
const totalLimit = computed(() => import.meta.env.VITE_QUIZ_LIMIT);

function getDone() {
  const copy = JSON.parse(JSON.stringify(quizFinished.value));
  return copy.filter((val) => val.done);
}

function getQuizFinished() {
  if (sessionStorage.getItem('quiz-fns')) {
    quizFinished.value = JSON.parse(sessionStorage.getItem('quiz-fns') || []);
  }
}
getQuizFinished();

function calcAccuration(jumlahBenar, totalSoal) {
  if (totalSoal === 0) {
    return 0; // Hindari pembagian dengan nol
  }
  const result = (jumlahBenar / totalSoal) * 100;
  return result.toFixed(1);
}
</script>
