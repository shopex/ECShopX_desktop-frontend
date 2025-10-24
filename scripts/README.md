# ECShopX 脚本管理规范

## 概述

本目录包含ECShopX项目的自动化脚本，用于管理许可证声明、代码质量检查等任务。

## 脚本规范

### 1. 命名规范
- 使用小写字母和连字符：`script-name.js`
- 功能描述性命名：`license-manager.js`、`code-formatter.js`
- 避免重复功能：不创建功能相近的脚本

### 2. 脚本结构
每个脚本应包含以下部分：
```javascript
#!/usr/bin/env node

/**
 * 脚本名称和描述
 * 详细说明脚本的功能和用途
 * 
 * 使用方法:
 *   node scripts/script-name.js [options]
 */

// 导入依赖
const fs = require('fs');
const path = require('path');

// 配置常量
const CONFIG = {
  // 配置项
};

// 功能函数
function processFile(filePath) {
  // 处理逻辑
}

// 主函数
function main() {
  // 主逻辑
}

// 执行脚本
if (require.main === module) {
  main();
}
```

### 3. 错误处理
- 使用 try-catch 包装文件操作
- 提供有意义的错误信息
- 记录处理失败的文件

### 4. 日志输出
- 使用统一的日志格式
- 显示处理进度和结果
- 区分成功、警告和错误信息

## 当前脚本

### license-manager.js
**功能**: 统一管理项目中的开源许可证声明

**使用方法**:
```bash
# 添加许可证声明
node scripts/license-manager.js add

# 清理重复声明
node scripts/license-manager.js clean

# 验证许可证声明
node scripts/license-manager.js validate

# 移除许可证声明
node scripts/license-manager.js remove
```

**支持的文件类型**:
- `.js` - JavaScript文件
- `.vue` - Vue组件文件
- `.scss` - SCSS样式文件
- `.css` - CSS样式文件

## 已废弃的脚本

以下脚本已被 `license-manager.js` 替代，请勿使用：

- `add-license-headers.js` - 功能已整合到 license-manager.js
- `clean-duplicate-comments.js` - 功能已整合到 license-manager.js
- `clean-duplicate-license-headers.js` - 功能已整合到 license-manager.js
- `clean-duplicates.js` - 功能已整合到 license-manager.js
- `fix-all-css-comments.js` - 功能已整合到 license-manager.js
- `fix-css-comments.js` - 功能已整合到 license-manager.js

## 开发规范

### 1. 创建新脚本前
- 检查是否已有类似功能的脚本
- 考虑是否可以扩展现有脚本
- 避免功能重复

### 2. 脚本维护
- 定期检查脚本的有效性
- 更新配置和依赖
- 删除不再使用的脚本

### 3. 文档更新
- 新脚本需要更新此文档
- 废弃脚本需要标记并说明替代方案
- 保持文档与代码同步

## 许可证声明

所有脚本文件都应包含ECShopX开源许可证声明，使用 `license-manager.js` 工具自动添加。
