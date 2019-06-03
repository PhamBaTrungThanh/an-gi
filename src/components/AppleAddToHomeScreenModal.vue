<template>
  <div>
    <div class="modal-wrapper">
      <div class="close" @click="$emit('close')"></div>
      <div class="main-content">
        <img class="app-logo" src="@/assets/logo.png" />
        <h3 class="title">Install bento starter</h3>
        <p class="description">
          Install this application to your home screen for quickly and easy
          access when you're on the go.
        </p>
      </div>

      <div class="footer">
        Just tap
        <img
          class="apple-navigation-action-img"
          src="@/assets/img/apple-navigation-action.png"
        />then 'Add to Home Screen'
      </div>
    </div>
  </div>
</template>
