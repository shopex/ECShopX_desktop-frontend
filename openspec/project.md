# Project Context

## Purpose
EcShopX-PC 是一个基于 Nuxt.js 的电商前端项目，提供完整的电商购物体验，包括商品展示、购物车、订单管理、用户认证等功能。项目支持多语言、多主题定制，并集成了各种电商相关的第三方服务。

## Tech Stack
- **前端框架**: Nuxt.js 2.15.8 (Vue.js 2.7.10)
- **UI组件库**: Vant 2.0.2, 自定义组件库
- **样式处理**: SCSS, PostCSS
- **状态管理**: Vuex + vuex-persistedstate
- **国际化**: nuxt-i18n
- **HTTP客户端**: Axios
- **构建工具**: Webpack (通过Nuxt)
- **开发工具**: ESLint, Prettier, Husky
- **部署**: Docker, 支持多环境构建

## Project Conventions

### Code Style
- 使用 ESLint + Prettier 进行代码格式化
- Vue 组件使用单文件组件 (SFC) 格式
- SCSS 变量和混入统一管理在 `src/style/` 目录
- 组件命名使用 kebab-case
- 文件命名使用 kebab-case

### Architecture Patterns
- **页面级组件**: 放在 `src/pages/` 目录，遵循 Nuxt.js 约定
- **通用组件**: 放在 `src/components/` 目录
- **布局组件**: 放在 `src/layouts/` 目录
- **API层**: 统一放在 `src/api/` 目录
- **状态管理**: 按功能模块分割 store
- **样式**: 使用 SCSS，支持主题定制
- **自定义组件**: 支持 `custome/` 目录覆盖默认组件

### Testing Strategy
- 目前主要依赖手动测试
- 建议添加单元测试和端到端测试
- 使用 ESLint 进行代码质量检查

### Git Workflow
- 主分支: `feature/open-source`
- 使用 standard-version 进行版本管理
- 提交信息遵循约定式提交规范

## Domain Context
- **电商核心功能**: 商品展示、购物车、订单流程、支付集成
- **用户系统**: 注册、登录、个人信息管理、地址管理
- **多语言支持**: 中文、英文等多语言切换
- **主题定制**: 支持自定义主题和组件覆盖
- **移动端适配**: 响应式设计，支持移动端购物体验
- **SEO优化**: 服务端渲染，支持搜索引擎优化

## Important Constraints
- **浏览器兼容性**: 支持 IE9+ 和现代浏览器
- **性能要求**: 首屏加载时间优化，图片懒加载
- **安全性**: 用户数据保护，支付安全
- **多环境部署**: 支持开发、测试、生产环境
- **CDN集成**: 静态资源CDN加速

## External Dependencies
- **支付服务**: 集成多种支付方式
- **地图服务**: 腾讯地图API (地址选择)
- **分析服务**: Adobe Analytics, 百度统计
- **CDN服务**: 阿里云OSS (静态资源)
- **字体服务**: 阿里巴巴矢量图标库
- **社交分享**: 社交媒体分享功能
