<style lang="scss" src="./coupon.scss"></style>

<template>
  <div class="page-coupon">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="coupon" active="coupon"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">我的优惠券</div>
          <div class="page-coupon__content">
            <div class="coupon-toolbar">
              <a class="coupon-type" javascript="void(0)">
                <span class="coupon-type__current">
                  {{ couponType[curTypeIndex].name }}({{ total }})
                  <i class="ec-icon ec-icon-unfold"></i>
                </span>
                <div class="coupon-type__cover">
                  <span
                    class="coupon-type__cover-item"
                    v-for="(type, index) in couponType"
                    :key="index"
                    @click="changeCouponType(index)"
                    >{{ type.name }}</span
                  >
                </div>
              </a>
            </div>

            <div class="page-coupon__block" :class="{ 'invalid': couponType === '2' }">
              <div class="coupon-list" v-if="list">
                <div class="coupon-item" v-for="(item, index) in list" :key="`coupon-item__${index}`">
                  <coupon-item
                    :info="item"
                    :key="item.coupon_code"
                    :valid="curTypeIndex == 0 ? true : false"
                  />
                </div>
              </div>
              <div class="loading-container" v-if="!list">
                <SpLoading class="modal-loading__t" color="#c3c3c3" v-if="!list"></SpLoading>
              </div>
              <div class='no-coupon' v-if="list && list.length == 0">
                您暂时没有任何优惠劵
              </div>
            </div>
            

            <div class="pagination-wrap">
              <SpPagination
                :total="total"
                :pageSize="pageSize"
                :current="page"
                @on-change="changePage"
                :maxPage="5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import smenu from './comps/smenu'
import couponItem from './comps/coupon-item'
import Tips from './comps/tips'

export default {
  components: { smenu, couponItem, Tips },
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 12,
      total: 0,
      curTypeIndex: 0,
      couponType: [
        {
          id: 1,
          name: '可用优惠券'
        },
        {
          id: 2,
          name: '不可用优惠券'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler: function (newV) {
  //       const { coupon_type } = this.$route.query
  //       if (this.couponType != coupon_type) {
  //         this.couponType = coupon_type || '1'
  //         this.getCouponList()
  //       }
  //     }
  //   }
  // },
  mounted() {
    this.getCouponList()
  },
  methods: {
    async getCouponList() {
      /* 
        {title: '未使用', status: '1'},
        {title: '已使用', status: '2'},
        {title: '已过期', status: '3'}
      */
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        status: this.curTypeIndex+1
      }

      // const { list, total_count } = await this.$api.member.couponList(params)
      const { list, total_count } = await this.$api.member.getUserCardList(params)
      this.list = list || []
      this.total = total_count != undefined ? parseInt(total_count) : 0
    },
    changePage(val) {
      this.page = val
      this.getCouponList()
    },
    changeCouponType(index) {
      if (this.curTypeIndex != index) {
        this.curTypeIndex = index
        this.page = 1
        this.getCouponList()
      }
    }
  }
}
</script>
