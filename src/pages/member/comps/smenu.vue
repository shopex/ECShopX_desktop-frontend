<style lang="scss">
.sp-smenu {
  padding: 20px;
  padding-left: 42px;
  min-height: 600px;
  // border: 1px solid $color-border-gray;
  border-radius: 4px;
  .menu-block {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
    .submenu-title {
      font-size: 15px;
      font-weight: 600;
      color: #3b3b3b;
      .new_iconfont {
        color: #8a8a8a;
        font-size: 18px;
        margin-left: -24px;
        margin-right: 8px;
      }
    }
    .submenu-con {
      margin-top: 6px;
    }
    .submenu-item {
      &:not(:last-child) {
        margin-bottom: 6px;
      }
      a {
        font-size: 13px;
      }
    }
  }
}
</style>

<template>
  <ul class="sp-smenu">
    <li class="menu-block">
      <p class="submenu-title"><i class="new_iconfont icon-new-pc-huiyuanxinxi"></i>会员信息</p>
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/user-info" :style="getActiveColor('user-info')"
            >个人资料</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/change-password" :style="getActiveColor('change-password')"
            >更改密码</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/address" :style="getActiveColor('address')">收货地址</nuxt-link>
        </li>
      </ul>
    </li>
    <li class="menu-block">
      <p class="submenu-title"><i class="new_iconfont icon-new-pc-dingdan"></i>我的订单</p>
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/trade" :style="getActiveColor('trade')">所有订单</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/trade/aftersale-list" :style="getActiveColor('aftersale')"
            >售后订单</nuxt-link
          >
        </li>
      </ul>
    </li>
    <li class="menu-block">
      <!-- <p class="submenu-title"><i class="new_iconfont icon-new-pc-youhuiquan"></i>我的优惠券</p> -->
      <ul class="submenu-con">
        <li class="submenu-item">
          <nuxt-link to="/member/coupon" :style="getActiveColor('coupon')">我的优惠券</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/collector" :style="getActiveColor('collector')"
            >我的收藏</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/foottrace" :style="getActiveColor('foottrace')"
            >我的足迹</nuxt-link
          >
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/point" :style="getActiveColor('point')">我的积分</nuxt-link>
        </li>
        <li class="submenu-item">
          <nuxt-link to="/member/follow" :style="getActiveColor('follow')">关注店铺</nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mixin } from '@/mixins'
import tabs from './tabs'

const SHOW_TABS_MAP = ['member-trade', 'member-coupon']

export default {
  mixins: [mixin],
  components: { tabs },
  props: {
    activeTitle: String,
    active: String
  },
  data() {
    return {
      SHOW_TABS_MAP,
      orderType: '',
      tabs: [
        { label: '所有订单', value: '' },
        { label: '售后订单', value: 's' }
      ],
      couponType: '',
      couponTabs: [
        { label: '可使用优惠券', value: '1' },
        { label: '失效优惠券', value: '2' }
      ],
      showTabs: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newV) {
        const { name } = this.$route
        const { type, coupon_type } = this.$route.query
        this.orderType = type || ''
        this.couponType = coupon_type
        this.showTabs = SHOW_TABS_MAP.indexOf(name) !== -1 ? name : ''
      }
    }
  },
  methods: {
    getActiveColor(name) {
      const { themeColor } = this.pageConfig
      if (this.active == name) {
        return {
          color: themeColor
        }
      }
    },
    handleOrderChangeTab(e) {
      let url = e.value ? `/member/trade?type=${e.value}` : `/member/trade`
      this.$router.replace(url)
    },
    handleCouponChangeTab(e) {
      let url = e.value ? `/member/coupon?coupon_type=${e.value}` : `/member/coupon`
      this.$router.replace(url)
    }
  }
}
</script>
