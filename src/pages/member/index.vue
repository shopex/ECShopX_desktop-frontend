<style lang="scss" src="./index.scss"></style>
<template>
  <div class="page-member member page-body container-member">
    <div class="member-top">
      <p class="member-top-title">会员中心</p>
    </div>
    <div class="member-content">
      <div class="member-content-left">
        <Smenu activeTitle="account"></Smenu>
      </div>
      <div class="member-content-right">
        <div>header</div>
        <section>
          <div>left</div>
          <div>right</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Smenu from './comps/smenu'
import VipCard from './comps/vip-card'

const CARD_MAP = {
  '1': require('@/assets/imgs/grade_card_1.jpg'),
  '2': require('@/assets/imgs/grade_card_2.jpg'),
  '3': require('@/assets/imgs/grade_card_3.jpg'),
  '4': require('@/assets/imgs/grade_card_3.jpg')
}

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
  components: { Smenu, VipCard },
  data() {
    return {
      info: null
    }
  },
  computed: {
    card_bg: function() {
      if (!this.info) return ''

      const { grade_id } = this.info
      return CARD_MAP[grade_id] || CARD_MAP[1]
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const info = await this.$api.member.memberInfo()
      this.info = info
    }
  }
}
</script>
