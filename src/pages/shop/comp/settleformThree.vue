<template>
  <div class="content">
    <SpForm
      class="settle__form"
      ref="form-settle"
      :model="info"
      :rules="accountRules"
      style="{height: 372px;}"
    >
      <SpFormItem prop="companyName" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传营业执照照片</span>
        <div class="upload">
          <template>
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.license_url"  @click="clickUpLoad('license_url')" :src="info.license_url" no-size />
              <SpImg class="spimg1" v-if="!info.license_url"  @click="clickUpLoad('license_url')" :src="defaultImg1" no-size />
            </div>
          </template>
          <input type="file" ref="license_url" class="input" @change="(e)=>changeUpload(e,'license_url')"></input>
          <div class="input-icon">
            <p v-if="!info.license_url">上传营业执照</p>
            <p v-if="info.license_url"  @click="clickUpLoad('license_url')">重新上传</p>
          </div>
          <div v-if="!info.license_url && rulesShow" class="form-item__error-message">请上传营业执照照片</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="unifiedCode" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传法人手持身份证照片</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1"  v-if="info.legal_certid_front_url" @click="clickUpLoad('legal_certid_front_url')" :src="info.legal_certid_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')" :src="defaultImg3" no-size />
            </div>
          </template>
          <input type="file" ref="legal_certid_front_url" class="input" @change="(e)=>changeUpload(e,'legal_certid_front_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_certid_front_url">上传身份证正面图片</p>
            <p v-if="info.legal_certid_front_url"  @click="clickUpLoad('legal_certid_front_url')">重新上传</p>
          </div>
        </div>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.legal_cert_id_back_url" @click="clickUpLoad('legal_cert_id_back_url')" :src="info.legal_cert_id_back_url" no-size />
              <SpImg class="spimg1" v-if="!info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')" :src="defaultImg3" no-size />
            </div>
          </template>
          <input type="file" ref="legal_cert_id_back_url" class="input" @change="(e)=>changeUpload(e,'legal_cert_id_back_url')"></input>
          <div class="input-icon" >
            <p v-if="!info.legal_cert_id_back_url">上传身份证反面图片</p>
            <p v-if="info.legal_cert_id_back_url"  @click="clickUpLoad('legal_cert_id_back_url')">重新上传</p>
          </div>
          <div v-if="(!info.legal_cert_id_back_url || !info.legal_certid_front_url) && rulesShow" class="form-item__error-message">请上传手持身份证正反面照片</div>
        </div>
      </SpFormItem>
      <SpFormItem prop="area" class="form-select">
        <span class="label-text"><span class="must-icon">*</span>请上传结算银行卡正面照片</span>
        <div class="upload">
          <template >
            <div class="spimg-item">
              <SpImg class="spimg1" v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')" :src="info.bank_card_front_url" no-size />
              <SpImg class="spimg1" v-if="!info.bank_card_front_url"  @click="clickUpLoad('bank_card_front_url')" :src="defaultImg2" no-size />
            </div>
          </template>
          <input type="file" ref="bank_card_front_url" class="input" @change="(e)=>changeUpload(e,'bank_card_front_url')"></input>
          <div class="input-icon">
            <p v-if="info.bank_card_front_url" @click="clickUpLoad('bank_card_front_url')">重新上传</p>
            <p v-else>上传银行卡正面照片</p>
          </div>
        </div>
        <div v-if="!info.bank_card_front_url && rulesShow" class="form-item__error-message">请上传银行卡正面照片</div>
      </SpFormItem>
    </SpForm>
    <p class="tips">• 上传图片尺寸需小于2M</p>
  </div>
</template>

<script>
import uploadImageFn from '@/utils/upload'
export default {
  components: {},
  props: { formInfo: Object },
  data() {
    var businessLicenseImg = (rule, value, callback) => {
      if (!value) {
        callback('请选择请选择结算银行类型所在省市')
      }
      callback()
    }
    return {
      defaultImg1: require('@/assets/imgs/bussiness-license.png'),
      defaultImg2: require('@/assets/imgs/bank-card.png'),
      defaultImg3: require('@/assets/imgs/id-card.png'),
      rulesShow: false,
      info: {
        license_url: '',
        legal_certid_front_url: '',
        legal_cert_id_back_url: '',
        bank_card_front_url: ''
      },
      accountRules: {}
    }
  },
  created() {
    if (this.formInfo) {
      const {
        license_url,
        legal_certid_front_url,
        legal_cert_id_back_url,
        bank_card_front_url
      } = this.formInfo
      this.info = {
        license_url,
        legal_certid_front_url,
        legal_cert_id_back_url,
        bank_card_front_url
      }
    }
  },
  computed: {},
  methods: {
    check() {
      console.log(this.info);
      if (!this.info.license_url ||
          !this.info.legal_certid_front_url ||
          !this.info.legal_cert_id_back_url ||
          !this.info.bank_card_front_url) {
        this.rulesShow = true;
        return;
      }
      this.$emit('resule', true, this.info)
    },
    // 上传图片
    clickUpLoad(index) {
      this.$refs[index].value = null
      this.$refs[index].click()
    },
    changeUpload(e, index) {
      let files = e.target.files
      console.log(files[0]);
      if (files.length > 1) {
        this.$Message.error('最多上传1张图片')
        return false
      }
      let fileEnd = files[0].name.substring(files[0].name.indexOf("."))
      // 类型
      if (fileEnd != '.jpg' && fileEnd != '.png' && fileEnd != '.jpeg') {
        this.$Message.error('图片类型错误')
        return false;
      }
      // 大小
      let size = files[0].size /1024 ;
      console.log(size);
      if (size > 2*1024) {
        this.$Message.error('上传图片不得大于2M')
        return false;
      } 
      //  上传图片
      uploadImageFn(e.target.files).then((imgs) => {
        console.log(imgs)
        // this.info.index = this.list[index].pics.concat(imgs)
        if (index == 'license_url') {
          this.info.license_url = imgs[0].url
        } else if (index == 'legal_certid_front_url') {
          this.info.legal_certid_front_url = imgs[0].url
        } else if (index == 'legal_cert_id_back_url') {
          this.info.legal_cert_id_back_url = imgs[0].url
        } else if (index == 'bank_card_front_url') {
          this.info.bank_card_front_url = imgs[0].url
        }
      })
    },
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped></style>
