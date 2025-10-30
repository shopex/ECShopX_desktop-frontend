## Why
当前在 webpack 构建配置中通过 BannerPlugin 和 TerserPlugin 配置来在构建产物中保留开源标注，这些配置增加了构建复杂度，且在构建产物中的标注对最终用户不可见。改为在应用启动时通过控制台打印开源标注信息，既能保持开源信息的可见性，又能简化构建配置。

## What Changes
- **REMOVED**: 移除 `nuxt.config.js` 中所有与开源标注相关的 webpack 构建配置（BannerPlugin、TerserPlugin 的注释保留配置等）
- **ADDED**: 在应用启动时（`src/main.js`）添加控制台打印开源标注信息的功能
- 源代码文件中的许可证备注头保持不变

## Impact
- 影响规格: `code-standards` 规格需要更新构建相关要求
- 影响代码: 
  - `nuxt.config.js`: 移除约120行的 webpack 配置代码（第159-279行）
  - `src/main.js`: 添加启动时的控制台打印代码
- 用户体验: 应用启动时会在浏览器控制台看到开源标注信息，更加直观

