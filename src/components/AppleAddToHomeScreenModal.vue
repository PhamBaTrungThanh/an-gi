<template>
  <div>
    <div class="z-30 fixed inset-0 flex justify-center items-center">
      <div
        class="close z-40 bg-gray-900 opacity-75 w-screen h-screen absolute inset-0"
        @click="$emit('close')"
      ></div>
      <div
        class="main-content z-50 relative mx-4 rounded shadow bg-white overflow-hidden"
      >
        <div class="box p-2">
          <img class="mx-auto" src="@/assets/logo.png" />

          <h3 class="font-bold text-center">Cài đặt Ăn Gì Đây</h3>
          <p class="description">
            Cài đặt ứng dụng vào màn hình nền của bạn để có thể tăng tốc truy
            cập.
          </p>
        </div>
        <div class="footer bg-gray-200 p-2">
          Chỉ cần nhấn vào biểu tượng
          <img
            class="inline-block w-6 ml-1 mr-2"
            src="@/assets/img/apple-navigation-action.png"
          />sau đó chọn 'Add to Home Screen'
        </div>
      </div>
    </div>
  </div>
</template>
