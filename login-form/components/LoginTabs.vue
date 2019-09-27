<template>
  <ul class="login_tabs">
    <li><span>Sign up</span></li>
    <li class="login_tabs_s">or</li>
    <li><span>Sign in</span></li>
  </ul>
</template>

<style lang="less">
.login_tabs {
  display: flex;
  padding: 0 34px;

  li {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    transition: all 0.6s ease;
  }

  span {
    display: block;
    padding: 4px 10px;
    border: 1px solid white;
    border-radius: 3px;
    color: white;
    text-align: center;
    transition: all 0.3s ease;
  }

  .login_tabs_s {
    justify-content: center;
    transition-duration: 0.55s;
    transition-delay: 0.05s;
    font-size: 12px;

    &:before,
    &:after {
      content: '-';
    }
  }
}

.login__signup {
  .login_tabs {
    li:first-child {
      transition-duration: 0.5s;
      transition-delay: 0.1s;
      transform: translateX(100%) scale(1.5);
    }

    li:first-child span {
      border-color: transparent;
    }

    li:last-child {
      transform: scale(0.6);
      opacity: 0.4;
    }
  }

  .login_tabs_s {
    transform: translateX(58%);
    opacity: 0.8;
  }
}

.login__signin {
  .login_tabs {
    li:last-child {
      transition-duration: 0.5s;
      transition-delay: 0.1s;
      transform: translateX(-100%) scale(1.5);
    }

    li:last-child span {
      border-color: transparent;
    }

    li:first-child {
      transform: scale(0.6);
      opacity: 0.4;
    }
  }

  .login_tabs_s {
    transform: translateX(-58%);
    opacity: 0.8;
  }
}
</style>
