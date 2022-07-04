<style lang="scss" src="./checkout.scss"></style>

<template>
  <div class="page-checkout">
    <div class="container clearfix">
      <div class="checkout-title">填写并核对订单信息</div>

      <div class="content-body clearfix">
        <div class="content-item">
          <h4 class="content-item-hd">选择取货方式</h4>
          <div class="content-item-bd address">
            <!-- expressType: {{expressType}} -->
            <SpBtnPickerGroup v-model="expressType" @onChange="onChangeExpress">
              <SpBtnPicker
                v-for="(item, index) in addressTabs"
                :value="item.value"
                :key="`btn-item__${index}`"
                :theme="themeColor"
                >{{ item.name }}</SpBtnPicker
              >
            </SpBtnPickerGroup>
          </div>
        </div>

        <!-- 收货地址 -->
        <div class="content-item" v-if="expressType == 'logistics'">
          <h4 class="content-item-hd">
            收货人信息
            <span
              class="btn-text"
              :style="{
                color: themeColor
              }"
              @click="handleAddAddress"
              >新增收货地址</span
            >
          </h4>
          <div class="content-item-bd address-list">
            <!-- defaultAddress: {{defaultAddress}} -->
            <SpBtnPickerGroup v-model="defaultAddress" @onChange="onChangeAddress">
              <div
                class="address-item"
                v-for="(item, index) in addressList"
                :key="`btn-item__${index}`"
              >
                <SpBtnPicker :value="item.address_id" :theme="themeColor">{{
                  item.username
                }}</SpBtnPicker>
                <div class="address-item-detail">
                  <div class="phone">{{ item.telephone }}</div>
                  <div class="d-detail">
                    {{ `${item.province} ${item.city} ${item.county} ${item.adrdetail}` }}
                  </div>
                  <div
                    class="def-tag"
                    v-if="item.is_def"
                    :style="{
                      backgroundColor: themeColor
                    }"
                  >
                    默认
                  </div>
                  <div class="btn-tools">
                    <!-- <span class="btn btn-text" :style="{
                      color: themeColor
                    }">设为默认</span> -->
                    <span
                      class="btn btn-text"
                      :style="{
                        color: themeColor
                      }"
                      @click="handleEditAddress(item)"
                      >编辑</span
                    >
                    <!-- <span class="btn btn-text" :style="{
                      color: themeColor
                    }">删除</span> -->
                  </div>
                </div>
              </div>
            </SpBtnPickerGroup>
          </div>
        </div>

        <div class="content-item" v-if="expressType == 'ziti'">
          <h4 class="content-item-hd">收货信息</h4>
          <div class="content-item-bd ziti" v-if="zitiAddress">
            <div class="ziti-name">{{ zitiAddress.name }}</div>
            <div class="ziti-address">{{ zitiAddress.store_address }}</div>
            <div class="ziti-time">营业时间：{{ zitiAddress.hour }}</div>
            <div class="ziti-phone">联系电话：{{ zitiAddress.phone }}</div>
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">商品清单</h4>
          <div class="content-item-bd goods-list">
            <div
              class="goods-list-item"
              v-for="(item, index) in list"
              :key="`goods-list-item__${index}`"
            >
              <SpImg class="goods-img" :src="item.pic" no-size />
              <div class="goods-name">{{ item.item_name }}</div>
              <div class="goods-price">
                <SpPrice :value="item.price /100" />
              </div>
              <div class="goods-num">{{ `x ${item.num}` }}</div>
            </div>
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">
            发票信息
            <SpRadio type="checkbox" class="use-invoice" :theme="themeColor" v-model="useInvoice"
              >需要发票</SpRadio
            >
          </h4>
          <div class="content-item-bd invoice">
            <div v-if="useInvoice">
              <SpRadioGroup v-model="invoiceTyle">
                <SpRadio label="individual" :theme="themeColor">个人发票</SpRadio>
                <SpRadio label="unit" :theme="themeColor">企业发票</SpRadio>
              </SpRadioGroup>
              <!-- 个人发票 -->
              <div class="invoice-info" v-if="invoiceTyle == 'individual'">
                <div class="invoice-row">
                  <div class="invoice-row__title">发票抬头*</div>
                  <SpInput v-model="invoice_content.title"></SpInput>
                </div>
              </div>
              <!-- 企业发票 -->
              <div class="invoice-info" v-if="invoiceTyle == 'unit'">
                <div class="invoice-row">
                  <div class="invoice-row__title">公司名称*</div>
                  <SpInput v-model="invoice_content.content"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">税号*</div>
                  <SpInput v-model="invoice_content.registration_number"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">公司地址</div>
                  <SpInput v-model="invoice_content.company_address"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">电话号码</div>
                  <SpInput v-model="invoice_content.company_phone"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">开户银行</div>
                  <SpInput v-model="invoice_content.bankname"></SpInput>
                </div>
                <div class="invoice-row">
                  <div class="invoice-row__title">银行账号</div>
                  <SpInput v-model="invoice_content.bankaccount"></SpInput>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="integral">
            <h4 class="content-item-hd">
              积分抵扣
            </h4>
            <div class="integral-rules" style="cursor:pointer" @click="dailogIntegralVisible=true">使用规则</div>
          </div>
          <div>用户可用积分：{{ orderData.user_point }}；本单最大可用积分：{{ orderData.max_point }}</div>
          <div class="integral-item">
            <SpRadio type="checkbox" :theme="themeColor" v-model="useIntegral"  @change="handleDeducted"
              >使用积分</SpRadio
            >
            <input class="integral-input" type="number" v-show="useIntegral" v-model="point_use" @blur="pointBlur">
            <SpRadio type="checkbox" :theme="themeColor" v-model="useAllDeducted" @change="handleAllDeducted" v-show="useIntegral && (orderData.deduct_point_rule&&orderData.deduct_point_rule.full_amount)"
              >全额抵扣</SpRadio
            >
          </div>
        </div>

        <div class="content-item">
          <h4 class="content-item-hd">使用优惠</h4>
          <div class="content-item-bd coupon-list">
            <SpBtnPickerGroup v-model="coupon" @onChange="onChangeCoupon">
              <SpBtnPicker
                v-for="(coupon, index) in couponList"
                class="coupon-item"
                :value="coupon.code"
                :disabled="!coupon.valid"
                :key="`btn-item__${index}`"
                :theme="themeColor"
              >
                <div class="coupon-wrap">
                  <div class="coupon-name">
                    <template v-if="coupon.card_type == 'discount'"
                      >{{ (100 - coupon.discount) / 10 }}<span class="symbol">折</span></template
                    >
                    <template v-if="coupon.card_type == 'cash'"
                      ><SpPrice :value="coupon.reduce_cost / 100"></SpPrice
                    ></template>
                  </div>
                  <div class="coupon-title">{{ coupon.title }}</div>
                </div>
                <div class="coupon-date">{{ `有效期:${coupon.end_date}` }}</div>
              </SpBtnPicker>
              <SpBtnPicker class="coupon-item not-use" :value="-1" :theme="themeColor"
                >不使用优惠券</SpBtnPicker
              >
            </SpBtnPickerGroup>
          </div>
        </div>
        <div class="content-item">
          <div class="content-item-bd checkout-total">
            <div class="total-row">
              <div class="label">{{ orderData.items_count }}件商品，商品总计：</div>
              <div class="value"><SpPrice :value="orderData.item_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">运费：</div>
              <div class="value"><SpPrice :value="orderData.freight_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">优惠：</div>
              <div class="value"><SpPrice :value="0 - orderData.discount_fee / 100" /></div>
            </div>
            <div class="total-row">
              <div class="label">积分抵扣：</div>
              <div class="value"><SpPrice :value="0 - orderData.point_fee / 100" /></div>
            </div>
          </div>
        </div>
        <div class="content-ft">
          <div class="actual-total">
            <span class="label">应付总计：</span>
            <SpPrice :value="orderData.total_fee / 100" />
          </div>
          <div
            class="content-ft-btn"
            @click="handleSubmitOrder"
            :style="{
              backgroundColor: themeColor
            }"
          >
            提交订单
          </div>
        </div>
      </div>
    </div>

    <SpModal
      :title="addType == 'post' ? '新增地址' : '编辑地址'"
      v-model="dailogVisible"
      :width="600"
    >
      <AddressItemAdd
        :type="addType"
        :addressInfoFrom="addressInfoFrom"
        :theme="themeColor"
        @onClick="addAddressSumbit"
        @clickCancel="clickCancel"
      />
    </SpModal>
    <SpModal
      title="积分使用规则"
      v-model="dailogIntegralVisible"
      :width="600"
    >
      <div style="height:200px;margin:20px;">
        <div>使用条件</div>
        <div>1、积分支付不得超出订单应付总金额的{{orderData.deduct_point_rule&&orderData.deduct_point_rule.deduct_proportion_limit}}%；</div>
        <div>使用数量</div>
        <div> 2、{{orderData.deduct_point_rule&&orderData.deduct_point_rule.deduct_point}}积分抵扣1元；</div>
      </div>
    </SpModal>
  </div>
</template>

<script>
import { mixin } from '@/mixins'
import AddressItemAdd from '@/pages/member/address-item-add'
import { validate } from '@/utils'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'authenticated',
  mixins: [mixin],
  components: {
    AddressItemAdd
  },
  data() {
    return {
      addressList: [],
      orderData: {}, //订单数据
      list: [], //商品数据
      creatData: {}, //
      dailogVisible: false,
      dailogIntegralVisible: false,
      addressInfoFrom: {}, //修改地址信息
      addType: 'post', //修改地址类型，post新增，put更新,
      params: {},
      expressType: 'logistics',
      addressTabs: [{ name: '快递', value: 'logistics' }],
      defaultAddress: '',
      curAddressIndex: 0,
      curAddress: null,
      couponList: [],
      coupon: '',
      zitiAddress: null,
      // 是否使用发票
      useInvoice: false,
      // 是否使用积分
      useIntegral: false,
      // 是否全额抵扣
      useAllDeducted: false,
      // 发票类型
      invoiceTyle: 'individual',
      // 开票信息
      invoice_content: {
        title: '', // 发票title
        content: '', // 公司名称,
        company_address: '', // 公司地址
        registration_number: '', // 税号
        bankname: '', // 银行名称
        bankaccount: '', // 银行账号
        company_phone: '' // 电话号码
      },
      point_use:0,    //输入的积分
      maxPoint:0,     //可输入的最大值
    }
  },
  mounted() {
    this.getAddressList()
    this.fetchZiTiShop()
  },
  methods: {
    ...mapActions({
      CART_GETINFO: 'cart/CART_GETINFO'
    }),
    async fetchZiTiShop() {
      const { id } = this.$route.query
      const res = await this.$api.shop.getShop({ distributor_id: id })
      this.zitiAddress = res
      if (res && res.is_ziti) {
        this.addressTabs = [
          { name: '快递', value: 'logistics' },
          { name: '自提', value: 'ziti' }
        ]
      }
    },
    // 获取优惠券
    async getValidCoupon() {
      const { id, mode } = this.$route.query
      const items = this.list
        .filter((item) => item.order_item_type !== 'gift')
        .map((item) => {
          const { item_id, num, total_fee: price } = item
          return {
            item_id,
            price,
            num
          }
        })
      const params = {
        valid: true,
        is_checkout: true,
        cart_type: mode,
        distributor_id: id,
        use_platform: 'mall',
        page_type: 'picker',
        items
      }
      const { list } = await this.$api.member.couponList(params)
      this.couponList = list
    },
    // 获取地址列表
    async getAddressList() {
      const { list } = await this.$api.member.addressList()
      this.addressList = list
      const fd = list.find((item) => item.is_def)
      if (fd) {
        this.defaultAddress = fd.address_id
      }
      this.getFreightFee()
    },
    // 积分输入规则
    pointBlur(){
      let { point_use,maxPoint } = this
      if(point_use>maxPoint){
        point_use = maxPoint
      }
      this.point_use = point_use*1
      // 判断是否全额支付
      if(this.point_use === this.orderData.max_point){
        this.useAllDeducted = true
      }else{
        this.useAllDeducted = false
      }
      this.getFreightFee()
    },
    // 单选是否使用积分
    handleDeducted(){
      if(this.useIntegral===false){
        this.point_use = 0
        this.getFreightFee()
        this.useAllDeducted = false   //全额抵扣单选关闭
      }
      console.log(this.useIntegral,"useIntegral",this.point_use);
    },
    // 全额支付
    handleAllDeducted(){
      // 全额抵扣用deduct_point字段直接赋值
      this.point_use = this.orderData.max_point
      this.getFreightFee()
    },
    onChangeExpress() {
      this.getFreightFee()
    },
    onChangeAddress() {
      this.getFreightFee()
    },
    onChangeCoupon() {
      this.getFreightFee()
    },
    // 获取商品信息
    async getFreightFee() {
      this.$loading({ background: 'transparent' })
      const params = this.getParams()
      try {
        const {
          items,
          item_fee,
          discount_fee,
          freight_fee,
          total_fee,
          totalItemNum,
          user_point,   //可用积分
          max_point,    //本单可用积分
          point_fee,    //抵扣金额
          deduct_point_rule
        } = await this.$api.cart.freightFee(params)
        this.orderData = {
          item_fee,
          discount_fee: discount_fee,
          freight_fee,
          items_count: totalItemNum,
          total_fee,
          user_point,
          max_point,
          point_fee,
          deduct_point_rule
        }
        this.list = items
        this.getValidCoupon()
        this.$loading().close()
        // maxPoint可输入的最大积分
        if(user_point>max_point){
          this.maxPoint = max_point
        }else if(user_point<max_point){
          this.maxPoint = user_point
        }else{
          this.maxPoint = max_point
        }
      } catch (e) {
        this.$loading().close()
      }
    },
    // 订单提交参数
    getParams() {
      const { id, mode, order_type, seckill_id, ticket } = this.$route.query
      const { defaultAddress, coupon,point_use } = this

      let pay_type = 'wxpaypc'
      if(this.useAllDeducted===true && this.point_use>0){    // 判断是否积分支付
        pay_type = 'point'
      }else{
        pay_type = "wxpaypc"
      }
      let params = {
        distributor_id: id,
        cart_type: mode,
        order_type: order_type || 'normal',
        // pay_type: 'wxpaypc',
        pay_type: pay_type,
        promotion: 'normal',
        receipt_type: 'logistics',
        point_use:point_use
      }

      if(coupon == -1 || coupon == ''){  // 不使用优惠券需要传 not_use_coupon
        params.not_use_coupon = 1
      }

      // 使用优惠券
      if (coupon != -1) {
        params = {
          ...params,
          coupon_discount: coupon
        }
      }
      const fdAddress = this.addressList.find((item) => item.address_id == defaultAddress)
      if (fdAddress) {
        params = {
          ...params,
          receiver_address: fdAddress.adrdetail,
          receiver_city: fdAddress.city,
          receiver_district: fdAddress.county,
          receiver_mobile: fdAddress.telephone,
          receiver_name: fdAddress.username,
          receiver_state: fdAddress.province
        }
      }
      return params
    },
    // 新增收货地址
    handleAddAddress() {
      this.addType = 'post'
      this.addressInfoFrom = {}
      this.dailogVisible = true
    },
    // 编辑地址
    handleEditAddress(item) {
      this.addType = 'put'
      this.addressInfoFrom = item
      this.dailogVisible = true
    },
    // 提交订单
    async handleSubmitOrder() {
      if (this.expressType == 'logistics' && !this.defaultAddress) {
        this.$Message.error('请选择收货地址')
        return
      }
      let params = this.getParams()
      if (this.useInvoice) {
        const {
          title,
          content,
          registration_number,
          company_address,
          bankname,
          bankaccount,
          company_phone
        } = this.invoice_content
        if (this.invoiceTyle == 'individual') {
          if (!title) {
            this.$Message.error('请填写发票抬头')
            return
          }
        } else if (this.invoiceTyle == 'unit') {
          if (!content) {
            this.$Message.error('请填写公司名称')
            return
          }
          if (!validate.checkTax(registration_number)) {
            this.$Message.error('请填写正确的企业税号')
            return
          }
        }
        const invoice_content = {
          title: this.invoiceTyle,
          content: this.invoiceTyle == 'individual' ? title : content,
          company_address,
          registration_number,
          bankname,
          bankaccount,
          company_phone
        }
        params = {
          ...params,
          invoice_type: 'normal',
          invoice_content
        }
      }

      this.$loading({ background: 'transparent' })
      try {
        const { order_id } = await this.$api.cart.creatOrder(params)
        const { mode } = this.$route.query
        if (mode == 'cart') {
          this.CART_GETINFO()
        }
        this.$loading().close()
        if(this.orderData.total_fee===0){
          console.log(this.orderData.total_fee===0);
          // 积分抵扣支付
          this.$router.push({ path: `/finish/result?id=${order_id}` })
        }else{
          // 正常支付
          this.$router.push({ path: `/cashier?order_id=${order_id}` })
        }
      } catch (e) {
        this.$loading().close()
      }
    },
    addAddressSumbit() {
      this.getAddressList()
      this.dailogVisible = false
    },
    clickCancel() {
      this.dailogVisible = false
    }
  }
}
</script>
