<style lang="scss" src="./login.scss"></style>

<template>
  <div class="page-auth-login">
    <div class="container">
      <div class="login-con">
        <div class="login-con__title">会员登录</div>
        <SpForm class="login-con__bd" ref="form-login" :model="accountInfo" :rules="formRules">
          <SpFormItem prop="account">
            <SpInput
              v-model="accountInfo.account"
              placeholder="手机号"
              @keyup.enter.native="handleSubmit()"
            />
          </SpFormItem>
          <SpFormItem prop="password">
            <SpInput
              v-model="accountInfo.password"
              type="password"
              placeholder="密码"
              @keyup.enter.native="handleSubmit()"
            />
          </SpFormItem>
          <SpFormItem class="btn-container">
            <div class="btn-container__login">
              <SpButton long type="primary" @click="handleSubmit()">登录</SpButton>
            </div>
          </SpFormItem>
        </SpForm>
      </div>
    </div>

    <!-- <div class="clearfix">
        <div class="auth-form login-form">
          <SpForm ref="form-login" :model="info" :rules="rules" v-show="activeIndex==0">
            <SpFormItem prop="account">
              <span class="label-text">手机号/用户名</span>
              <SpInput v-model="info.account" @keyup.enter.native="loginSubmit('form-login')"/>
            </SpFormItem>
            <SpFormItem prop="password">
              <span class="label-text">密码</span>
              <SpInput v-model="info.password" type="password" @keyup.enter.native="loginSubmit('form-login')"/>
            </SpFormItem>
            <SpFormItem prop="yzm" v-if="isVisible">
              <span class="label-text">图片验证码</span>
              <div class="yzm-img" @click="handleClickImgcode('apiuser_login')">
                <img :src="imgInfo.base64Image" alt />
              </div>
              <SpInput v-model="info.yzm" />
            </SpFormItem>
            <SpFormItem class="btn-container">
              <div class="btn-container__login">
                <SpButton
                  class="button-dark"
                  @click="loginSubmit('form-login')"
                >登录</SpButton>
              </div>
            </SpFormItem>
          </SpForm>

          <SpForm ref="form-login2" :model="info2" :rules="rules2" v-show="activeIndex==1">
            <SpFormItem prop="account">
              <span class="label-text">手机号</span>
              <SpInput v-model="info2.account" @keyup.enter.native="loginSubmit('form-login')"/>
            </SpFormItem>
            <SpFormItem prop="yzm">
              <span class="label-text">图片验证码</span>
              <div class="yzm-img" @click="handleClickImgcode('apiuser_login')">
                <img :src="imgInfo.base64Image" alt />
              </div>
              <SpInput v-model="info2.yzm" />
            </SpFormItem>
            <SpFormItem prop="vcode">
              <span class="label-text">动态验证码</span>
              <div class="vcode-btn">
                <SpTimer
                :onStart="handleTimerStart"
                @UpdateTimer="handleUpdateTimer"
                @Stop="handleTimerStop"
                :timerMsg="timerMsg"
                :duration="120"
              ></SpTimer>
              </div>
              <SpInput v-model="info2.vcode" />
            </SpFormItem>
            <SpFormItem class="btn-container">
              <div class="btn-container__login">
                <SpButton
                  class="button-dark"
                  @click="loginSubmit('form-login2')"
                >登录</SpButton>
              </div>
            </SpFormItem>
          </SpForm>
          <div class="login-forget-password">
            <nuxt-link to="/auth/forget-password">忘记密码？</nuxt-link>
            <p v-if="activeIndex == 1" @click="toggleTab(0)">使用密码登录</p>
            <p v-if="activeIndex == 0" @click="toggleTab(1)">使用动态验证码登录</p>
          </div>
          <div class="login-join-vip mt20">
            <p>加入会员</p>
            <nuxt-link to="reg"  class="button-dark reg-link" @click.native="$track('auth_reg')">创建账户</nuxt-link>
          </div>
          <div class="login-join-vip border-bottom">
            <p>第三方登录</p>
            <a class="trust-item" v-for="item in trustLogins" :key="item.name" href="javascript:;" @click="handleClickThirdLogin(item)">
              <i class="mb-iconfont mb-iconfont-weibo" v-if="item.flag === 'weibo'"></i>
              <i class="mb-iconfont mb-iconfont-qq" v-if="item.flag === 'qq'"></i>
              <i class="mb-iconfont mb-iconfont-weixin" v-if="item.flag === 'weixin'"></i>
            </a>
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
import store from 'store'
import { mapActions } from 'vuex'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'
import S from '@/spx'
import api from '@/api'
import _debounce from 'lodash/debounce'

export default {
  // beforeRouteEnter(to, from, next) {
  //   let redirectUrl = from.fullPath;
  //   if (/^\/auth/.test(redirectUrl)) {
  //     redirectUrl = "/";
  //   }
  //   store.set("auth_redirect", redirectUrl);
  //   next();
  // },
  layout: 'custom_layout',
  async asyncData({ app, isMobile, req }) {
    // const trustLogins = await api.user.trustLoginList({ view: isMobile ? 'wap' : 'web' })
    // return {
    //   trustLogins
    // }
  },
  data() {
    return {
      activeIndex: 0,
      accountInfo: {
        account: '',
        password: ''
      },
      formRules: {
        account: [{ validate: 'required', message: '请输入手机号' }],
        password: [{ validate: 'required', message: '密码不能为空' }]
        // password: [
        //   {
        //     validate: (rule, value, callback) => {
        //       let valid_res = validate.validatePass(value);
        //       if (valid_res) {
        //         callback(valid_res);
        //       } else {
        //         callback();
        //       }
        //     },
        //     trigger: "blur"
        //   }
        // ]
      }
    }
  },
  created() {
    this.handleSubmit = _debounce(() => {
      this.$refs['form-login'].validate(async (valid, errors) => {
        if (valid) {
          const { account: username, password } = this.accountInfo
          const params = {
            username,
            password
          }
          const { token } = await this.$api.auth.login(params)
          S.setAuthToken(token)
          this.$store.dispatch('user/getUserInfo')
          this.$store.dispatch('cart/getCartCount')
          const { redirectUrl } = this.$route.query
          if (redirectUrl) {
            this.$router.push(decodeURIComponent(redirectUrl))
          } else {
            this.$router.push('/')
          }
        }
      })
    }, 300)
  },
  mounted() {
    // analytics.pageReady({
    //   page: {
    //     pageName: 'login',
    //     pageType: 'login',
    //     breadcrumb: ''
    //   }
    // })
  },
  // components: { SpTimer },
  methods: {
    // ...mapActions(["initStore"]),
    // async handleSubmit() {
    //   // 登录
    //   this.$refs['form-login'].validate((valid, errors) => {
    //     if (valid) {
    //       const { account: username, password } = this.accountInfo;
    //       const params = {
    //         username,
    //         password
    //       };
    //       const { token } = await this.$api.auth.login(params);
    //       S.setAuthToken(token);
    //       const { redirectUrl } = this.$route.query;
    //       if (redirectUrl) {
    //         this.$router.push(decodeURIComponent(redirectUrl));
    //       } else {
    //         this.$router.push("/");
    //       }
    //     }
    //   })
    // },
    //   async authLogin() {
    //     let query = {
    //       ...this.info,
    //       vcode: this.info.yzm,
    //       deviceid: "pc",
    //       sid: this.$store.state.user.sessionId,
    //       user_id: -1
    //     };
    //     if (this.isVisible) {
    //       query["sess_id"] = this.imgInfo.sess_id;
    //     }
    //     const { accessToken, sess_id } = await this.$api.auth.login(query);
    //     // 检查是否绑定过手机号
    //     if (!accessToken) {
    //       this.$router.push(`/auth/bindphone?sess_id=${sess_id}`);
    //     } else {
    //       this.handleLoginSuccess(accessToken);
    //     }
    //   },
    //   handleLoginSuccess(accessToken) {
    //     S.setAuthToken(accessToken);
    //     this.initStore();
    //     this.$Message.success("登录成功");
    //     analytics.event(
    //       {
    //         login_type: "normal"
    //       },
    //       "newLogin"
    //     );
    //     setTimeout(async () => {
    //       this.$redirect({ key: "auth_redirect" });
    //     }, 2000);
    //   }
  }
}
</script>
