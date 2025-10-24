#!/usr/bin/env node

/**
 * ECShopX 许可证管理工具
 * 统一管理项目中的开源许可证声明
 * 
 * 使用方法:
 *   node scripts/license-manager.js add        # 添加许可证声明
 *   node scripts/license-manager.js clean      # 清理重复声明
 *   node scripts/license-manager.js validate   # 验证许可证声明
 *   node scripts/license-manager.js remove     # 移除许可证声明
 */

const fs = require('fs');
const path = require('path');

// 许可证配置
const LICENSE_CONFIG = {
  // 许可证头部内容
  header: `/* +----------------------------------------------------------------------
 * | ECShopX open source E-commerce
 * | ECShopX 开源商城系统 
 * +----------------------------------------------------------------------
 * | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
 * +----------------------------------------------------------------------
 * | Corporate Website:  https://www.shopex.cn 
 * +----------------------------------------------------------------------
 * | Licensed under the Apache License, Version 2.0
 * | http://www.apache.org/licenses/LICENSE-2.0
 * +----------------------------------------------------------------------
 * | The removal of shopeX copyright information without authorization is prohibited.
 * | 未经授权不可去除shopeX商派相关版权
 * +----------------------------------------------------------------------
 * | Author: shopeX Team <mkt@shopex.cn>
 * | Contact: 400-821-3106
 * +----------------------------------------------------------------------
 */`,

  // 支持的文件类型和对应的注释格式
  fileTypes: {
    '.js': {
      comment: '//',
      header: `// +----------------------------------------------------------------------
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

`
    },
    '.vue': {
      comment: '<!--',
      header: `<!--
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

`
    },
    '.scss': {
      comment: '/*',
      header: `/* +----------------------------------------------------------------------
 * | ECShopX open source E-commerce
 * | ECShopX 开源商城系统 
 * +----------------------------------------------------------------------
 * | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
 * +----------------------------------------------------------------------
 * | Corporate Website:  https://www.shopex.cn 
 * +----------------------------------------------------------------------
 * | Licensed under the Apache License, Version 2.0
 * | http://www.apache.org/licenses/LICENSE-2.0
 * +----------------------------------------------------------------------
 * | The removal of shopeX copyright information without authorization is prohibited.
 * | 未经授权不可去除shopeX商派相关版权
 * +----------------------------------------------------------------------
 * | Author: shopeX Team <mkt@shopex.cn>
 * | Contact: 400-821-3106
 * +----------------------------------------------------------------------
 */`
    },
    '.css': {
      comment: '/*',
      header: `/* +----------------------------------------------------------------------
 * | ECShopX open source E-commerce
 * | ECShopX 开源商城系统 
 * +----------------------------------------------------------------------
 * | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
 * +----------------------------------------------------------------------
 * | Corporate Website:  https://www.shopex.cn 
 * +----------------------------------------------------------------------
 * | Licensed under the Apache License, Version 2.0
 * | http://www.apache.org/licenses/LICENSE-2.0
 * +----------------------------------------------------------------------
 * | The removal of shopeX copyright information without authorization is prohibited.
 * | 未经授权不可去除shopeX商派相关版权
 * +----------------------------------------------------------------------
 * | Author: shopeX Team <mkt@shopex.cn>
 * | Contact: 400-821-3106
 * +----------------------------------------------------------------------
 */`
    }
  },

  // 需要处理的目录
  targetDirs: ['src'],
  
  // 需要跳过的目录
  skipDirs: ['node_modules', '.nuxt', '.git', 'dist', 'build']
};

// 获取文件类型配置
function getFileTypeConfig(filePath) {
  const ext = path.extname(filePath);
  return LICENSE_CONFIG.fileTypes[ext];
}

// 检查文件是否已有许可证声明
function hasLicenseHeader(content, fileType) {
  if (!fileType) return false;
  
  const patterns = [
    'ECShopX open source E-commerce',
    'Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved',
    'Author: shopeX Team'
  ];
  
  return patterns.some(pattern => content.includes(pattern));
}

// 添加许可证声明
function addLicenseHeader(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileType = getFileTypeConfig(filePath);
    
    if (!fileType) {
      console.log(`跳过不支持的文件类型: ${filePath}`);
      return;
    }
    
    if (hasLicenseHeader(content, fileType)) {
      console.log(`文件已有许可证声明: ${filePath}`);
      return;
    }
    
    const newContent = fileType.header + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ 已添加许可证声明: ${filePath}`);
    
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
  }
}

// 清理重复的许可证声明
function cleanDuplicateHeaders(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileType = getFileTypeConfig(filePath);
    
    if (!fileType) return;
    
    // 计算许可证头部出现的次数
    const matches = content.split(fileType.header.trim());
    const count = matches.length - 1;
    
    if (count > 1) {
      console.log(`处理文件: ${filePath} (发现 ${count} 个重复声明)`);
      
      // 移除所有许可证声明
      let cleanedContent = content.replace(new RegExp(fileType.header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
      
      // 清理多余的空行
      cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      // 在文件开头添加一个许可证声明
      cleanedContent = fileType.header + cleanedContent.trim();
      
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ 已清理重复声明: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
  }
}

// 验证许可证声明
function validateLicenseHeader(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileType = getFileTypeConfig(filePath);
    
    if (!fileType) return;
    
    const hasHeader = hasLicenseHeader(content, fileType);
    const status = hasHeader ? '✅' : '❌';
    console.log(`${status} ${filePath}`);
    
    return hasHeader;
    
  } catch (error) {
    console.error(`验证文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

// 移除许可证声明
function removeLicenseHeader(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileType = getFileTypeConfig(filePath);
    
    if (!fileType) return;
    
    if (!hasLicenseHeader(content, fileType)) {
      console.log(`文件没有许可证声明: ${filePath}`);
      return;
    }
    
    // 移除许可证声明
    let cleanedContent = content.replace(new RegExp(fileType.header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
    cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, cleanedContent.trim(), 'utf8');
    console.log(`✅ 已移除许可证声明: ${filePath}`);
    
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error.message);
  }
}

// 递归处理目录
function processDirectory(dirPath, action) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!LICENSE_CONFIG.skipDirs.includes(item) && !item.startsWith('.')) {
        processDirectory(fullPath, action);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (Object.keys(LICENSE_CONFIG.fileTypes).includes(ext)) {
        action(fullPath);
      }
    }
  }
}

// 主函数
function main() {
  const command = process.argv[2];
  const srcDir = path.join(__dirname, '..', 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('src 目录不存在');
    return;
  }
  
  console.log(`ECShopX 许可证管理工具 - 执行操作: ${command}`);
  console.log('='.repeat(50));
  
  switch (command) {
    case 'add':
      console.log('添加许可证声明...');
      processDirectory(srcDir, addLicenseHeader);
      break;
      
    case 'clean':
      console.log('清理重复的许可证声明...');
      processDirectory(srcDir, cleanDuplicateHeaders);
      break;
      
    case 'validate':
      console.log('验证许可证声明...');
      let validCount = 0;
      let totalCount = 0;
      processDirectory(srcDir, (filePath) => {
        totalCount++;
        if (validateLicenseHeader(filePath)) {
          validCount++;
        }
      });
      console.log(`\n验证结果: ${validCount}/${totalCount} 个文件有许可证声明`);
      break;
      
    case 'remove':
      console.log('移除许可证声明...');
      processDirectory(srcDir, removeLicenseHeader);
      break;
      
    default:
      console.log(`
使用方法:
  node scripts/license-manager.js add        # 添加许可证声明
  node scripts/license-manager.js clean     # 清理重复声明
  node scripts/license-manager.js validate  # 验证许可证声明
  node scripts/license-manager.js remove    # 移除许可证声明
      `);
      break;
  }
  
  console.log('操作完成！');
}

main();
