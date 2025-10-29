## Why
简化开源标识实现，只需要在页面底部居中展示powered-logo.png图片，不需要额外的样式、文字和复杂布局。

## What Changes
- 简化OpenSourceBadge组件，只显示图片
- 移除渐变背景、文字内容和复杂样式
- 保持图片居中显示
- 保持响应式适配

## Impact
- Affected specs: ui-components (简化开源标识组件)
- Affected code: src/components/open-source-badge/index.vue
- 所有使用SpFooter的布局都会显示简化的开源标识
