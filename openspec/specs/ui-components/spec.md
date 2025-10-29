## ADDED Requirements

### Requirement: 开源标识组件
系统SHALL在页面底部提供简化的开源标识展示功能，只显示powered-logo.png图片，居中展示。

#### Scenario: 简化标识显示
- **WHEN** 用户访问任何页面
- **THEN** 页面底部居中显示powered-logo.png图片，无额外样式和文字

#### Scenario: 响应式适配
- **WHEN** 用户在不同设备上访问页面
- **THEN** 图片在不同屏幕尺寸下保持居中显示和合适的尺寸

#### Scenario: 布局兼容性
- **WHEN** 简化的开源标识添加到Footer中
- **THEN** 不影响现有页面布局和样式，只显示图片内容

### Requirement: Footer集成开源标识
SpFooter组件SHALL集成开源标识组件，确保在所有页面布局中正确显示。

#### Scenario: Footer显示开源标识
- **WHEN** 页面使用SpFooter组件
- **THEN** Footer底部居中显示开源标识

#### Scenario: 标识内容展示
- **WHEN** 开源标识组件被渲染
- **THEN** 标识只显示powered-logo.png图片，无额外装饰
