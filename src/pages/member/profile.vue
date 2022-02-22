<style lang="scss" src="./profile.scss"></style>

<template>
  <div class="page-profile page-body">
    <div class="page-profile__b clearfix container-member">
      <div class="left">
        <smenu active="profile"></smenu>
      </div>
      <div class="right">
        <no-ssr>
          <div class="h-title" v-if="userInfo && userInfo.is_staff != 0">员工个人资料</div>
        </no-ssr>
        <no-ssr>
          <div class="h-title" v-if="userInfo && userInfo.is_staff === 0">登录信息</div>
        </no-ssr>
        <no-ssr>
          <SpForm v-if="userInfo && userInfo.is_staff != 0">
            <SpFormItem>
              <div>员工工号: {{ userInfo.work_id }}</div>
              <div>姓名: {{ userInfo.work_name }}</div>
              <div>手机号: {{ userInfo.work_mobile }}</div>
              <div>
                本年度内购额度: 剩余{{ userInfo.surplus }}元 / 总共{{
                  userInfo.amount.total_money
                }}元
              </div>
            </SpFormItem>
          </SpForm>
        </no-ssr>
        <no-ssr>
          <div class="profile-container-member" v-if="userInfo && userInfo.is_staff === 0">
            <SpForm ref="form-info1" :model="info" :rules="rules1">
              <!-- 登录信息：用户名 -->
              <div v-show="!loginInfoEdit && !passWordEdit && !mobileInfoEdit">
                <SpFormItem>
                  <div>用户名: {{ info.login_account }}</div>
                  <div>手机号: {{ mobile }}</div>

                  <div
                    class="other-account-info"
                    v-if="accountInfo.weixin.nickname || trustLogins.weixin"
                  >
                    <i class="mb-iconfont mb-iconfont-weixin2"></i>
                    <span class="account">{{ accountInfo.weixin.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.weixin.nickname"
                      @click="unBindAccount(accountInfo.weixin)"
                      >(解绑)</a
                    >
                    <a
                      class="bind-btn"
                      :href="trustLogins.weixin"
                      v-if="trustLogins.weixin && !accountInfo.weixin.nickname"
                      >(绑定)</a
                    >
                  </div>
                  <div class="other-account-info">
                    <i class="mb-iconfont mb-iconfont-weibo2"></i>
                    <span class="account">{{ accountInfo.weibo.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.weibo.nickname"
                      @click="unBindAccount(accountInfo.weibo)"
                      >(解绑)</a
                    >
                    <a class="bind-btn" :href="trustLogins.weibo" v-else>(绑定)</a>
                  </div>
                  <div class="other-account-info">
                    <i class="mb-iconfont mb-iconfont-QQ"></i>
                    <span class="account">{{ accountInfo.qq.nickname }}</span>
                    <a
                      class="bind-btn"
                      v-if="accountInfo.qq.nickname"
                      @click="unBindAccount(accountInfo.qq)"
                      >(解绑)</a
                    >
                    <a class="bind-btn" :href="trustLogins.qq" v-else>(绑定)</a>
                  </div>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c" v-if="!mobile">
                    <SpButton type="warning" size="large" long @click="mobileInfoEdit = true"
                      >新增手机号</SpButton
                    >
                  </div>
                  <div class="btn-c" v-if="!info.login_account">
                    <SpButton type="primary" size="large" long @click="loginInfoEdit = true"
                      >新增用户名</SpButton
                    >
                  </div>
                  <div class="btn-c" v-if="userInfo.password_reset == 1">
                    <SpButton type="warning" size="large" long @click="passWordEdit = true"
                      >修改登录密码</SpButton
                    >
                  </div>
                  <div class="btn-c" v-else>
                    <SpButton type="warning" size="large" long @click="passWordEdit = true"
                      >设置密码</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!-- 登录信息：新增用户名 -->
              <div v-show="loginInfoEdit && !passWordEdit">
                <SpFormItem prop="login_account" class="form-item__email">
                  <SpInput
                    v-model="info.login_account"
                    :disabled="info_disabled.login_account"
                    placeholder="请输入用户名"
                  />
                </SpFormItem>
                <SpFormItem>
                  <div>手机号: {{ mobile }}</div>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="cancelFormInfo1"
                      >取消</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'login_account')"
                      >保存</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!-- 登录信息：修改密码FORM -->
              <div v-show="passWordEdit">
                <SpFormItem prop="old_password" v-show="isModifyPassword">
                  <SpInput v-model="info.old_password" type="password" placeholder="请输入旧密码" />
                </SpFormItem>
                <SpFormItem prop="password">
                  <SpInput v-model="info.password" type="password" placeholder="请输入新密码" />
                </SpFormItem>
                <SpFormItem prop="password2">
                  <SpInput
                    v-model="info.password2"
                    type="password"
                    placeholder="请再次输入新密码"
                  />
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="passWordEdit = false"
                      >取消</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'password')"
                      >保存</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
              <!--新增手机号-->
              <div v-show="mobileInfoEdit">
                <SpFormItem prop="mobile">
                  <SpInput
                    v-model="info.mobile"
                    :disabled="info_disabled.mobile"
                    placeholder="手机号"
                  />
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="mobileInfoEdit = false"
                      >取消</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo1('form-info1', 'mobile')"
                      >保存</SpButton
                    >
                  </div>
                </SpFormItem>
              </div>
            </SpForm>
          </div>
        </no-ssr>
        <no-ssr>
          <div v-if="userInfo && userInfo.is_staff === 0">
            <div class="h-title">个人信息</div>
            <div class="profile-container-member">
              <SpForm ref="form-info2" :model="info" :rules="rules2">
                <div v-show="!profileInfoEdit">
                  <SpFormItem>
                    <div>姓名: {{ info.username }}</div>
                    <div>邮箱: {{ info.email }}</div>
                    <div>性别: {{ info.sex }}</div>
                    <div>生日: {{ info.birthday }}</div>
                    <!-- <div>职业: {{info.vocation}}</div> -->
                  </SpFormItem>
                  <SpFormItem class="btn-warp clearfix">
                    <div class="btn-c">
                      <SpButton type="warning" size="large" long @click="profileInfoEdit = true"
                        >修改个人信息</SpButton
                      >
                    </div>
                  </SpFormItem>
                </div>
                <div v-show="profileInfoEdit">
                  <SpFormItem prop="username">
                    <SpInput
                      v-model="info.username"
                      :disabled="info_disabled.username"
                      placeholder="姓名"
                    />
                  </SpFormItem>
                  <SpFormItem prop="email">
                    <SpInput
                      v-model="info.email"
                      :disabled="info_disabled.email"
                      placeholder="邮箱"
                    />
                  </SpFormItem>
                  <SpFormItem class="sms-info clearfix">
                    <div class="left fl">
                      <SpSelect
                        v-model="info.sex"
                        :data="sexDs"
                        placeholder="性别"
                        :disabled="info_disabled.sex"
                      ></SpSelect>
                    </div>
                    <div class="right fl clearfix">
                      <div class="y-label">生日</div>
                      <datapicker
                        v-model="info.birthday"
                        :disabled="info_disabled.birthday"
                      ></datapicker>
                      <div class="tip">性别，生日只能修改一次</div>
                    </div>
                  </SpFormItem>
                  <SpFormItem class="btn-warp clearfix">
                    <div class="btn-c">
                      <SpButton type="primary" size="large" long @click="cancelFormInfo2"
                        >取消</SpButton
                      >
                    </div>
                    <div class="btn-c">
                      <SpButton
                        type="warning"
                        size="large"
                        long
                        @click="SubmitFormInfo2('form-info2')"
                        >保存</SpButton
                      >
                    </div>
                  </SpFormItem>
                </div>
              </SpForm>
            </div>

            <div class="h-title">其他资料</div>
            <div class="profile-container-member hobby-list">
              <SpForm ref="form-info3" :model="info" :rules="rules3">
                <div v-show="!hobbyEdit">
                  <SpFormItem>
                    <div>职业: {{ info.vocation }}</div>
                  </SpFormItem>
                </div>
                <div v-show="hobbyEdit">
                  <SpFormItem>
                    <SpSelect
                      v-model="info.vocation"
                      :disabled="info_disabled.vocation"
                      :data="occupationDs"
                      placeholder="职业"
                    ></SpSelect>
                  </SpFormItem>
                </div>
                <SpFormItem>
                  <div>兴趣爱好:</div>
                  <SpRadioGroup type="checkbox" class="hobby-list-group" v-model="info.hobby">
                    <div class="hobby-list__item" v-for="(item, index) in hobbyDs" :key="index">
                      <SpRadio
                        type="checkbox"
                        size="small"
                        :label="item.label"
                        :disabled="!hobbyEdit"
                        >{{ item.label }}</SpRadio
                      >
                    </div>
                  </SpRadioGroup>
                </SpFormItem>
                <SpFormItem class="btn-warp clearfix" v-show="!hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="warning" size="large" long @click="hobbyEdit = true"
                      >修改其他资料</SpButton
                    >
                  </div>
                </SpFormItem>
                <!-- <SpFormItem class="btn-warp clearfix" v-if="!hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="warning" size="large" long @click="hobbyEdit = true">修改兴趣爱好</SpButton>
                  </div>
                </SpFormItem>-->
                <SpFormItem class="btn-warp clearfix" v-show="hobbyEdit">
                  <div class="btn-c">
                    <SpButton type="primary" size="large" long @click="cancelFormInfo3"
                      >取消</SpButton
                    >
                  </div>
                  <div class="btn-c">
                    <SpButton
                      type="warning"
                      size="large"
                      long
                      @click="SubmitFormInfo3('form-info3')"
                      >保存</SpButton
                    >
                  </div>
                </SpFormItem>
              </SpForm>
            </div>
          </div>
        </no-ssr>
      </div>
    </div>
    <Recommend />
  </div>
</template>

<script>
import datapicker from './../auth/comps/datepicker'
import smenu from './../member/comps/smenu'
import Recommend from './../items/comps/recommend'
import { validate } from '@/utils'
import { analytics } from '@/plugins/analytics'
import api from '@/api'
import store from 'store'

export default {
  head() {
    return {
      title: '会员中心_Aigle官方网站',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '我的账户_Aigle官方网站' },
        { hid: 'description', name: 'description', content: '我的账户_Aigle官方网站' }
      ]
    }
  },
  data() {
    return {
      info: {
        login_account: '',
        username: '',
        old_password: '',
        password: '',
        password2: '',
        email: '',
        mobile: '',
        sex: '',
        birthday: '',
        vocation: '',
        hobby: []
      },
      info_disabled: {
        login_account: false,
        password: false,
        email: false,
        mobile: false,
        sex: false,
        birthday: false,
        vocation: false,
        hobby: false
      },
      // rules: {},
      rules1: {},
      rules2: {},
      rules3: {},
      mobile: '',
      loginInfoEdit: false,
      mobileInfoEdit: false,
      passWordEdit: false,
      profileInfoEdit: false,
      hobbyEdit: false,
      sexDs: [],
      occupationDs: [],
      hobbyDs: [],
      isModifyPassword: false,
      orgin_info: {},
      accountInfo: {
        weixin: {},
        weibo: {},
        qq: {}
      },
      trustLogins: {}
    }
  },
  components: { datapicker, smenu, Recommend },
  created() {
    // this.$store.dispatch('user/getUserInfo')
    this.getAttrData('init')
    // 检查用户是否重置过密码
    this.checkResetLoginPassword()
  },
  mounted() {
    this.getTrustLogins()
  },
  computed: {
    userInfo() {
      if (this.$store.state.user.userInfo && this.$store.state.user.userInfo.bind_info) {
        let obj = {
          weixin: {},
          weibo: {},
          qq: {}
        }
        for (let item of this.$store.state.user.userInfo.bind_info) {
          obj[item.flag] = item
        }
        this.accountInfo = obj
      }
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async getTrustLogins() {
      const res = await this.$api.user.trustLoginList({ view: 'web' })
      let obj = {}
      for (let item in res) {
        if (res[item].flag == 'wapweixin') {
          obj['weixin'] = res[item].url
        } else {
          obj[res[item].flag] = res[item].url
        }
      }
      this.trustLogins = obj
    },
    async getAttrData(type) {
      const { user_attr, mobile } = await this.$api.user.userAttr()
      user_attr.forEach((item) => {
        this.info_disabled[item.attr_column] = item.editable !== 1

        if (item.attr_required === 1) {
          if (item.attr_column === 'email') {
            this.rules1[item.attr_column] = [{ validate: 'required', message: '不能为空' }]
          } else if (item.attr_column !== 'hobby') {
            this.rules2[item.attr_column] = [{ validate: 'required', message: '不能为空' }]
          } else {
            this.rules3[item.attr_column] = [{ validate: 'required', message: '不能为空' }]
          }
        }

        // 性别
        if (item.attr_column === 'sex') {
          let sexDs = []
          item.attr_option.forEach((sitem) => {
            sexDs.push({ label: sitem, value: sitem })
          })
          this.sexDs = sexDs
        }

        // 职业
        if (item.attr_column === 'vocation') {
          let occupationDs = []
          item.attr_option.forEach((sitem) => {
            occupationDs.push({ label: sitem, value: sitem })
          })
          this.occupationDs = occupationDs
        }

        // 爱好
        if (item.attr_column === 'hobby') {
          let hobbyDs = []
          item.attr_option.forEach((sitem) => {
            hobbyDs.push({ label: sitem, value: sitem })
          })
          this.hobbyDs = hobbyDs
        }

        this.info[item.attr_column] = item.attr_value
          ? item.attr_value
          : item.attr_column === 'hobby'
          ? []
          : ''
      })
      this.orgin_info = { ...this.info }
      this.orgin_info.hobby = [...this.info.hobby]
      this.mobile = mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

      if (type == 'init') {
        analytics.pageReady({
          page: {
            pageName: 'My Account',
            pageType: 'My Account',
            breadcrumb: ''
          }
        })
      }
    },
    // 修改邮件
    SubmitFormInfo1(form, type) {
      if (type === 'login_account') {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            const { login_account } = this.info
            let params = {
              login_account
            }
            await this.$api.user.userAttrSave({
              module: 'account',
              user_attr: JSON.stringify(params)
            })
            this.$Message.success('保存成功')
            this.loginInfoEdit = false
            this.orgin_info.login_account = login_account
            this.$store.dispatch('user/getUserInfo')
          }
        })
      } else if (type === 'password') {
        // 修改密码
        if (this.isModifyPassword) {
          if (!this.info.old_password) {
            return this.$Message.error('请填写旧密码')
          }
        }
        if (!this.info.password) {
          return this.$Message.error('请填写新密码')
        }
        if (!this.info.password2) {
          return this.$Message.error('请再次填写新密码')
        }
        if (this.info.password !== this.info.password2) {
          return this.$Message.error('新密码两次填写不一致')
        }
        if (this.isModifyPassword) {
          this.resetLoginPassword()
        } else {
          this.editPassWord()
        }
      } else {
        let valid_res = validate.validatePhone(this.info.mobile)
        if (valid_res) {
          return this.$Message.error(valid_res)
        }
        this.addMobile()
      }
    },
    cancelFormInfo1() {
      this.loginInfoEdit = false
      this.info.login_account = this.orgin_info.login_account
    },
    async addMobile() {
      let params = {
        mobile: this.info.mobile
      }
      await this.$api.user.userAttrSave({
        module: 'account',
        user_attr: JSON.stringify(params)
      })
      this.$Message.success('保存成功')
      this.mobileInfoEdit = false
      this.getAttrData()
    },
    async resetLoginPassword() {
      await this.$api.member.resetLoginPassword({
        password: this.info.old_password,
        new_pwd: this.info.password,
        new_pwd_confirmation: this.info.password2
      })
      this.$Message.success('密码修改成功')
      this.passWordEdit = false
    },
    async checkResetLoginPassword() {
      const res = await this.$api.member.checkResetLoginPassword()
      // 重置过密码
      this.isModifyPassword = res === 1
    },
    async editPassWord() {
      await this.$api.member.updateLoginPassword({
        password: this.info.password,
        password_confirmation: this.info.password2
      })
      this.$Message.success('密码修改成功')
    },
    // 修改个人信息
    async SubmitFormInfo2(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const { username, email, sex, birthday } = this.info
          let params = {
            username,
            email,
            sex,
            birthday
          }
          // if (!login_account) {
          //   params['login_account'] = login_account
          // }
          await this.$api.user.userAttrSave({
            module: 'user',
            user_attr: JSON.stringify(params)
          })
          this.orgin_info.username = this.info.username
          this.orgin_info.email = this.info.email
          this.orgin_info.sex = this.info.sex
          this.orgin_info.birthday = this.info.birthday
          this.$Message.success('保存成功')
          this.profileInfoEdit = false
          this.getAttrData()
        }
      })
    },
    cancelFormInfo2() {
      this.profileInfoEdit = false
      this.info.username = this.orgin_info.username
      this.info.email = this.orgin_info.email
      this.info.sex = this.orgin_info.sex
      this.info.birthday = this.orgin_info.birthday
    },
    // 修改兴趣爱好
    async SubmitFormInfo3() {
      const { vocation, hobby } = this.info
      let params = {
        vocation,
        hobby
      }
      await this.$api.user.userAttrSave({
        module: 'other',
        user_attr: JSON.stringify(params)
      })
      this.orgin_info.vocation = this.info.vocation
      this.orgin_info.hobby = [...this.info.hobby]
      this.$Message.success('保存成功')
      this.hobbyEdit = false
    },
    cancelFormInfo3() {
      this.hobbyEdit = false
      this.info.vocation = this.orgin_info.vocation
      this.info.hobby = [...this.orgin_info.hobby]
    },
    async unBindAccount(info) {
      let params = {
        trust_id: info.trust_id,
        flag: info.flag,
        user_id: this.userInfo.userId
      }
      await this.$api.user.unbindLogin(params)
      this.$store.dispatch('user/getUserInfo')
      this.$Message.success('解绑成功')
    }
  }
}
</script>
