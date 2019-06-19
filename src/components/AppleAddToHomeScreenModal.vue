<template>
  <div>
    <div class="z-50">
      <div class="close" @click="$emit('close')"></div>
      <div class="main-content">
        <img class="app-logo" src="@/assets/logo.png" />
        <h3 class="title">Cài đặt Ăn Gì Đây</h3>
        <p class="description">
          Cài đặt ứng dụng vào màn hình nền của bạn để có thể tăng tốc truy cập.
        </p>
      </div>

      <div class="footer">
        Chỉ cần nhấn vào
        <img
          class="apple-navigation-action-img"
          src="@/assets/img/apple-navigation-action.png"
        />sau đó chọn 'Add to Home Screen'
      </div>
    </div>
  </div>
</template>
