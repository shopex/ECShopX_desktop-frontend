<style lang="scss" src="./bindwechat.scss"></style>

<template>
  <div class="page-reg page-body">
    <div class="auth reg">
      <div class="auth-form reg-form">
        <SpForm ref="form-reg" :model="info" :rules="rules">
          <template v-if="step == '1'">
            <SpFormItem prop="mobile">
              <span class="label-text">手机号</span>
              <SpInput v-model="info.mobile" />
            </SpFormItem>

            <SpFormItem prop="password">
              <span class="label-text">密码</span>
              <SpInput
                v-model="info.password"
                type="password"
                @keyup.enter.native="loginSubmit('form-login')"
              />
            </SpFormItem>

            <SpFormItem prop="yzm" class="yzm-feild graphics-code">
              <span class="label-text">图形验证码</span>
              <SpInput v-model="info.yzm" />
              <div class="yzm-img vcode-btn" @click="handleClickImgcode('mobile_login')">
                <img :src="imgInfo.imageData" alt />
              </div>
            </SpFormItem>

            <SpFormItem prop="vcode" class="yzm-feild">
              <span class="label-text">动态验证码</span>
              <SpInput v-model="info.vcode" />
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
          </template>

          <template v-if="step == '2'">
            <SpFormItem prop="password">
              <span class="label-text">设置密码</span>
              <SpInput
                v-model="info.password"
                type="password"
                placeholder="建议使用两种或两种以上的字符组合"
              />
            </SpFormItem>
            <SpFormItem prop="password2">
              <span class="label-text">确定密码</span>
              <SpInput v-model="info.password2" type="password" placeholder="请再次输入密码" />
            </SpFormItem>

            <div class="dash-line"></div>

            <template v-for="(item, name) in registerParam">
              <SpFormItem :prop="name" v-if="item.is_open" :key="name">
                <span class="label-text">{{ item.name }}</span>
                <SpInput
                  v-model="info[name]"
                  :placeholder="
                    item.name == 'username' ? '建议输入真实姓名以便发送奖品信息核对' : ''
                  "
                />
              </SpFormItem>
              <SpFormItem
                :prop="name"
                v-if="item.is_open && name == 'sex'"
                :key="name"
                class="form-select select"
              >
                <span class="label-text">性别</span>
                <SpSelect v-model="info.sex" :data="sexOpt" placeholder="请选择性别"></SpSelect>
              </SpFormItem>
              <SpFormItem
                :prop="name"
                v-if="item.is_open && name == 'birthday'"
                :key="name"
                class="form-select"
              >
                <span class="label-text">生日</span>
                <datepicker v-model="info.birthday"></datepicker>
              </SpFormItem>
            </template>
            <!-- <SpFormItem prop="sex" class="form-select select">
              <span class="label-text">家庭成员</span>
              <SpSelect
                v-model="info.family"
                :data="familyOpt"
                placeholder="请选择家庭成员情况"
              ></SpSelect>
            </SpFormItem> -->
            <!-- <SpFormItem class="clearfix mb22">
              <div>
                <SpRadio type="checkbox" size="small" v-model="license"></SpRadio>
                <span class="license-info">您接受并同意遵守AIGLE的 <nuxt-link to="/article/detail/19">条款与细则</nuxt-link> 、<nuxt-link to="/article/detail/17">隐私政策</nuxt-link>、以及<nuxt-link to="/article/detail/20">个人敏感信息政策</nuxt-link>。</span>
              </div>
            </SpFormItem> -->
          </template>
          <SpFormItem class="btn-container">
            <SpButton long type="primary" @click="regBtn('form-reg')">绑定</SpButton>
          </SpFormItem>
          <SpFormItem class="btn-container-reg">
            <SpButton long type="primary" @click="handleReg">注册</SpButton>
          </SpFormItem>
        </SpForm>
      </div>

      <div class="reg-complete" v-if="step == '3'">
        <img class="reg-img" src="~/assets/imgs/reg-img.svg" />
        <div class="name">恭喜您 {{ this.info.username }}</div>
        <div class="vip">您已成功申请为{{ website_name }}的会员</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from 'store'
import S from '@/spx'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'
import { bindWechatPhone } from '@/api/auth'

import ModalTips from './comps/modal-tips'
import datepicker from './comps/datepicker'

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
const familyOpt = [
  {
    label: '1',
    value: '小两口'
  },
  {
    label: '2',
    value: '三口之家'
  }
]
export default {
  beforeRouteEnter(to, from, next) {
    let redirectUrl = from.fullPath
    if (/^\/auth/.test(redirectUrl)) {
      redirectUrl = '/'
    }
    store.set('auth_redirect', redirectUrl)
    next()
  },
  components: { ModalTips, datepicker },
  created() {
    const { open_id, unionid } = this.$route.query
    console.log('created')
    console.log(open_id)
    console.log(unionid)
    this.routeObject = {
      ...this.routeObject,
      openId: open_id,
      unionId: unionid
    }
  },
  data() {
    return {
      info: {
        mobile: '',
        password: '',
        password2: '',
        yzm: '',
        vcode: ''
      },
      routeObject: {
        openId: '',
        unionId: ''
      },
      sexOpt,
      familyOpt,
      rules: {
        // mobile: [
        //   {
        //     validate: (rule, value, callback) => {
        //       // eslint-disable-next-line standard/no-callback-literal
        //       let valid_res = validate.validatePhone(value)
        //       if (valid_res) {
        //         callback(valid_res)
        //       } else {
        //         this.$api.auth
        //           .regAccount(
        //             {
        //               mobile: this.info.mobile,
        //               type: 'mobile'
        //             },
        //             {
        //               showError: false
        //             }
        //           )
        //           .then(() => {
        //             callback()
        //           })
        //           .catch(err => {
        //             callback(err.msg)
        //           })
        //       }
        //     },
        //     trigger: 'blur'
        //   }
        // ],
        mobile: [{ validate: 'required', message: '请输入手机号', trigger: 'blur' }],
        // username: [
        //   { validate: 'required', message: '请输入姓名', trigger: 'blur' }
        // ],
        // sex: [
        //   { validate: 'required', message: '请输入选择性别', trigger: 'blur' }
        // ],
        // birthday: [
        //   { validate: 'required', message: '请选择生日', trigger: 'blur' }
        // ],
        password: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass(value)
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
      step: '1',
      registerParam: [],
      website_name: ''
    }
  },
  mounted() {
    window.addEventListener('click', this.test)
    this.website_name = process.env.VUE_APP_TITLE
    this.yzmImg()
    this.getRegisterParam()

    analytics.pageReady({
      page: {
        pageName: '注册',
        pageType: '注册',
        breadcrumb: ''
      }
    })
  },
  methods: {
    test() {
      console.log('test')
    },
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
    async regBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.authRegsiter()
        }
      })
    },
    handleReg() {
      this.$router.push('/auth/reg')
    },
    redirect() {
      const { redirect } = this.$route.query
      let url = '/'
      if (redirect) {
        url = decodeURIComponent(redirect)
      }
      this.$router.push(url)
    },
    async authRegsiter() {
      let query = {
        username: this.info.mobile,
        vcode: this.info.vcode,
        check_type: 'login',
        password: this.info.password,
        union_id: this.routeObject.unionId,
        open_id: this.routeObject.openId
      }
      const { token } = await this.$api.auth.bindwechat(query)
      if (token) {
        this.handleLoginSuccess(token)
      }
    },
    handleLoginSuccess(token) {
      S.setAuthToken(token)
      this.$Message.success('绑定成功')
      this.$store.dispatch('user/getUserInfo')
      // this.$store.dispatch('cart/getCartCount')
      const { redirectUrl } = this.$route.query
      if (redirectUrl) {
        this.$router.push(decodeURIComponent(redirectUrl))
      } else {
        this.$router.push('/')
      }
    },
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'login'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const query = {
        mobile: this.info.mobile,
        type: 'login',
        yzm: this.info.yzm,
        token: this.imgInfo.imageToken
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
      await this.$api.auth.regSmsCode(query)
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
