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

<script>
import WidgetWrapper from './widget-wrapper'
import Widgets from './src'

export default {
  name: 'SpWidget',

  inject: {
    themeIsEditing: {
      default: false
    }
  },

  props: {
    info: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default () {
        return this.themeIsEditing
      }
    }
  },

  render (h) {
    const { params, ...config } = this.info
    config.widgets_type = config.widgets_type.replace(/_/g, '-')
    const Widget = Widgets[config.widgets_type]
    // console.log(Widget, config.widgets_type)

    return (
      this.isEdit
        ? (
          <WidgetWrapper
            config={config}
          >
            <Widget params={params}>{this.$slots.default}</Widget>
          </WidgetWrapper>
        )
        : <Widget params={params}>{this.$slots.default}</Widget>

    )
  }
}
</script>
