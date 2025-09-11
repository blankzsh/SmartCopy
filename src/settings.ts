import { App, PluginSettingTab, Setting, Notice } from 'obsidian';
import SmartCopyPlugin from './main';

export class SmartCopySettingTab extends PluginSettingTab {
  plugin: SmartCopyPlugin;

  constructor(app: App, plugin: SmartCopyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'SmartCopy 设置' });

    // 功能启用设置
    containerEl.createEl('h3', { text: '功能启用设置' });

    new Setting(containerEl)
      .setName('启用复制当前行')
      .setDesc('允许使用快捷键复制光标所在行')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableLineCopy)
        .onChange(async (value) => {
          this.plugin.settings.enableLineCopy = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用复制当前段落')
      .setDesc('允许使用快捷键复制当前段落')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableParagraphCopy)
        .onChange(async (value) => {
          this.plugin.settings.enableParagraphCopy = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用复制代码块')
      .setDesc('允许使用快捷键复制当前代码块')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableCodeBlockCopy)
        .onChange(async (value) => {
          this.plugin.settings.enableCodeBlockCopy = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用表格复制')
      .setDesc('允许复制表格行/列/单元格')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTableCopy)
        .onChange(async (value) => {
          this.plugin.settings.enableTableCopy = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用删除当前行')
      .setDesc('允许使用快捷键删除光标所在行')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableLineDelete)
        .onChange(async (value) => {
          this.plugin.settings.enableLineDelete = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('启用删除当前段落')
      .setDesc('允许使用快捷键删除当前段落')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableParagraphDelete)
        .onChange(async (value) => {
          this.plugin.settings.enableParagraphDelete = value;
          await this.plugin.saveSettings();
        }));

    // 粘贴设置
    containerEl.createEl('h3', { text: '粘贴设置' });

    new Setting(containerEl)
      .setName('默认粘贴行为')
      .setDesc('选择粘贴时的默认行为')
      .addDropdown(dropdown => dropdown
        .addOption('plain', '纯文本')
        .addOption('formatted', '格式化')
        .addOption('blockquote', '引用块')
        .setValue(this.plugin.settings.defaultPasteBehavior)
        .onChange(async (value: any) => {
          this.plugin.settings.defaultPasteBehavior = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('粘贴时移除链接格式')
      .setDesc('粘贴时自动移除链接格式，只保留文本')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.removeLinkFormattingOnPaste)
        .onChange(async (value) => {
          this.plugin.settings.removeLinkFormattingOnPaste = value;
          await this.plugin.saveSettings();
        }));

    // UI 设置
    containerEl.createEl('h3', { text: '界面设置' });

    new Setting(containerEl)
      .setName('显示状态栏提示')
      .setDesc('在状态栏显示复制/粘贴操作提示')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showStatusBarHints)
        .onChange(async (value) => {
          this.plugin.settings.showStatusBarHints = value;
          await this.plugin.saveSettings();
          // 更新状态栏显示
          if (value) {
            this.plugin.updateStatusBar('SmartCopy 已启用');
          } else {
            this.plugin.updateStatusBar('');
          }
        }));

    // 快捷键说明
    containerEl.createEl('h3', { text: '快捷键' });
    containerEl.createEl('p', { text: '可以通过 Obsidian 的 "设置" -> "快捷键" 来自定义以下命令的快捷键：' });
    
    const commands = [
      { id: 'smart-copy-keymap', name: '智能复制' },
      { id: 'smart-delete-keymap', name: '智能删除' },
      { id: 'copy-current-line', name: '复制当前行' },
      { id: 'delete-current-line', name: '删除当前行' },
      { id: 'copy-current-paragraph', name: '复制当前段落' },
      { id: 'delete-current-paragraph', name: '删除当前段落' },
      { id: 'copy-current-code-block', name: '复制当前代码块' },
      { id: 'paste-as-plain-text', name: '粘贴为纯文本' },
      { id: 'paste-as-block-quote', name: '粘贴为引用块' }
    ];

    // 注意：由于Obsidian API的限制，这里无法直接访问命令信息
    commands.forEach(command => {
      new Setting(containerEl)
        .setName(command.name)
        .setDesc('可通过快捷键设置自定义');
    });
  }
}