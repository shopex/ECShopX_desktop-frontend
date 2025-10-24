<!--
// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统 
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn 
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------
-->

<style lang="scss">
.event-click {
}
</style>

<template>
  <div class="event-click">
    <panelBar title="事件">
      <EventClick />
    </panelBar>
  </div>
</template>

<script>
import { attrField, panelBar } from './comps'

const EventClick = {
  data() {
    return {
      demoVal: { type: 'goods', data: [{ item_id: 222 }] },
      demoVal2: { type: 'article', data: '' }
    }
  },
  render(h) {
    return h(
      'Button',
      {
        on: {
          click: () => {
            this.handleClickPicker()
          }
        },
        props: {
          long: true,
          size: 'large'
        }
      },
      '点击事件'
    )
  },
  methods: {
    async handleClickPicker() {
      const { type, data } = this.demoVal2
      const val = await this.$picker(type, {
        data
      })
      this.demoVal2 = val
    }
  }
}
export default {
  name: 'eventClick',
  components: {
    // attrField,
    panelBar,
    EventClick
  },
  props: {
    href: {
      type: Array
    },
    text: {
      type: String,
      default: '设置点击事件'
    },
    transparent: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String
    },
    clipboard: {
      type: String
    },
    share: {
      type: String
    }
  },
  data() {
    return {
      config: {},
      pagepath: '',
      showDialogFlag: false,
      formItem: {
        href: this.href
      },
      tabValue: 'page',
      funList: {
        t_phoneNumber: this.phoneNumber,
        t_clipboard: this.clipboard,
        t_share: this.share
      },
      funLabel: [
        {
          label: 'phoneNumber',
          icon: 'icon-gonggao5',
          title: '拨打电话'
        },
        {
          label: 'clipboard',
          icon: 'icon-jiantiebanclipboard70',
          title: '剪贴板'
        }
        // {
        //     label: 'share',
        //     icon: 'icon-fenxiang',
        //     title: '分享'
        // }
      ],
      funContent: 'phoneNumber'
    }
  },
  // computed: {
  //   pageObj () {
  //     this.config = this.$store.state.mshopdesign.config
  //     let obj = []
  //     this.config.page.forEach(key => {
  //       let tjson = {}
  //       tjson.value = key.uuid
  //       tjson.label = key.group
  //       tjson.children = []
  //       key.pages.forEach(m => {
  //         tjson.children.push({
  //           value: m.uuid,
  //           label: m.name
  //         })
  //       })
  //       obj.push(tjson)
  //     })
  //     return obj
  //   },
  //   funTip () {
  //     return (
  //       this.funList.t_phoneNumber ||
  //       this.funList.t_clipboard ||
  //       this.funList.t_share
  //     )
  //   }
  // },
  created() {
    // this.getPagePath()
  },
  mounted() {},
  watch: {
    // href (newVal, oldVal) {
    //   this.formItem.href = newVal
    //   this.getPagePath()
    // },
    // 'funList.t_phoneNumber': {
    //   handler (newVal, oldVal) {
    //     this.$emit('update:phoneNumber', newVal)
    //   },
    //   deep: true
    // },
    // 'funList.t_clipboard': {
    //   handler (newVal, oldVal) {
    //     this.$emit('update:clipboard', newVal)
    //   },
    //   deep: true
    // },
    // 'funList.t_share': {
    //   handler (newVal, oldVal) {
    //     this.$emit('update:share', newVal)
    //   },
    //   deep: true
    // }
  },
  methods: {
    // handleEvent () {
    //   this.showDialogFlag = true
    // },
    // save () {
    //   if (this.tabValue === 'page') {
    //     // 选择绑定事件－页面
    //     this.$emit('update:href', this.formItem.href)
    //     for (let i in this.funList) {
    //       this.funList[i] = ''
    //     }
    //   } else if (this.tabValue === 'function') {
    //     // 选择绑定事件－功能
    //     this.$emit('update:href', [])
    //     for (let i in this.funList) {
    //       if (i !== 't_' + this.funContent) {
    //         this.funList[i] = ''
    //       }
    //     }
    //   }
    // },
    // deleteBtnEvent () {
    //   this.$Modal.confirm({
    //     title: '提示',
    //     content: '确定删除绑定的点击事件',
    //     onOk: () => {
    //       this.$emit('update:href', [])
    //       this.funList.t_phoneNumber = ''
    //       this.funList.t_clipboard = ''
    //     }
    //   })
    // },
    // getPagePath () {
    //   if (this.href.length > 0) {
    //     this.pagepath = ''
    //     let config = this.$store.state.mshopdesign.config
    //     config.page.forEach(key => {
    //       if (key.uuid === this.href[0]) {
    //         this.pagepath = key.group + ' > '
    //         key.pages.forEach(m => {
    //           if (m.uuid === this.href[1]) {
    //             this.pagepath += m.name
    //           }
    //         })
    //       }
    //     })
    //   }
    // }
  }
}
</script>
