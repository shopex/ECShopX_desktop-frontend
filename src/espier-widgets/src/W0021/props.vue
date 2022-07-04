<style lang="scss">
.widget-W0015-props {
  .delete-btn {
    float: right;
    margin-right: 10px;
  }
  .wgt-props {
    display: flex;
    margin: 20px 0 10px;
    &_img {
      flex: 0;
      width: 60px;
      height: 60px;
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
      }
    }
    &_delete {
      flex: 0;
      width: 30px;
      cursor: pointer;
      padding-top: 5px;
      text-align: center;
      .icon-shanchu {
        color: #3091f2;
      }
    }
    &_content {
      flex: 1;
      padding: 5px 10px;
      .title {
        font-size: 12px;
        font-weight: 400;
        @include mult-ellipsis(2);
      }
      .tag {
        .tag-item {
          padding: 2px 3px;
          // border: 1px solid rgba(247, 137, 137, 1);
          border-radius: 3px;
          font-size: 12px;
          color: #f56c6c;
          background-color: rgba(254, 240, 240, 1);
          margin-right: 3px;
          // @include mult-ellipsis(1)
        }
      }
    }
  }
  .tip {
    margin-top: 8px;
    color: #d01717;
  }
}
</style>
<template>
  <div class="widget-W0015-props">
    <Tabs value="name1" :animated="false">
      <TabPane
        :label="`${activeElement.name}[${activeElement.type}]`"
        name="name1"
      >
        <panelBar title="标题设置">
          <attr-field label="主标题：">
            <Input v-model="activeElement.text" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="背景颜色：">
            <color-picker v-model="activeElement.wgtBackgroundColor"></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber v-model="activeElement.wgtTitleFontSize" size="small" :min="0"></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体颜色：">
            <color-picker  v-model="activeElement.wgtTextColor"  ></color-picker>
          </attr-field>
          <div class="division"></div>
          <attr-field label="圆角：" >
            <iSwitch size="small" v-model="activeElement.wgtBorderRadius" />
          </attr-field>

          <div class="division"></div>
          <attr-field label="副标题：">
            <Input v-model="activeElement.subTitle" />
          </attr-field>
          <div class="division"></div>
          <attr-field label="标题字体：">
            <InputNumber v-model="activeElement.wgtSubTitleFontSize" size="small" :min="0"></InputNumber>
          </attr-field>
          <div class="division"></div>
          <attr-field label="字体颜色：">
            <color-picker  v-model="activeElement.wgtSubTextColor"  ></color-picker>
          </attr-field>
        </panelBar>

        <panelBar title="优惠券列表">
          <div class="division"></div>
          <attr-field label="选择商品：">
            <dataBind
              :value="[]"
              :imgPicker="false"
              :filterMenu="['coupons']"
              :multiple="true"
              :customPath="false"
              @pathOnChange="(data) => onChangePath(data, i)"
              activeKey="coupons_id"
              placeholder="选择优惠券"
            ></dataBind>
          </attr-field> 
        </panelBar>
      </TabPane>
      <TabPane label="组件样式" name="name2">
        <basic-set v-model="activeElement"></basic-set>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { panelBar, attrField, dataBind,colorPicker } from '../../common/comps'
import basicSet from '../../common/basic-set'
export default {
  name: 'W0021Props',
  props: ['activeElement'],
  data() {
    return {}
  },
  components: {
    panelBar,
    attrField,
    dataBind,
    basicSet,
    colorPicker
  },
  watch: {
    'activeElement.data': {
      handler: function(nval, oval) {
        // setTimeout(() => {
        //   this.activeElement.height =
        //     60 + document.getElementById(`goods-wrap__${this.activeElement.uuid}_0`).clientHeight
        // }, 100)
      },
      deep: true
    },
    'activeElement.width': {
      handler: function(nval, oval) {
        setTimeout(() => {
          this.activeElement.height =
            60 + document.getElementById(`goods-wrap__${this.activeElement.uuid}_0`).clientHeight
        }, 100)
      },
      deep: true
    }
  },
  methods: {
    handleDelete(i) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该项？',
        onOk: () => {
          if (this.activeElement.data.length > 1) {
            this.activeElement.data.splice(i, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1个商品')
          }
        }
      })
    },
    deleteItem(i, idex) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该商品？',
        onOk: () => {
          if (this.activeElement.data[i].data.length > 1) {
            this.activeElement.data[i].data.splice(idex, 1)
            this.$Message.success('删除成功！')
          } else {
            this.$Message.error('请至少添加1个商品')
          }
        }
      })
    },
    onChangePath(data, index) {
      const goodsData = data.map(item => {
        const { coupons_id, pics, price, item_name, linkPage, linkPageLabel ,title,subTitle} = item
        return {
          coupons_id,
          coupons_pic: pics.length > 0 ? pics[0] : '',
          price: price,
          coupons_name: item_name,
          linkPage,
          title,
          subTitle,
          linkPageLabel
        }
      })
      console.log(this.activeElement.data,"this.activeElement.data11111111111111111111111");
      this.activeElement.data[index].data = goodsData
    }
  }
}
</script>
