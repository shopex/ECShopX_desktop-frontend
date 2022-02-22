<style lang="scss" src="./forget-password.scss"></style>

<template>
  <div class="page-password container">
    <div class="form-logo">
      <img
        referrerpolicy="no-referrer"
        src="../../assets/imgs/login_logo.png"
      />
    </div>
    <div class="form-main">
      <div class="form-title">忘记密码</div>
      <SpForm ref="form-forget-password" :model="info" :rules="rules">
        <SpFormItem prop="username">
          <SpInput
            icon="new_iconfont icon-new-pc-zhanghu"
            v-model="info.username"
            placeholder="手机号"
            />
        </SpFormItem>
        <SpFormItem prop="yzm" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-tuxingyanzhengma"
            v-model="info.yzm"
            placeholder="图片验证码"
            />
          <div class="yzm-img" @click="handleClickImgcode">
            <img :src="imgInfo.imageData" alt />
          </div>
        </SpFormItem>
        <SpFormItem prop="vcode" class="yzm-field">
          <SpInput
            icon="new_iconfont icon-new-pc-yanzhengma"
            v-model="info.vcode"
            placeholder="验证码"
            />
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
        <SpFormItem prop="password">
          <SpInput
            icon="new_iconfont icon-new-pc-mima"
            v-model="info.password"
            type="password"
            placeholder="建议使用两种或两种以上的字符组合"
          />
        </SpFormItem>
        <SpFormItem prop="password1">
          <SpInput
            icon="new_iconfont icon-new-pc-mima"
            v-model="info.password1"
            type="password"
            placeholder="再次输入密码"
             />
        </SpFormItem>
        <SpFormItem class="btn-container">
          <SpButton long type="primary" @click="modifyPasswordBtn('form-forget-password')"
            >登录</SpButton
          >
        </SpFormItem>
      </SpForm>
    </div>
  </div>
</template>
<script>
import { validate } from '@/utils'

export default {
  layout: 'auth_layout',
  data() {
    return {
      info: {
        username: '',
        yzm: '',
        vcode: '',
        password: '',
        password1: ''
      },
      rules: {
        username: [{ validate: 'required', message: '请输入手机号' }],
        yzm: [{ validate: 'required', message: '请输入图形验证码' }],
        vcode: [{ validate: 'required', message: '请输入验证码' }],
        password: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                if (this.info.password1) {
                  this.$refs['form-forget-password'].validateField('password1')
                }
                callback()
              }
            }
          }
        ],
        password1: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePass2(value, this.info.password)
              if (valid_res) {
                callback(valid_res)
              } else {
                callback()
              }
            }
          }
        ]
      },
      imgInfo: {},
      timerMsg: '发送验证码',
      forgot_token: null
    }
  },
  mounted() {
    this.yzmImg()
  },
  methods: {
    async yzmImg() {
      const img_res = await this.$api.auth.regImg({
        type: 'forgot_password'
      })
      this.imgInfo = img_res
    },
    handleClickImgcode() {
      this.yzmImg()
    },
    async handleTimerStart(cb, k) {
      const { username, yzm } = this.info
      const { imageToken } = this.imgInfo
      if (!validate.validatePhone(username)) {
        this.$Message.error('请输入正确的手机号')
        return false
      }
      if(!yzm) {
        this.$Message.error('请输入图形验证码')
        return false
      }
      const query = {
        mobile: username,
        type: 'forgot_password',
        yzm: yzm,
        token: this.imgInfo.imageToken
      }
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
    },
    modifyPasswordBtn(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.modifyPassword()
        }
      })
    },
    async modifyPassword() {
      let query = {
        mobile: this.info.username,
        password: this.info.password,
        vcode: this.info.vcode
      }
      await this.$api.auth.modifyPassword(query)
      this.$Message.success('新密码已经设置成功')
      setTimeout(() => {
        this.$router.push('/auth/login')
      }, 3000)
    }
  }
}
</script>
