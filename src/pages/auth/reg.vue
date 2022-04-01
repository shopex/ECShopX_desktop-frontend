<style lang="scss" src="./reg.scss"></style>
<template>
  <div class="page-auth-reg container">
    <div class="reg-logo">
      <img
        referrerpolicy="no-referrer"
        src="../../assets/imgs/login_logo.png"
      />
    </div>
    <div class="reg-main">
      <div class="reg-title">用户注册</div>
      <div class="auth reg">
          <!-- <div class="reg-process" v-if="step != '3'">
            <div class="process-item active">
              <div class="status">
                <span class="num">1</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="line" :class="{ active: step != '1' }"></div>
              <div class="text">验证手机号</div>
            </div>
            <div class="process-item" :class="{ active: step != '1' }">
              <div class="status">
                <span class="num">2</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="line" :class="{ active: step == '3' }"></div>
              <div class="text">填写账号信息</div>
            </div>
            <div class="process-item" :class="{ active: step == '3' }">
              <div class="status">
                <span class="num">3</span>
                <i class="ec-icon ec-icon-check"></i>
              </div>
              <div class="text">注册成功</div>
            </div>
          </div> -->

          <div class="auth-form reg-form" v-if="!regSuccess">
            <SpForm ref="form-reg" :model="info" :rules="rules">
              <!-- <template v-if="step == '1'"> -->
                <SpFormItem prop="mobile">
                  <SpInput v-model="info.mobile" placeholder="手机号" />
                </SpFormItem>
                <SpFormItem prop="yzm" class="yzm-feild">
                  <SpInput v-model="info.yzm" placeholder="图片验证码" />
                  <div class="yzm-img" @click="handleClickImgcode">
                    <img :src="imgInfo.imageData" alt />
                  </div>
                </SpFormItem>
                <SpFormItem prop="vcode" class="vcode-feild">
                  <SpInput v-model="info.vcode" placeholder="动态验证码" />
                  <div class="vcode-btn">
                    <SpTimer
                      :onStart="handleTimerStart"
                      @UpdateTimer="handleUpdateTimer"
                      @Stop="handleTimerStop"
                      :timerMsg="timerMsg"
                      :duration="120"
                    ></SpTimer>
                  </div>
                </SpFormItem>
              <!-- </template> -->

              <!-- <template v-if="step == '2'"> -->
                <SpFormItem prop="password">
                  <SpInput v-model="info.password" type="password" placeholder="设置密码" />
                </SpFormItem>
                <SpFormItem prop="password2">
                  <SpInput v-model="info.password2" type="password" placeholder="请再输入确认密码" />
                </SpFormItem>
                <!-- <div class="dash-line"></div> -->
                <template v-for="(item, name) in registerParam">
                  <SpFormItem :prop="name" :key="name" v-if="item.is_open && name == 'sex'">
                    <SpSelect v-model="info.sex" :data="sexOpt" placeholder="请选择性别"></SpSelect>
                  </SpFormItem>
                  <SpFormItem :prop="name" :key="name" v-if="item.is_open && name == 'birthday'">
                    <SpDatePicker v-model="info.birthday"></SpDatePicker>
                    <div class="form-item-desc">请选择生日日期</div>
                  </SpFormItem>
                  <SpFormItem
                    :prop="name"
                    v-if="item.is_open && name != 'sex' && name != 'birthday'"
                    :key="name"
                  >
                    <SpInput v-model="info[name]" :placeholder="item.name" />
                  </SpFormItem>
                </template>
              <!-- </template> -->
              <SpFormItem class="btn-container">
                <!-- <SpButton long type="primary" @click="regBtn('form-reg')" v-if="step == '1'" >下一步</SpButton >
                <SpButton long type="primary" @click="regBtn('form-reg')" v-if="step == '2'">注册</SpButton
                > -->
                <SpButton long type="primary" @click="regBtn('form-reg')" >注册</SpButton >
              </SpFormItem>
            </SpForm>
          </div>

          <div class="reg-complete" v-if="regSuccess">
            <img class="reg-img" src="~/assets/imgs/reg-img.svg" />
            <div class="name">恭喜您 {{ this.info.username }}</div>
            <div class="vip">您已成功申请为{{ website_name }}的会员</div>
            <!-- <SpButton class="go-to-login" long type="primary" @click="regBtn('form-reg')" v-if="step == '3'" >去登录</SpButton> -->
            <SpButton class="go-to-login" long type="primary" @click="regBtn('form-reg')">去登录</SpButton>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from 'store'
import S from '@/spx'
import { validate } from '@/utils'

import ModalTips from './comps/modal-tips'

const sexOpt = [
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  }
]
export default {
  layout: 'auth_layout',
  beforeRouteEnter(to, from, next) {
    let redirectUrl = from.fullPath
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  components: { ModalTips },
  data() {
    return {
      info: {
        mobile: '',
        password: '',
        password2: '',
        yzm: '',
        vcode: '',
        birthday: '',
        sex: ''
      },
      sexOpt,
      rules: {
        mobile: [
          { validate: 'required', message: '请输入手机号', trigger: 'blur' },
          {
            validate: (rule, value, callback) => {
              const valid = validate.validatePhone(value)
              if (valid) {
                callback()
              } else {
                callback('请输入正确的手机号')
              }
            }
          }
        ],
        password: [
          {
            validate: (rule, value, callback) => {
              const valid_res = validate.validatePass(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                if (this.info.password2) {
                  this.$refs['form-reg'].validateField('password2')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        password2: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass2(value, this.info.password)
              if (valid_res) {
                callback(valid_res)
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        yzm: [
          {
            validate: (rule, value, callback) => {
              if (value) {
                // eslint-disable-next-line standard/no-callback-literal
                callback()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                callback('请输入图形验证码')
              }
            },
            trigger: 'blur'
          }
        ],
        vcode: [{ validate: 'required', message: '请输入验证码', trigger: 'blur' }]
      },
      imgInfo: {},
      timerMsg: '获取验证码',
      license: false,
      showModal: false,
      // step: '1',
      registerParam: [],
      website_name: process.env.VUE_APP_TITLE,
      regSuccess:false,
    }
  },
  mounted() {
    this.yzmImg()
    // this.getRegisterParam()
  },
  methods: {
    async getRegisterParam() {
      const res = await this.$api.auth.getRegisterParam()
      this.registerParam = res
      for (let key in res) {
        let item = res[key]
        if (item.is_open && item.is_required) {
          this.info[key] = ''
          this.rules[key] = [
            {
              validate: 'required',
              message: `${item.element_type == 'input' ? '请输入' : '请选择'}${item.name}`,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    // 注册
    async regBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if(!valid) return

        this.authRegsiter();
      })
    },
    redirect() {
      const { redirectUrl, fromlogin } = this.$route.query
      if (fromlogin) {
        //如果是从登陆跳转过来的
        this.$router.push('/')
        return
      }
      if (redirectUrl) {
        this.$router.push(decodeURIComponent(redirectUrl))
      } else {
        this.$router.go(-1)
      }
    },
    async authRegsiter() {
      let query = {
        ...this.info,
        user_type: 'local'
      }
      const { token } = await this.$api.auth.reg(query)
      S.setAuthToken(token)
      this.$store.dispatch('user/getUserInfo')
      // this.step = '3'
      this.redirect();
      this.regSuccess = true;
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'sign'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const { mobile, yzm } = this.info
      const { imageToken } = this.imgInfo
      if (!validate.validatePhone(mobile)) {
        this.$Message.error('请输入正确的手机号')
        return false
      }
      if(!yzm) {
        this.$Message.error('请输入图形验证码')
        return false
      }
      const query = {
        mobile: mobile,
        type: 'sign',
        yzm: yzm,
        token: imageToken
      }
      // 验证账号
      // let res_verify
      // try {
      //   res_verify = await this.$api.auth.regAccountVerify(query)
      // } catch (e) {
      //   this.$Message.error(e.msg)
      //   this.handleClickImgcode()
      // }

      // const query_sms = {
      //   mobile: this.info.mobile,
      //   type: 'signup',
      //   send_sms_token: res_verify.verifyAccount_token
      // }
      const { status_code ,message} = await this.$api.auth.regSmsCode(query)
      if(status_code == 422){
        this.$Message.error(message)
        return false
      }

      this.$Message.success('发送成功')
      cb()
    },
    handleUpdateTimer(e) {
      this.timerMsg = `${e}秒后重发`
    },
    handleTimerStop() {
      this.timerMsg = `重发验证码`
    }
  }
}
</script>
