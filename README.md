# ECShopX 开源商城系统

ECShopX 是一个基于 Nuxt.js 的现代化电商前端项目，提供完整的电商购物体验。

## 开源许可证

本项目采用 Apache License 2.0 开源许可证，详情请查看 [LICENSE](LICENSE) 文件。

## 技术栈

- **前端框架**: Nuxt.js 2.15.8 (Vue.js 2.7.10)
- **样式处理**: SCSS, PostCSS
- **状态管理**: Vuex + vuex-persistedstate
- **国际化**: nuxt-i18n
- **HTTP客户端**: Axios

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 启动生产环境
```bash
npm run start
```

## 项目结构

```
src/
├── api/           # API接口层
├── components/    # 通用组件
├── layouts/       # 布局组件
├── pages/         # 页面组件
├── plugins/       # 插件配置
├── store/         # 状态管理
├── style/         # 样式文件
└── utils/         # 工具函数
```

## 开源贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 版权信息

Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.

未经授权不可去除shopeX商派相关版权信息。

## 开发指南

### 开发命令

```bash
# 开发环境启动
npm run dev

# 指定环境启动
npm run dev:stage    # 测试环境
npm run dev:release  # 预发布环境
npm run dev:uat      # UAT环境

# 代码检查
npm run lint

# 版本管理
npm run start-release

# 文件上传
npm run upload
```

### 环境配置

复制环境变量配置文件：
```bash
# 开发环境
cp .env.example .env.development

# 生产环境
cp .env.example .env.production
```

## 项目目录结构

```
ecshopx-pc/
├── src/                          # 源代码目录
│   ├── api/                      # API接口层
│   │   ├── activity.js           # 活动相关API
│   │   ├── auth.js              # 认证相关API
│   │   ├── cart.js              # 购物车API
│   │   ├── item.js              # 商品API
│   │   ├── member.js            # 会员API
│   │   ├── trade.js             # 交易API
│   │   └── user.js              # 用户API
│   ├── assets/                   # 静态资源
│   │   ├── fonts/               # 字体文件
│   │   ├── imgs/                # 图片资源
│   │   ├── lang/                # 语言文件
│   │   └── messages/            # 国际化消息
│   ├── components/              # 通用组件
│   │   ├── sp-header/           # 页面头部组件
│   │   ├── sp-footer/           # 页面底部组件
│   │   ├── sp-button/           # 按钮组件
│   │   ├── sp-input/            # 输入框组件
│   │   ├── sp-modal/            # 模态框组件
│   │   ├── sp-loading/          # 加载组件
│   │   ├── open-source-badge/   # 开源标识组件
│   │   └── ...                  # 其他组件
│   ├── layouts/                 # 布局组件
│   │   ├── default.vue          # 默认布局
│   │   ├── auth_layout.vue      # 认证布局
│   │   ├── shop_layout.vue      # 商城布局
│   │   └── template_layout.vue  # 模板布局
│   ├── pages/                   # 页面组件
│   │   ├── index.vue            # 首页
│   │   ├── auth/                # 认证页面
│   │   ├── cart/                # 购物车页面
│   │   ├── items/               # 商品页面
│   │   ├── member/              # 会员页面
│   │   └── ...                  # 其他页面
│   ├── plugins/                 # 插件配置
│   │   ├── axios.js             # HTTP客户端
│   │   ├── analytics.js         # 数据分析
│   │   └── ...                  # 其他插件
│   ├── store/                   # 状态管理
│   │   ├── index.js             # Store入口
│   │   ├── user.js              # 用户状态
│   │   ├── cart.js              # 购物车状态
│   │   └── ...                  # 其他状态
│   ├── style/                   # 样式文件
│   │   ├── index.scss           # 主样式文件
│   │   ├── _variables.scss       # 变量定义
│   │   └── _mixins.scss         # 混入定义
│   └── utils/                   # 工具函数
│       ├── index.js             # 工具函数入口
│       ├── cookie.js            # Cookie操作
│       ├── storage.js           # 存储操作
│       └── ...                  # 其他工具
├── custome/                     # 自定义覆盖
│   ├── components/              # 自定义组件
│   ├── layouts/                 # 自定义布局
│   └── pages/                   # 自定义页面
├── nuxt/                        # Nuxt配置
├── openspec/                    # 规格文档
├── public/                      # 公共资源
├── scripts/                     # 脚本文件
├── nuxt.config.js               # Nuxt配置文件
├── package.json                 # 项目配置
└── README.md                    # 项目说明
```

## 通用组件说明

### 📦 布局组件
- **sp-header**: 页面头部组件，包含Logo、导航菜单、搜索框、用户中心、购物车等功能模块
- **sp-footer**: 页面底部组件，包含开源标识、友情链接、版权信息等
- **auth-header**: 认证页面头部，用于登录、注册等页面
- **shop-header**: 店铺头部组件，用于店铺相关页面
- **layout-hoc**: 布局高阶组件，提供统一的页面布局封装

### 🎨 基础UI组件
- **sp-button**: 按钮组件，支持多种样式(primary/success/warning/danger/default)、尺寸(large/medium/small)、状态(loading/disabled)、块级/圆角/阴影等
- **sp-input**: 输入框组件，支持文本、数字、密码、搜索等类型，内置验证和格式化功能
- **sp-radio**: 单选框组件，支持单个和分组选择，自定义样式
- **sp-select**: 下拉选择器，支持单选和多选
- **radio-group**: 单选框组
- **num-input**: 数字输入组件
- **point-photo-zoom**: 积分商品图片缩放
- **point-price**: 积分价格显示
- **label**: 标签组件
- **sp-price**: 价格显示组件，支持原价、现价、划线等样式
- **sp-point-price**: 积分价格显示组件

### 🗂️ 数据展示组件
- **sp-pagination**: 分页组件，支持多种分页模式（数字、简单、完整）
- **sp-breadcrumb**: 面包屑导航
- **steps**: 步骤条组件，用于展示流程步骤
- **point-tag**: 积分标签组件
- **grid**: 网格布局，包含row/col组件

### 🔔 反馈组件
- **sp-modal**: 模态框组件，支持确认对话框、自定义内容、全屏等，提供Plugin方式调用
- **sp-loading**: 加载组件，支持全屏遮罩和局部加载，可自定义文字和样式，提供Plugin和Directive方式
- **message**: 消息提示组件，支持success/error/warning/info类型，提供Plugin方式调用
- **toast**: Toast提示组件
- **alert**: 警告提示框组件
- **tip-message**: 提示消息组件，用于加载中和空状态提示

### 🖼️ 图片和媒体组件
- **sp-img**: 图片组件，支持懒加载、占位符、尺寸裁剪、CDN优化
- **sp-photo-zoom**: 图片缩放组件，支持点击放大查看
- **social-share**: 社交分享组件，支持微信、微博、QQ等平台

### 🛒 电商业务组件
- **sp-goods-card**: 商品卡片组件，显示商品图片、标题、价格、促销标签等
- **sp-goods-info**: 商品详情信息组件，包含商品信息、SKU选择、库存等
- **sp-sku-picker**: SKU选择器，用于商品规格选择（颜色、尺寸等）
- **sp-fastbuy**: 快速购买组件
- **mini-cart**: 迷你购物车组件
- **sku-selector**: SKU选择器
- **sku-point-selector**: 积分商品SKU选择器
- **goods-item**: 商品条目组件，用于列表展示
- **goods-recommend**: 商品推荐组件
- **item-promo**: 商品促销展示组件

### 📝 表单组件
- **sp-form**: 表单组件，支持验证规则、提交、重置等功能
- **sp-form-item**: 表单项组件，配合sp-form使用
- **sp-input-select**: 输入选择器，结合输入和选择功能
- **sp-datepicker**: 日期选择器，支持年月日、年月日时分秒等格式
- **sp-point-num-input**: 积分数量输入组件
- **address-picker**: 地址选择器，支持省市区三级联动
- **address-picker1**: 地址选择器(优化版)
- **sp-address**: 地址组件

### 🔍 导航和搜索组件
- **sp-search**: 搜索组件，支持联想、历史记录、热门搜索等功能
- **poptip**: 弹出提示组件
- **float-menu**: 浮动菜单组件，支持多个菜单项和信息面板
- **link**: 链接组件，支持路由跳转
- **sp-btn-picker**: 按钮选择器
- **sp-btn-picker-group**: 按钮选择器组

### 🛠️ 工具类组件
- **sp-template**: 模板组件，用于可视化编辑
- **sp-scroll-loading**: 滚动加载组件，支持下拉刷新和上拉加载
- **collapse**: 折叠面板组件
- **layer**: 图层组件，用于遮罩层
- **sp-dptransition**: 动画过渡组件
- **timer**: 倒计时组件，用于验证码倒计时等场景
- **analytics**: 数据分析组件，集成埋点统计
- **rate**: 评分组件，用于商品评价

### 🎯 其他功能组件
- **staff-badge**: 员工徽章组件
- **open-source-badge**: 开源标识组件

### 🎨 模板组件
- **film**: 视频模板组件
- **heading**: 标题模板组件
- **slider**: 轮播模板组件
- **writing**: 图文模板组件

## 环境变量配置

项目支持多种环境变量配置，主要包括：

- **应用配置**: VUE_APP_TITLE, VUE_APP_API_BASE_URL, VUE_APP_COMPANYID
- **第三方服务**: Adobe Analytics, 百度统计, 腾讯地图API等
- **构建环境**: BUILD_ENV, VUE_APP_TEMPLATE
- **功能开关**: VUE_APP_ENABLE_ANALYTICS等

详细的环境变量说明请查看 `.env.example` 文件。

## 部署指南

### 生产部署
```bash
# 1. 构建项目
npm run build

# 2. 上传文件（如果需要）
npm run upload

# 3. 启动服务
npm run start
```

### 容器化部署
项目提供了 Dockerfile，可以使用 Docker 进行部署：
```bash
# 构建镜像
docker build -t ecshopx-pc .

# 运行容器
docker run -p 3000:3000 ecshopx-pc
```

### PM2 进程管理
项目提供了 ecosystem.config.js 配置文件，可以使用 PM2 管理进程：
```bash
pm2 start ecosystem.config.js
```

## 更新日志

### 2025-10-24
- ✅ **开源化完成**: 项目已完全开源，所有源代码文件已添加Apache License 2.0许可证声明
- ✅ **代码标准化**: 建立了统一的代码标准，包括许可证头部格式规范
- ✅ **脚本管理**: 创建了统一的许可证管理工具，支持添加、验证、清理和移除许可证声明
- ✅ **构建验证**: 项目构建成功，所有样式文件已恢复正常
- ✅ **开源标识**: 添加了开源标识组件，在页面底部展示项目开源信息