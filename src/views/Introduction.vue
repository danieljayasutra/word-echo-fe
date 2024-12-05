<template>
  <div class="w-full h-screen flex items-end px-[5%] py-[10%] lg:p-[10%]">
    <div class="w-full space-y-20 lg:space-y-40">
      <div class=" flex justify-center lg:justify-start">
        <div class="w-[250px] lg:w-[500px]">
           <img src="../assets/word-echo.svg" alt="" />
        </div>
      </div>
      <div class="flex justify-end">
        <div class="grid grid-cols-12 gap-8">
          <div class=" col-span-12 lg:col-span-6 space-y-8">
            <div class="text-center lg:text-right space-y-8">
              <div>
                Made as an assignment <br />
                for Smart Web Programming
              </div>
              <div>
                Informatics Engineering <br />
                Mercubuana University
              </div>
            </div>
            <div class="flex justify-center">
              <button @click="$router.push('/choose-level')" class="bg-orange px-10 lg:px-32 text-black rounded-xl py-4 text-2xl font-bold">Play</button>
            </div>
          </div>
          <div class="lg:col-span-1 flex justify-center">
            <div class="bg-white w-[5px] h-full"></div>
          </div>
          <div class="col-span-12 lg:col-span-5 space-y-5 text-center lg:text-left">
            <div class="text-cyan text-4xl font-bold">Creator</div>
            <div class=" space-y-3">
              <div>Daniel Jayasutra</div>
              <div>Septian Pramana R</div>
              <div>Alya Hamida</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
