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

import Message from "./index.vue";
import Vue from "vue";

// const prefixCls = 'sp-message'

Message.newInstance = properties => {
  const _props = properties || {};
  const Instance = new Vue({
    data: Object.assign({}, _props, {
      visible: false,
      width: 416
    }),
    render(h) {
      return h(Message, {
        props: Object.assign({}, _props, {
          message: this.message
        })
      });
    },
    computed: {},
    methods: {
      remove() {
        this.destroy();
      },
      destroy() {
        this.$destroy();
        setTimeout( () => {
          document.body.removeChild(this.$el);
        }, 5)
        
        this.onRemove();
      },
      onOk() {},
      onCancel() {},
      onRemove() {}
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const message = Instance.$children[0];

  return {
    show(props) {
      message.$parent.onRemove = props.onRemove;
      message.visible = true;
    },
    remove() {
      // message.visible = false
      message.$parent.remove();
    },
    component: message
  };
};

export default Message;
