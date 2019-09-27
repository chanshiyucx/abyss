<template>
  <span class="login_checkbox">
    <input :id="id" type="checkbox" />
    <label :for="id">{{ label }}</label>
  </span>
</template>

<script>
let GID = 1

export default {
  props: {
    label: {
      type: String
    }
  },
  data() {
    return {
      id: `login-checkbox-${GID++}`
    }
  }
}
</script>

<style lang="less">
.login_checkbox {
  input {
    display: none;
  }

  label:before,
  label:after {
    content: '';
    display: inline-block;
    margin-right: 5px;
    margin-top: 3px;
    width: 14px;
    height: 14px;
    vertical-align: top;
  }

  label:before {
    border-radius: 2px;
    background-color: white;
    box-shadow: 0 1px 1px #0066d0;
  }

  label:after {
    content: '\f00c';
    position: relative;
    display: none;
    z-index: 10;
    margin-right: -14px;
    width: 12px;
    height: 12px;
    padding: 1px;
    font: normal normal normal 12px/1 FontAwesome;
    color: #007dff;
    float: left;
  }

  input:checked + label:after {
    display: inline-block;
  }
}
</style>
