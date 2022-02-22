<style lang="scss" src="./collector.scss"></style>

<template>
  <div class="page-collector">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="foottrace" active="foottrace"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">我的足迹</div>
          <div class="member-content-right-body">
            <div v-if="!loading" class="collect-list clearfix">
              <template v-if="list && list.length > 0">
                <FoottraceItem :info="item" v-for="item in list" :key="item.item_id"> </FoottraceItem>
              </template>
              <div class="collector__blank" v-else>
                <Tips :userInfo="userInfo" tips="您的足迹是空白的。" />
              </div>
            </div>
            <div class="pagination-wrap">
              <SpPagination
                :total="total"
                :pageSize="pageSize"
                :current="page"
                :maxPage="5"
                @on-change="changePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FoottraceItem from './comps/foottrace-item'
import smenu from './../member/comps/smenu'
import Tips from './comps/tips'

import { mapState } from 'vuex'
import { getHistoryList } from '@/api/member'

export default {
  head() {
    return {
      title: '会员中心_标品官方网站',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '我的账户_标品官方网站'
        },
        {
          hid: 'description',
          name: 'description',
          content: '我的账户_标品官方网站'
        }
      ]
    }
  },
  components: {
    smenu,
    FoottraceItem,
    Tips
  },
  data() {
    return {
      list: null,
      loading: true,
      page: 1,
      pageSize: 20,
      total: 0,
      info: null,
      showModal: false
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      let res = await getHistoryList(params)
      const { list, total_count } = res
      this.list = list.map((item) => {
        return {
          ...item.itemData
        }
      })
      this.total = total_count
      this.loading = false
    },
    changePage(val) {
      this.page = val
      this.fetch()
    }
  }
}
</script>
