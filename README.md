# SmartCopy - 智能复制粘贴增强插件

让 Obsidian 用户像在 VS Code 中一样，快速、精准地复制/粘贴/删除内容 —— 无需手动选中，支持上下文感知、格式化粘贴、快捷键控制。

![GitHub package.json version](https://img.shields.io/github/package-json/v/yourusername/obsidian-smartcopy)
![GitHub](https://img.shields.io/github/license/yourusername/obsidian-smartcopy)

## 功能特性

### 智能复制
- ✅ 复制当前行 (Ctrl+Alt+L)
- ✅ 复制当前段落 (Ctrl+Alt+P)
- ✅ 复制当前标题部分
- ✅ 复制当前代码块 (Ctrl+Alt+B)
- ✅ 智能复制 (Ctrl+Shift+C) - 根据上下文自动判断复制内容
- ✅ 表格行/列复制 (即将支持)

### 智能删除
- ✅ 删除当前行 (Ctrl+Alt+D)
- ✅ 删除当前段落 (Ctrl+Alt+X)
- ✅ 智能删除 (Ctrl+Shift+D) - 根据上下文自动判断删除内容

### 智能粘贴
- ✅ 粘贴为纯文本
- ✅ 粘贴为引用块
- ✅ 粘贴为待办列表项
- ✅ 粘贴为行内代码
- ✅ 自动格式化粘贴

### 自定义设置
- ✅ 可启用/禁用特定复制/删除模式
- ✅ 可自定义默认粘贴行为
- ✅ 可通过 Obsidian 快捷键设置自定义快捷键
- ✅ 状态栏提示显示

## 安装方法

### 从 Obsidian 社区插件市场安装（推荐）

1. 在 Obsidian 中打开设置
2. 进入 "社区插件" 选项卡
3. 禁用 "安全模式"
4. 点击 "浏览" 按钮搜索 "SmartCopy"
5. 找到插件后点击 "安装"
6. 安装完成后启用插件

### 手动安装

1. 下载最新版本的 `main.js`、`manifest.json` 和 `styles.css` 文件
2. 在你的 Obsidian 仓库中创建 `plugins/smartcopy/` 文件夹
3. 将下载的文件放入该文件夹中
4. 重新加载 Obsidian
5. 在设置中启用 SmartCopy 插件

## 使用方法

### 复制操作

1. **复制当前行**: 将光标放在要复制的行上，使用命令面板或快捷键复制当前行
2. **复制当前段落**: 将光标放在要复制的段落中，段落以空行分隔
3. **复制当前标题部分**: 将光标放在标题下的内容中，会复制到下一个同级标题前
4. **复制当前代码块**: 将光标放在代码块中，会复制整个代码块
5. **智能复制**: 根据光标位置自动判断复制内容

### 删除操作

1. **删除当前行**: 将光标放在要删除的行上，使用命令面板或快捷键删除当前行
2. **删除当前段落**: 将光标放在要删除的段落中，段落以空行分隔
3. **智能删除**: 根据光标位置自动判断删除内容

### 粘贴操作

1. **粘贴为纯文本**: 移除所有格式，只粘贴纯文本内容
2. **粘贴为引用块**: 将内容转换为 Markdown 引用格式
3. **粘贴为待办列表项**: 将内容转换为待办列表项
4. **粘贴为行内代码**: 将内容转换为行内代码或代码块

### 通过命令面板使用

1. 按 `Ctrl+P` (Windows/Linux) 或 `Cmd+P` (Mac) 打开命令面板
2. 搜索 "SmartCopy" 相关命令
3. 选择要执行的命令

## 设置选项

在 Obsidian 设置中可以找到 SmartCopy 的设置选项：

- **启用复制当前行**: 启用或禁用复制当前行功能
- **启用复制当前段落**: 启用或禁用复制当前段落功能
- **启用删除当前行**: 启用或禁用删除当前行功能
- **启用删除当前段落**: 启用或禁用删除当前段落功能
- **启用复制代码块**: 启用或禁用复制代码块功能
- **启用表格复制**: 启用或禁用表格复制功能
- **默认粘贴行为**: 设置默认的粘贴行为（纯文本、格式化、引用块）
- **粘贴时移除链接格式**: 在粘贴时自动移除链接格式，只保留文本
- **显示状态栏提示**: 在状态栏显示复制/粘贴操作提示

## 快捷键

可以通过 Obsidian 的快捷键设置来自定义以下命令的快捷键：

| 命令 | 默认快捷键 |
|------|------------|
| 智能复制 | Ctrl+Shift+C |
| 智能删除 | Ctrl+Shift+D |
| 复制当前行 | Ctrl+Alt+L |
| 删除当前行 | Ctrl+Alt+D |
| 复制当前段落 | Ctrl+Alt+P |
| 删除当前段落 | Ctrl+Alt+X |
| 复制当前代码块 | Ctrl+Alt+B |
| 粘贴为纯文本 | 无默认 |
| 粘贴为引用块 | 无默认 |

## 开发

### 克隆和安装

```bash
git clone https://github.com/yourusername/obsidian-smartcopy.git
cd obsidian-smartcopy
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

### 构建

```bash
pnpm run build
```

### 更新版本

```bash
pnpm run version 1.0.1
```

## 支持

如果你喜欢这个插件，请考虑通过以下方式支持我：

- 在 GitHub 上 star 本项目
- 在 Obsidian 插件市场中评价此插件
- 通过 Buy Me a Coffee 支持我

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个插件。

## 许可证

MIT License

---

Made with ❤️ for the Obsidian community