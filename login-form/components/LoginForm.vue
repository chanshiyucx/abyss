<template>
  <form class="login_form">
    <div class="login_form_r1">
      <div class="login_text">
        <login-textfield label="First name" icon="user" />
        <login-textfield label="Last name" />
      </div>
    </div>
    <div class="login_form_r2">
      <login-textfield label="Email address" icon="envelope-o" />
    </div>
    <div class="login_form_r3">
      <login-textfield label="Enter password" icon="lock" />
    </div>
    <div class="login_form_r4">
      <login-textfield label="Re-enter password" icon="lock" />
    </div>
    <div class="login_form_r5">
      <login-checkbox label="Keep me sign in" />
      <label>Forget passwords</label>
    </div>
    <div>
      <login-submit />
    </div>
  </form>
</template>

<script>
import LoginTextfield from './LoginTextfield'
import LoginCheckbox from './LoginCheckbox'
import LoginSubmit from './LoginSubmit'

export default {
  components: {
    LoginTextfield,
    LoginCheckbox,
    LoginSubmit
  }
}
</script>

<style lang="less">
.login_form {
  padding: 20px;

  > div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    min-height: 40px;
    transition: all 0.6s ease;
  }
}

.login_text {
  display: flex;
  flex: 1;

  .login_textfield {
    border-radius: 0;
  }

  .login_textfield:first-child {
    border-radius: 2px 0 0 2px;
  }

  .login_textfield:last-child {
    border-radius: 0 2px 2px 0;
  }
}

.login__signup {
  .login_form_r5 {
    opacity: 0;
    transition-duration: 0.4s;
  }

  .login_button label:nth-child(2) {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.login__signin {
  .login_form_r1,
  .login_form_r4 {
    opacity: 0;
    transform: translateY(30%) scale(0.8);
  }

  .login_form_r2,
  .login_form_r3 {
    transform: translateY(-100%);
  }

  .login_form_r5 {
    transform: translateY(-200%);
  }

  .login_button label:nth-child(3) {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
