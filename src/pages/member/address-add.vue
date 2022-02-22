<style lang="scss" src="./address.scss"></style>

<template>
  <div class="page-address member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">会员中心</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <smenu activeTitle="account" active="address"></smenu>
      </div>
      <div class="member-content-right">
        <div class="member-content-right-limit">
          <template>
            <SpForm ref="form-address" :model="info" :rules="rules">
              <SpFormItem prop="name">
                <span class="label-text">收货人</span>
                <SpInput class="member-input-text" v-model="info.name" />
              </SpFormItem>
              <SpFormItem prop="phone">
                <span class="label-text">手机号</span>
                <SpInput class="member-input-text" v-model="info.phone" />
              </SpFormItem>
              <SpFormItem prop="address">
                <span class="label-text">所在城市</span>
                <div class="member-input-text">
                  <SpAddressPicker v-model="info.address" />
                </div>
              </SpFormItem>
              <SpFormItem prop="addressdetail">
                <span class="label-text">详细地址</span>
                <SpInput class="member-input-text" v-model="info.addressdetail" />
              </SpFormItem>
              <SpFormItem prop="zcode">
                <span class="label-text">邮编</span>
                <SpInput class="member-input-text" v-model="info.zcode" />
              </SpFormItem>
              <SpFormItem>
                <span class="label-text"></span>
                <SpRadio type="checkbox" size="small" v-model="info.def_addr">
                  <span class="set-default-addr">设置为默认收货地址</span>
                </SpRadio>
              </SpFormItem>
              <SpFormItem class="btn-container-member">
                <SpButton class="button-dark" @click="addressSubmit('form-address')">保存</SpButton>
              </SpFormItem>
            </SpForm>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { SpAddressPicker } from '@/components'
import smenu from './../member/comps/smenu'
import { mixins, validate } from '@/utils'
import { analytics } from '@/plugins/analytics'

export default {
  async asyncData({ app, route }) {
    let { region } = await app.$api.member.areaList()
    return {
      region
    }
  },

  head() {
    return {
      title: '会员中心_Aigle官方网站',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '我的账户_Aigle官方网站'
        },
        {
          hid: 'description',
          name: 'description',
          content: '我的账户_Aigle官方网站'
        }
      ]
    }
  },
  data() {
    return {
      info: {
        addr_id: '',
        name: '',
        phone: '',
        address: [],
        addressdetail: '',
        zcode: '',
        def_addr: 0
      },
      rules: {
        // name: [{ validate: 'required', message: '请输入收货人姓名' }],
        // addressdetail: [{ validate: 'required', message: '请输入详细地址' }],
        // phone: [{ validate: 'required', message: '请输入11位手机号' }],
        name: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              if (value) {
                callback()
              } else {
                callback('请输入收货人姓名')
              }
            },
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              let valid_res = validate.validatePhone(value)
              if (valid_res) {
                callback(valid_res)
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        addressdetail: [
          {
            validate: (rule, value, callback) => {
              // eslint-disable-next-line standard/no-callback-literal
              if (value) {
                callback()
              } else {
                callback('请输入详细地址')
              }
            },
            trigger: 'blur'
          }
        ]
      },
      addressList: []
    }
  },
  components: { smenu },
  mounted() {
    this.getAddressList()
  },
  methods: {
    async getAddressList() {
      const { id } = this.$route.query
      if (id) {
        const item = await this.$api.member.addressItem(id)
        this.setCurrentAddress(item)
      }
    },
    setCurrentAddress(item) {
      this.info = {
        addr_id: item.addr_id,
        name: item.name,
        phone: item.mobile,
        address: item.region_id.split(','),
        addressdetail: item.addr,
        zcode: item.zip,
        def_addr: !!item.def_addr
      }
    },
    async addressSubmit(name) {
      this.$refs[name].validate((valid, errors) => {
        if (valid) {
          this.handleSaveAddress()
        }
      })
    },
    async handleSaveAddress() {
      let params = {
        name: this.info.name,
        mobile: this.info.phone,
        area: this.info.address.join(','),
        addr: this.info.addressdetail,
        zip: this.info.zcode,
        def_addr: this.info.def_addr ? 1 : 0
      }
      if (this.info.addr_id) {
        // 编辑
        params = {
          ...params,
          addr_id: this.info.addr_id
        }
        await this.$api.member.addressUpdate(params)
        this.$Message.success('修改成功！')
      } else {
        // 新增
        await this.$api.member.addressCreate(params)
        this.$Message.success('保存成功！')
        analytics.event({}, 'addNewAddressSuccess')
      }
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    }
  }
}
</script>
