export interface SmartCopySettings {
  enableLineCopy: boolean;
  enableParagraphCopy: boolean;
  enableCodeBlockCopy: boolean;
  enableTableCopy: boolean;
  enableLineDelete: boolean;
  enableParagraphDelete: boolean;
  defaultPasteBehavior: 'plain' | 'formatted' | 'blockquote';
  showStatusBarHints: boolean;
  removeLinkFormattingOnPaste: boolean;
}

export const DEFAULT_SETTINGS: SmartCopySettings = {
  enableLineCopy: true,
  enableParagraphCopy: true,
  enableCodeBlockCopy: true,
  enableTableCopy: true,
  enableLineDelete: true,
  enableParagraphDelete: true,
  defaultPasteBehavior: 'formatted',
  showStatusBarHints: true,
  removeLinkFormattingOnPaste: false,
};