import { Plugin, Editor } from 'obsidian';
import { SmartCopySettingTab } from './settings';
import { SmartCopyUtils } from './utils';
import { DEFAULT_SETTINGS, SmartCopySettings } from './types';

export default class SmartCopyPlugin extends Plugin {
  settings: SmartCopySettings;
  statusBar: HTMLElement;

  async onload() {
    console.log('Loading SmartCopy plugin');

    await this.loadSettings();

    // 添加设置选项卡
    this.addSettingTab(new SmartCopySettingTab(this.app, this));

    // 添加状态栏项目
    this.statusBar = this.addStatusBarItem();
    this.statusBar.addClass('smartcopy-status-bar');
    this.updateStatusBar('SmartCopy 已加载');

    // 注册编辑器命令
    this.registerEditorCommands();
    
    // 注册快捷键
    this.registerKeymaps();
  }

  onunload() {
    console.log('Unloading SmartCopy plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  updateStatusBar(text: string) {
    if (this.settings.showStatusBarHints) {
      this.statusBar.setText(text);
    }
  }

  showNotification(message: string) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'smartcopy-notification';
    notification.textContent = message;
    
    // 添加到文档中
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  registerEditorCommands() {
    // 复制当前行
    this.addCommand({
      id: 'copy-current-line',
      name: '复制当前行',
      editorCallback: (editor, view) => {
        if (this.settings.enableLineCopy) {
          this.copyCurrentLine(editor);
        }
      }
    });

    // 复制当前段落
    this.addCommand({
      id: 'copy-current-paragraph',
      name: '复制当前段落',
      editorCallback: (editor, view) => {
        if (this.settings.enableParagraphCopy) {
          this.copyCurrentParagraph(editor);
        }
      }
    });

    // 复制当前标题部分
    this.addCommand({
      id: 'copy-current-heading-section',
      name: '复制当前标题部分',
      editorCallback: (editor, view) => {
        this.copyCurrentHeadingSection(editor);
      }
    });

    // 复制当前代码块
    this.addCommand({
      id: 'copy-current-code-block',
      name: '复制当前代码块',
      editorCallback: (editor, view) => {
        if (this.settings.enableCodeBlockCopy) {
          this.copyCurrentCodeBlock(editor);
        }
      }
    });

    // 智能复制（根据上下文自动判断）
    this.addCommand({
      id: 'smart-copy',
      name: '智能复制',
      editorCallback: (editor, view) => {
        this.smartCopy(editor);
      }
    });

    // 粘贴为纯文本
    this.addCommand({
      id: 'paste-as-plain-text',
      name: '粘贴为纯文本',
      editorCallback: (editor, view) => {
        this.pasteAsPlainText(editor);
      }
    });

    // 粘贴为引用块
    this.addCommand({
      id: 'paste-as-block-quote',
      name: '粘贴为引用块',
      editorCallback: (editor, view) => {
        this.pasteAsBlockQuote(editor);
      }
    });

    // 粘贴为待办列表项
    this.addCommand({
      id: 'paste-as-todo-list',
      name: '粘贴为待办列表项',
      editorCallback: (editor, view) => {
        this.pasteAsTodoList(editor);
      }
    });

    // 粘贴为行内代码
    this.addCommand({
      id: 'paste-as-inline-code',
      name: '粘贴为行内代码',
      editorCallback: (editor, view) => {
        this.pasteAsInlineCode(editor);
      }
    });

    // 删除当前行
    this.addCommand({
      id: 'delete-current-line',
      name: '删除当前行',
      editorCallback: (editor, view) => {
        if (this.settings.enableLineDelete) {
          this.deleteCurrentLine(editor);
        }
      }
    });

    // 删除当前段落
    this.addCommand({
      id: 'delete-current-paragraph',
      name: '删除当前段落',
      editorCallback: (editor, view) => {
        if (this.settings.enableParagraphDelete) {
          this.deleteCurrentParagraph(editor);
        }
      }
    });

    // 智能删除（根据上下文自动判断）
    this.addCommand({
      id: 'smart-delete',
      name: '智能删除',
      editorCallback: (editor, view) => {
        this.smartDelete(editor);
      }
    });
  }

  registerKeymaps() {
    // 注册快捷键
    this.addCommand({
      id: 'smart-copy-keymap',
      name: '智能复制（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "c" }],
      editorCallback: (editor, view) => {
        this.smartCopy(editor);
      }
    });

    this.addCommand({
      id: 'smart-delete-keymap',
      name: '智能删除（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "d" }],
      editorCallback: (editor, view) => {
        this.smartDelete(editor);
      }
    });

    this.addCommand({
      id: 'copy-line-keymap',
      name: '复制当前行（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Alt"], key: "l" }],
      editorCallback: (editor, view) => {
        if (this.settings.enableLineCopy) {
          this.copyCurrentLine(editor);
        }
      }
    });

    this.addCommand({
      id: 'delete-line-keymap',
      name: '删除当前行（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Alt"], key: "d" }],
      editorCallback: (editor, view) => {
        if (this.settings.enableLineDelete) {
          this.deleteCurrentLine(editor);
        }
      }
    });

    this.addCommand({
      id: 'copy-paragraph-keymap',
      name: '复制当前段落（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Alt"], key: "p" }],
      editorCallback: (editor, view) => {
        if (this.settings.enableParagraphCopy) {
          this.copyCurrentParagraph(editor);
        }
      }
    });

    this.addCommand({
      id: 'delete-paragraph-keymap',
      name: '删除当前段落（快捷键）',
      hotkeys: [{ modifiers: ["Mod", "Alt"], key: "x" }],
      editorCallback: (editor, view) => {
        if (this.settings.enableParagraphDelete) {
          this.deleteCurrentParagraph(editor);
        }
      }
    });
  }

  copyCurrentLine(editor: Editor) {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    navigator.clipboard.writeText(line);
    this.updateStatusBar('已复制当前行');
    this.showNotification('已复制当前行到剪贴板');
  }

  copyCurrentParagraph(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    const bounds = SmartCopyUtils.getCurrentParagraphBounds(lines, cursor.line);
    const paragraph = lines.slice(bounds.start, bounds.end + 1).join('\n');
    
    navigator.clipboard.writeText(paragraph);
    this.updateStatusBar('已复制当前段落');
    this.showNotification('已复制当前段落到剪贴板');
  }

  copyCurrentHeadingSection(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    const bounds = SmartCopyUtils.getCurrentHeadingSectionBounds(lines, cursor.line);
    const section = lines.slice(bounds.start, bounds.end + 1).join('\n');
    
    navigator.clipboard.writeText(section);
    this.updateStatusBar('已复制当前标题部分');
    this.showNotification('已复制当前标题部分到剪贴板');
  }

  copyCurrentCodeBlock(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    const bounds = SmartCopyUtils.getCurrentCodeBlockBounds(lines, cursor.line);
    if (!bounds) {
      this.showNotification('光标不在代码块内');
      return;
    }
    
    const codeBlock = lines.slice(bounds.start, bounds.end + 1).join('\n');
    navigator.clipboard.writeText(codeBlock);
    this.updateStatusBar('已复制当前代码块');
    this.showNotification('已复制当前代码块到剪贴板');
  }

  smartCopy(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    // 检查是否在代码块内
    const codeBlockBounds = SmartCopyUtils.getCurrentCodeBlockBounds(lines, cursor.line);
    if (codeBlockBounds) {
      this.copyCurrentCodeBlock(editor);
      return;
    }
    
    // 检查是否在表格内
    if (SmartCopyUtils.isCursorInTable(lines, cursor.line)) {
      // TODO: 实现表格复制功能
      this.copyCurrentParagraph(editor);
      return;
    }
    
    // 检查是否在标题行
    const currentLine = lines[cursor.line].trim();
    if (currentLine.startsWith('#')) {
      this.copyCurrentHeadingSection(editor);
      return;
    }
    
    // 默认复制当前段落
    this.copyCurrentParagraph(editor);
  }

  async pasteAsPlainText(editor: Editor) {
    try {
      const text = await navigator.clipboard.readText();
      // 移除HTML标签，只保留纯文本
      let plainText = SmartCopyUtils.stripHtml(text);
      
      // 根据设置决定是否移除链接格式
      if (this.settings.removeLinkFormattingOnPaste) {
        plainText = plainText.replace(/\$\$[^\$\$]*\$\$/g, '');
      }
      
      editor.replaceSelection(plainText);
      this.updateStatusBar('已粘贴为纯文本');
      this.showNotification('已粘贴为纯文本');
    } catch (err) {
      console.error('粘贴失败:', err);
      this.showNotification('粘贴失败');
    }
  }

  async pasteAsBlockQuote(editor: Editor) {
    try {
      const text = await navigator.clipboard.readText();
      const quotedText = SmartCopyUtils.convertToBlockquote(text);
      editor.replaceSelection(quotedText);
      this.updateStatusBar('已粘贴为引用块');
      this.showNotification('已粘贴为引用块');
    } catch (err) {
      console.error('粘贴失败:', err);
      this.showNotification('粘贴失败');
    }
  }

  async pasteAsTodoList(editor: Editor) {
    try {
      const text = await navigator.clipboard.readText();
      const todoText = SmartCopyUtils.convertToTodoList(text);
      editor.replaceSelection(todoText);
      this.updateStatusBar('已粘贴为待办列表项');
      this.showNotification('已粘贴为待办列表项');
    } catch (err) {
      console.error('粘贴失败:', err);
      this.showNotification('粘贴失败');
    }
  }

  async pasteAsInlineCode(editor: Editor) {
    try {
      const text = await navigator.clipboard.readText();
      const codeText = SmartCopyUtils.convertToInlineCode(text);
      editor.replaceSelection(codeText);
      this.updateStatusBar('已粘贴为代码');
      this.showNotification('已粘贴为代码');
    } catch (err) {
      console.error('粘贴失败:', err);
      this.showNotification('粘贴失败');
    }
  }

  deleteCurrentLine(editor: Editor) {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    
    // 删除整行
    editor.setSelection(
      { line: cursor.line, ch: 0 },
      { line: cursor.line, ch: line.length }
    );
    editor.replaceSelection('');
    
    this.updateStatusBar('已删除当前行');
    this.showNotification('已删除当前行');
  }

  deleteCurrentParagraph(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    const bounds = SmartCopyUtils.getCurrentParagraphBounds(lines, cursor.line);
    
    // 删除整个段落
    const startPos = { line: bounds.start, ch: 0 };
    const endLine = lines[bounds.end];
    const endPos = { line: bounds.end, ch: endLine.length };
    
    editor.setSelection(startPos, endPos);
    editor.replaceSelection('');
    
    this.updateStatusBar('已删除当前段落');
    this.showNotification('已删除当前段落');
  }

  smartDelete(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    // 检查是否在代码块内
    const codeBlockBounds = SmartCopyUtils.getCurrentCodeBlockBounds(lines, cursor.line);
    if (codeBlockBounds) {
      // 在代码块内，删除整行
      this.deleteCurrentLine(editor);
      return;
    }
    
    // 检查是否在表格内
    if (SmartCopyUtils.isCursorInTable(lines, cursor.line)) {
      // 在表格内，删除整行
      this.deleteCurrentLine(editor);
      return;
    }
    
    // 检查是否在标题行
    const currentLine = lines[cursor.line].trim();
    if (currentLine.startsWith('#')) {
      // 在标题行，删除整个标题部分
      this.deleteCurrentHeadingSection(editor);
      return;
    }
    
    // 默认删除当前段落
    this.deleteCurrentParagraph(editor);
  }

  deleteCurrentHeadingSection(editor: Editor) {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    const lines = content.split('\n');
    
    const bounds = SmartCopyUtils.getCurrentHeadingSectionBounds(lines, cursor.line);
    
    // 删除整个标题部分
    const startPos = { line: bounds.start, ch: 0 };
    const endLine = lines[bounds.end];
    const endPos = { line: bounds.end, ch: endLine.length };
    
    editor.setSelection(startPos, endPos);
    editor.replaceSelection('');
    
    this.updateStatusBar('已删除当前标题部分');
    this.showNotification('已删除当前标题部分');
  }
}