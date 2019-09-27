<template>
  <span class="login_button">
    <input type="button" value="" />
    <label>Sign In</label>
    <label>Sign Up</label>
  </span>
</template>

<style lang="less">
.login_button {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;

  input {
    display: block;
    flex: 1;
    width: 0;
    height: 40px;
    border: none;
    border-radius: 2px;
    outline: none;
    background-color: #0066d0;
  }

  label {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s ease;
  }
}
</style>
