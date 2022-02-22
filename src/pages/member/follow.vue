<style lang="scss" src="./follow.scss"></style>

<template>
  <div class="page-follow">
    <div class="container page-member-container">
      <div class="member-content">
        <div class="member-content-left">
          <smenu activeTitle="follow" active="follow"></smenu>
        </div>
        <div class="member-content-right">
          <div class="member-content-right-content">
            <div class="content-head">
              <span class="vertical">|</span>
              <span class="shop-collection">店铺收藏</span>
            </div>
            <hr />
            <div>
              <div class="content-list">
                <!-- 列表 -->
                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div class="content-list-item">
                  <div class="item-top">
                    <div class="item-logo"></div>
                    <div>
                      <div class="shop-name">店铺名称</div>
                      <div class="shop-follow">1个关注</div>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-bottom-left">
                      <i class="ec-icon ec-icon-shoplight"></i>
                      <span style="color: #8c8c8c;">进入店铺</span>
                    </div>
                    <div class="item-bottom-right">
                      <i class="ec-icon ec-icon-favor_light"></i>
                      <span style="color: #8c8c8c;">取消关注</span>
                    </div>
                  </div>
                </div>

                <div></div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CollectorItem from './comps/collector-item'
import smenu from './comps/smenu'
import Tips from './comps/tips'

export default {
  components: { smenu, CollectorItem, Tips },
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 20,
      total: 1,
      curTypeIndex: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },

  mounted() {},
  methods: {
    changePage(val) {
      this.page = val
      this.fetch()
    }
  }
}
</script>
