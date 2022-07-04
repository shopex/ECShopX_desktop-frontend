<style lang="scss" src="./collector.scss"></style>

<template>
  <div class="page-collector">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="coupcollectoron" active="collector"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-header">我的收藏</div>
          <div class="member-content-right-body">
            <div v-if="!loading" class="collect-list clearfix">
              <template v-if="list && list.length > 0">
                <CollectorItem
                  :info="item"
                  @remove="itemRemove"
                  @addCartSuccess="handleShowModal"
                  v-for="item in list"
                  :key="item.item_id"
                >
                </CollectorItem>
              </template>
              <div class="collector__blank" v-else>
                <Tips
                  :userInfo="userInfo"
                  tips="您的收藏清单是空白的，保存你的心仪单品，实时掌握商品动态。"
                />
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
          <ModalTips v-if="showModal" @close="handleCloseModal">
            <div slot="content">
              <p class="reg-modal__h1">
                {{ userInfo.username ? userInfo.username + '，' : '' }}您的收藏夹已成功添加入购物袋
              </p>
            </div>
            <SpButton class="button-dark" @click="handleCloseModal">返回</SpButton>
            <SpButton class="button-dark ml20" @click="handleGoCart">前往购物袋</SpButton>
          </ModalTips>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorItem from './comps/collector-item'
import smenu from './../member/comps/smenu'
import ModalTips from '../auth/comps/modal-tips'
import Tips from './comps/tips'
import { analytics } from '@/plugins/analytics'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '我的收藏',
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
    CollectorItem,
    ModalTips,
    Tips
  },
  data() {
    return {
      list: null,
      loading: false,
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
      this.loading = true
      const { list, total_count } = await this.$api.member.favoriteItemList(params)
      this.list = list
      this.total = total_count
      this.loading = false
    },

    changePage(val) {
      this.page = val
      this.fetch()
    },

    itemRemove(item_id) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>请确认是否移除收藏?</p>',
        onOk: async () => {
          await this.$api.member.removeCollection({ item_ids: [item_id], is_empty: false })
          this.$Message.success('已成功删除')
          this.fetch()
        },
        onCancel: () => {}
      })
    },

    handleShowModal() {
      this.showModal = true
    },

    handleGoCart() {
      this.$router.push('/cart')
    },

    handleCloseModal() {
      this.showModal = false
    },

    handleGoIndex() {
      this.$router.push('/items')
    }
  }
}
</script>
