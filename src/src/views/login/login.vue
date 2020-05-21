<!--  -->
<template>
  <div class="login">
    <div class="container">
      <h5 class="title">
        <i>L</i>
        <i>O</i>
        <i>G</i>
        <i>I</i>
        <i>N</i>
      </h5>
      <a-form-model :model="ruleForm" ref="ruleForm" :rules="rules">
        <a-form-model prop="account">
          <a-input v-model="ruleForm.account" placeholder="请输入账号">
            <a-icon #prefix type="a-icon-user" />
          </a-input>
        </a-form-model>
        <a-form-model prop="password">
          <a-input
            :type="pswType"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <a-icon #prefix type="a-icon-lock" />
            <antd-icon
              #suffix
              :type="eyeCls"
              @click="handleEyeClick"
              style="color: #333333;"
            />
          </a-input>
        </a-form-model>
        <a-form-model>
          <a-button
            type="primary"
            @click="handleSubmit"
            class="login-btn"
            :loading="loading"
            block
            >登录</a-button
          >
        </a-form-model>
      </a-form-model>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import getRouteAndAddRoute from "@libs/routeMixin";
interface RuleFormINF {
  account: string;
  password: string;
}
function validateAccount(rule: any, value: string, callback: Function) {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
}
function validatePass(rule: any, value: string, callback: Function) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
}
@Component
export default class Login extends Vue {
  $refs!: {
    ruleForm: any;
  };
  ruleForm: RuleFormINF = {
    account: "",
    password: ""
  };
  rules = {
    account: [{ validator: validateAccount, trigger: "blur" }],
    password: [{ validator: validatePass, trigger: "blur" }]
  };
  encryptStatus = false; // true为加密 false 不加密
  loading = false; // 加载
  get eyeCls() {
    // 密码框眼睛样式
    return this.encryptStatus ? "hhf-icon-eye-close" : "hhf-icon-eye-open";
  }
  get pswType() {
    // 密码框类型
    return this.encryptStatus ? "password" : "text";
  }
  handleEyeClick() {
    this.encryptStatus = !this.encryptStatus;
  }
  handleSubmit() {
    this.loading = true;
    this.$refs["ruleForm"]
      .validate()
      .then(() => {
        getRouteAndAddRoute().then(() => {
          this.loading = false;
          this.$routerPush({ name: "Home" });
        });
      })
      .catch(() => {
        this.loading = false;
      });
    // this.$routerPush({ name: "Home" });
  }
}
</script>
<style lang="stylus" scoped>
.login
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  overflow hidden
  background-image: linear-gradient(0deg, #29bdd9 0%, #276ace 100%)
  .container
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color #ffffff
    width 300px
    border-radius 5px
    padding 0 20px
    box-shadow 0px 0px 10px 1px rgba(0, 0, 0, 0.3)
    .title
      text-align center
      font-size 40px
      height 40px
      line-height 40px
      font-weight bold
      margin 20px 0
      i
        display inline-block
        line-height 40px
      i:first-child
        color #08a678
      i:nth-child(2)
        color #f50
      i:nth-child(3)
        color #108ee9
      i:nth-child(4)
        color #fa8c16
      i:nth-child(5)
        color #722ed1
    .login-btn
      width 100%
</style>
