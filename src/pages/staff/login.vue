<style lang="scss" src='./login.scss'></style>

<template>
  <div class="page-login-staff page-body">
    <div class="login-container">
      <ul class="login-tab">
        <li>
          <span>员工登录</span>
        </li>
      </ul>
      <SpForm ref="form-login" :model="info" :rules="rules">
        <SpFormItem prop="account">
          <SpInput v-model="info.account" :maxlength="6" @change="handleBlurWorkId"
          placeholder="请输入6位数的workday ID"/>
          <span class="mobile">{{mobile}}</span>
        </SpFormItem>
        <SpFormItem prop="yzm" class="sms-yzm">
          <div class="yzm-field">
            <div class="c-yzm">
              <SpInput v-model="info.yzm" placeholder="图形验证码"/>
            </div>
            <div class="c-img" @click="handleClickImgcode">
              <img :src="imgInfo.base64Image" alt height="24">
              <span>看不清楚?<br>换一个</span>
            </div>
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="sms-vcode">
          <div class="vcode-field">
            <div class="c-vcode">
              <SpInput v-model="info.vcode" placeholder="短信验证码"/>
            </div>
            <div class="c-btnvcode">
              <SpTimer
                :onStart="handleTimerStart"
                @UpdateTimer="handleUpdateTimer"
                @Stop="handleTimerStop"
                :timerMsg="timerMsg"
                :duration="120"
              ></SpTimer>
            </div>
          </div>
        </SpFormItem>
        <SpFormItem class="clearfix">
          <SpRadio type="checkbox" size="small" v-model="license">
            <span class="license-info">
              我已阅读并同意Aigle的<nuxt-link class="license-content" to="/license/staff">《员工登录协议》</nuxt-link>
            </span>
          </SpRadio>
        </SpFormItem>
        <SpFormItem class="btn-container">
          <div class="btn-container__login">
            <SpButton type="warning" size="large" long :disabled="!license" @click="login('form-login')">员工登录</SpButton>
          </div>
        </SpFormItem>
      </SpForm>
      <div class="jump">
        <nuxt-link class="license-content" to="/auth/login">
            切换会员登录<i class="mb-iconfont mb-iconfont-right"></i><br>
            (将无法享受员工折扣价)
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from 'store'
import _debounce from 'lodash/debounce'
import S from '@/spx'
import { analytics } from '@/plugins/analytics'

export default {
  beforeRouteEnter (to, from, next) {
    let redirectUrl = from.fullPath 
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  data () {
    return {
      info: {
        account: '',
        yzm: '',
        vcode: ''
      },
      rules: {
        account: [
          { validate: 'required', message: '员工工号填写错误' },
          {
            validate: (rule, value, callback) => {
              if (value.length !== 6) {
                // eslint-disable-next-line standard/no-callback-literal
                callback('请输入6位员工工号')
              } else {
                callback()
              }
            }
          }
        ],
        yzm: [{ validate: 'required', message: '图形验证码填写错误' }],
        vcode: [{ validate: 'required', message: '请输入验证码' }]
      },
      imgInfo: {},
      timerMsg: '获取验证码',
      license: false,
      mobile: ''
    }
  },
  created () {
    this.getStaffMobile = _debounce(async e => {
      const { account } = this.info
      const { result, mobile } = await this.$api.staff.staffMobile(account)
      if (result === 'success') {
        this.mobile = mobile
      } else {
        this.mobile = ''
      }
    }, 300)
  },
  mounted () {
    this.yzmImg()
  },

  methods: {
    ...mapActions(['initStore']),
    handleBlurWorkId (e) {
      this.getStaffMobile()
    },
    async login (name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.authLogin()
        }
      })
    },

    async authLogin () {
      const query = {
        work_id: this.info.account,
        vcode: this.info.vcode,
        license: this.license ? 1 : 0,
        sess_id: this.imgInfo.sess_id
      }
      const { accessToken, activityInfo } = await this.$api.staff.dologin(query)
      // console.log(activityInfo)
      S.setAuthToken(accessToken)
      this.initStore()
      this.$Message.success('登录成功')
      analytics.event({
        login_type: 'normal'
      }, 'newLogin')
      setTimeout(() => {
        this.$redirect({ key: 'auth_redirect' })
      }, 2000)
    },
    async yzmImg () {
      const img_res = await this.$api.auth.regImg({ vcode_type: 'staff' })
      this.imgInfo = img_res
    },
    handleClickImgcode () {
      this.yzmImg()
    },
    async handleTimerStart (cb, k) {
      const query = {
        work_id: this.info.account,
        verifycodekey: 'staff',
        vcode: this.info.yzm,
        sess_id: this.imgInfo.sess_id
      }
      try {
        await this.$api.staff.sendVcode(query)
        this.$Message.success('发送成功')
        cb()
      } catch (e) {
        this.yzmImg()
      }
    },
    handleUpdateTimer (e) {
      this.timerMsg = `${e}秒后重发`
    },
    handleTimerStop () {
      this.timerMsg = `重发验证码`
    }
  }
}
</script>
