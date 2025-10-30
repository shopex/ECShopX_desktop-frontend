## MODIFIED Requirements

### Requirement: Open Source License Information Display
项目必须在应用启动时向用户展示开源许可证信息。

#### Scenario: 应用启动打印开源信息
- **WHEN** 应用在浏览器中启动
- **THEN** 在浏览器控制台打印包含版权、许可证和联系方式的开源标注信息

#### Scenario: 打印信息包含必要元素
- **WHEN** 应用启动
- **THEN** 控制台输出包含：项目名称、版权信息、许可证类型、官方网站、联系方式

## REMOVED Requirements

### Requirement: 构建产物中的开源标注 Banner
**Reason**: 构建产物中的 Banner 标注对最终用户不可见，增加构建复杂度
**Migration**: 不再需要在 webpack 配置中使用 BannerPlugin 添加标注，改为运行时控制台打印

#### Scenario: Webpack BannerPlugin 配置
- **WHEN** 构建应用
- **THEN** 不再在构建产物中强制添加开源标注 Banner

#### Scenario: 压缩器保留注释配置
- **WHEN** 配置 TerserPlugin 和 CSS 压缩器
- **THEN** 不再需要特殊配置来保留开源相关的注释

