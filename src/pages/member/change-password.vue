<style lang="scss" scoped>
@import './member.scss';
.page-changepassword {
  background: #f9f9f9;
  border: 1px solid transparent;
  .password {
    padding-top: 30px;
    .form {
      width: 400px;
      height: 510px;
      .form-item {
        // margin-bottom: 20px;
        position: relative;
        .label-text {
          position: absolute;
          left: 15px;
          top: 10px;
          z-index: 10;
          // height: 100%;
        }
        .sp-input {
          padding-left: 85px;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          // &__input {
          //   height: 50px;
          // }
        }
        &.yzm-feild {
          .sp-input {
            width: 65%;
          }
          .yzm-img,
          .vcode-btn {
            float: right;
            width: 30%;
            height: 36px;
            cursor: pointer;
            img {
              width: 100%;
            }
          }
          .sp-timer {
            height: 100%;
            line-height: 36px;
            background: #fff;
            color: inherit;
            border: 1px solid $color-border-gray;
            border-radius: 4px;
          }
          .form-item__error-message {
            right: 35%;
          }
        }
        &.btn-container-member {
          margin-top: 60px;
        }
        .sp-btn {
          // height: 32px;
          // width:100px;
          border-radius: 4px;
          &__txt {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="page-changepassword">
    <div class="page-container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="account" active="change-password"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">修改密码</div>
          <div class="password member-content-right-body">
            <SpForm ref="form-forget-password" :model="info" :rules="rules">
              <SpFormItem prop="yzm" class="yzm-feild">
                <span class="label-text">图片验证码</span>
                <SpInput v-model="info.yzm" />
                <div class="yzm-img" @click="handleClickImgcode">
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
              <SpFormItem prop="password">
                <span class="label-text">设置密码</span>
                <SpInput
                  v-model="info.password"
                  type="password"
                  placeholder="建议使用两种或两种以上的字符组合"
                />
              </SpFormItem>
              <SpFormItem prop="password1">
                <span class="label-text">确认密码</span>
                <SpInput v-model="info.password1" type="password" placeholder="再次输入密码" />
              </SpFormItem>
              <SpFormItem class="btn-container-member">
                <SpButton long type="primary" @click="modifyPasswordBtn('form-forget-password')"
                  >确认修改</SpButton
                >
              </SpFormItem>
            </SpForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from '@/utils'
import smenu from './../member/comps/smenu'

export default {
  // layout: 'auth_layout',
  components: {
    smenu
  },
  data() {
    return {
      info: {
        yzm: '',
        vcode: '',
        password: '',
        password1: ''
      },
      rules: {
        yzm: [{ validate: 'required', trigger: 'blur', message: '请输入图形验证码' }],
        vcode: [{ validate: 'required', trigger: 'blur', message: '请输入验证码' }],
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
            },
            trigger: 'blur'
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
            },
            trigger: 'blur'
          }
        ]
      },
      imgInfo: {},
      timerMsg: '发送验证码'
    }
  },
  mounted() {
    this.yzmImg()
    this.$api.member.memberInfo().then((res) => {
      let { memberInfo } = res
      this.memberInfo = memberInfo
    })
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
      const query = {
        mobile: this.memberInfo.mobile,
        type: 'forgot_password',
        yzm: this.info.yzm,
        token: this.imgInfo.imageToken
      }
      await this.$api.auth.regSmsCode(query)
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
        mobile: this.memberInfo.mobile,
        password: this.info.password,
        vcode: this.info.vcode
      }
      await this.$api.auth.modifyPassword(query)
      this.$Message.success('新密码已经设置成功')
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>
