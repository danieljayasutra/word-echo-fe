<template>
  <div class="w-full h-screen flex items-end px-[5%] lg:px-[10%]">
    <div class="w-full h-screen flex flex-col justify-between gap-5 py-[20%] lg:pb-[15%] lg:pt-[5%]">
      <div class="flex justify-between">
        <div class="w-[150px] lg:w-[200px]">
          <img src="../assets/word-echo.svg" alt="" />
        </div>
        <div class="text-right">
          <div class="capitalize text-2xl font-bold text-cyan">{{ textLevel }}</div>
          <div class="text-base tracking-widest">Challenge {{ quizFinished.length }}/3</div>
        </div>
      </div>
      <div class="lg:px-[20%]" v-if="quiz">
        <div class="space-y-10">
          <div class="flex items-center gap-10 cursor-pointer">
            <div class="select-none">
              <div v-if="playerRef?.isPlaying" class="space-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z"
                  />
                </svg>
              </div>
              <div v-else class="space-y-1" @click="playerRef?.togglePlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>
              </div>
            </div>
            <div>
              <div class="text-xl mb-5">Listen to the audio and type what you hear</div>
              <div>
                <AudioPlayer ref="playerRef" :audioSrc="audioUrl"></AudioPlayer>
              </div>
            </div>
          </div>
          <form ref="form" action="" @submit.prevent="" class="w-full space-y-7">
            <div class="bg-[#21293a] px-5 rounded-lg py-2" v-if="false"><span class="font-bold text-lime-300">Correct answer: </span> <br /></div>
            <textarea
              v-model="data.verifyText"
              required
              rows="3"
              class="w-full py-5 px-8 outline-none overflow-hidden border-4 rounded-xl"
              placeholder="Type Here . . ."
            />
          </form>
        </div>
      </div>
      <div class="flex justify-center lg:justify-end gap-8">
        <button
          :disabled="isNextQuiz"
          :class="{ 'opacity-30': isNextQuiz }"
          v-if="!isLastQuiz"
          @click="toSkipQuiz"
          class="bg-white px-10 lg:px-20 text-black rounded-xl py-4 text-2xl font-bold"
        >
          Skip
        </button>
        <button
          v-if="isShowResult"
          @click="$router.replace(`/quiz-result?lv=${level}`)"
          class="bg-cyan-600 px-10 lg:px-20 text-white rounded-xl py-4 text-2xl font-bold"
        >
          Result
        </button>
        <div v-if="isEnableNext">
          <button v-if="isNextQuiz" @click="toNextQuiz" class="bg-orange px-10 lg:px-20 text-black rounded-xl py-4 text-2xl font-bold">Next</button>
          <button v-else @click="submit" class="bg-orange px-10 lg:px-20 text-black rounded-xl py-4 text-2xl font-bold">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { axiosApi } from '../helpers/axios';
import catcher from '../helpers/catcher';
import AudioPlayer from './AudioPlayer.vue';
import { toast } from '../helpers/instance';
const totalLimit = computed(() => import.meta.env.VITE_QUIZ_LIMIT);

const route = useRoute();
const level = computed(() => route.query.lv);
const audioUrl = ref('');
const playerRef = ref(undefined);
const form = ref(undefined);
const quiz = ref(undefined);
const data = ref({
  verifyText: '',
});
const quizFinished = ref([]);
const isNextQuiz = ref(false);
const isLastQuiz = ref(false);
const isShowResult = ref(false);
const isEnableNext = ref(true);

const textLevel = computed(() => {
  if (level.value == 'medium') return 'Intermediet';
  if (level.value == 'hard') return 'Hard';
  return 'Entry Level';
});

function getQuizFinished() {
  if (sessionStorage.getItem('quiz-fns')) {
    quizFinished.value = JSON.parse(sessionStorage.getItem('quiz-fns') || []);
  }
}
getQuizFinished();

async function obtainQuiz() {
  catcher(async () => {
    const responseQuiz = await axiosApi.post('/quiz/obtain', {
      difficulty: level.value,
      excludedIds: [],
    });
    quiz.value = responseQuiz?.data;
    const responseAudio = await axiosApi.post(
      '/audio',
      {
        id: responseQuiz.data?.id,
        difficulty: responseQuiz.data?.difficulty,
      },
      { responseType: 'arraybuffer' },
    );

    // Membuat file Blob dari ArrayBuffer
    const blob = new Blob([responseAudio.data], { type: 'audio/wav' });

    // Membuat URL sementara untuk Blob
    audioUrl.value = URL.createObjectURL(blob);

    if (quizFinished.value.length >= parseInt(totalLimit.value) - 1) {
      isLastQuiz.value = true;
    }
  });
}
obtainQuiz();

function submit() {
  if (!form.value.checkValidity()) {
    return form.value.reportValidity();
  }
  catcher(async () => {
    const response = await axiosApi.post('/quiz/verify', {
      id: quiz.value.id,
      difficulty: quiz.value.difficulty,
      verifyText: data.value.verifyText,
    });
    if (response?.data?.isSame) {
      toast.success(getRandomCorrectAnswer(), { duration: 5000 });
      quizFinished.value.push({
        ...quiz.value,
        done: true,
      });
      sessionStorage.setItem('quiz-fns', JSON.stringify(quizFinished.value));
      isNextQuiz.value = true;
      if (isLastQuiz.value) {
        isEnableNext.value = false;
      }
    } else {
      toast.warning(getRandomIncorrectAnswer(), { duration: 5000 });
    }
    if (isLastQuiz.value) {
      isShowResult.value = true;
    }
  });
}

function toNextQuiz() {
  isNextQuiz.value = false;
  playerRef?.value?.resetAudio();
  data.value.verifyText = '';
  obtainQuiz();
}

function toSkipQuiz() {
  isNextQuiz.value = false;
  data.value.verifyText = '';
  quizFinished.value.push({
    ...quiz.value,
    done: false,
  });
  sessionStorage.setItem('quiz-fns', JSON.stringify(quizFinished.value));
  toast.info(getRandomSkippedMessage(), { duration: 3000 });
  obtainQuiz();
}

// Array berisi jawaban yang benar
const correctAnswers = [
  'Your answer is correct!',
  "That's the correct answer!",
  'You got it right!',
  "Well done, that's the right answer!",
  'Great job, your answer is correct!',
  'Excellent! You got the right answer!',
];

// Fungsi untuk mengambil satu jawaban secara acak
function getRandomCorrectAnswer() {
  const randomIndex = Math.floor(Math.random() * correctAnswers.length);
  return correctAnswers[randomIndex];
}

// Array berisi jawaban yang salah
const incorrectAnswers = [
  "That's incorrect, try again!",
  "Oops, that's not the right answer.",
  'Sorry, your answer is wrong.',
  'Not quite, give it another shot!',
  "Unfortunately, that's not correct.",
  'Nope, try once more!',
  "Wrong answer, but don't give up!",
];

// Fungsi untuk mengambil satu jawaban salah secara acak
function getRandomIncorrectAnswer() {
  const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
  return incorrectAnswers[randomIndex];
}

// Array berisi pesan saat kuis dilewati
const skippedMessages = [
  'You skipped this question.',
  "No answer? Let's move to the next question!",
  'This one was skipped. Try the next one!',
  "Question skipped. Don't worry, keep going!",
  "Skipped! Let's focus on the next question.",
  'You chose to skip this question.',
];

// Fungsi untuk mengambil satu pesan skip secara acak
function getRandomSkippedMessage() {
  const randomIndex = Math.floor(Math.random() * skippedMessages.length);
  return skippedMessages[randomIndex];
}
</script>

<style scoped>
textarea {
  @apply bg-gray-600 text-xl;
}
</style>

<style scoped>
.audio-visualizer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.audio-button {
  margin: 10px 5px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.audio-button:hover {
  background-color: #0056b3;
}

.audio-canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
