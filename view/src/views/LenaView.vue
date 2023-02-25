<template>
  <div class="w-full">
    <div class="flex bg-white" style="height:100vh;">
      <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
        <div>
          <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
            Lena <span style="color: #fc5500">{{ }}</span>
          </h2>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            ......
          </p>
          <div class="flex justify-center lg:justify-start mt-6">
            <button class="px-4 py-3 bg-gray-300 text-gray-900 text-base font-semibold rounded hover:bg-gray-400"
              @click="">
              取消
            </button>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
        <div class="h-full object-cover flex items-center text-center">
          <svg class="animate-spin h-80 w-80 mx-auto text-indigo" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="#fa5500"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>