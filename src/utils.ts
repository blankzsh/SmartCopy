// 工具函数，用于处理SmartCopy的各种复制粘贴操作

export class SmartCopyUtils {
  // 获取当前段落的边界
  static getCurrentParagraphBounds(lines: string[], cursorLine: number): { start: number; end: number } {
    // 向前查找段落开始
    let startLine = cursorLine;
    while (startLine > 0 && lines[startLine - 1].trim() !== '') {
      startLine--;
    }
    
    // 向后查找段落结束
    let endLine = cursorLine;
    while (endLine < lines.length - 1 && lines[endLine + 1].trim() !== '') {
      endLine++;
    }
    
    return { start: startLine, end: endLine };
  }

  // 获取当前代码块的边界
  static getCurrentCodeBlockBounds(lines: string[], cursorLine: number): { start: number; end: number } | null {
    // 向前查找代码块开始
    let startLine = cursorLine;
    while (startLine >= 0 && !lines[startLine].trim().startsWith('```')) {
      startLine--;
    }
    
    // 如果没找到代码块开始，说明不在代码块内
    if (startLine < 0) {
      return null;
    }
    
    // 向后查找代码块结束
    let endLine = cursorLine;
    while (endLine < lines.length && !lines[endLine].trim().startsWith('```')) {
      endLine++;
    }
    
    // 如果没找到代码块结束
    if (endLine >= lines.length) {
      return null;
    }
    
    return { start: startLine, end: endLine };
  }

  // 获取当前标题部分的边界
  static getCurrentHeadingSectionBounds(lines: string[], cursorLine: number): { start: number; end: number } {
    // 查找当前标题
    let startLine = cursorLine;
    while (startLine >= 0 && !lines[startLine].trim().startsWith('#')) {
      startLine--;
    }
    
    // 如果没找到标题，从文档开始
    if (startLine < 0) {
      startLine = 0;
    }
    
    // 查找下一个同级或上级标题
    let endLine = cursorLine;
    const currentHeadingLevel = lines[startLine].match(/^#+/)?.[0].length || 0;
    
    for (let i = startLine + 1; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^#+/);
      if (headingMatch) {
        const headingLevel = headingMatch[0].length;
        if (headingLevel <= currentHeadingLevel) {
          endLine = i - 1;
          break;
        }
      }
      endLine = i;
    }
    
    return { start: startLine, end: endLine };
  }

  // 检查光标是否在表格内
  static isCursorInTable(lines: string[], cursorLine: number): boolean {
    // 向前查找表格开始
    let startLine = cursorLine;
    while (startLine >= 0 && !lines[startLine].includes('|')) {
      startLine--;
    }
    
    // 向后查找表格结束
    let endLine = cursorLine;
    while (endLine < lines.length && lines[endLine].includes('|')) {
      endLine++;
    }
    
    // 如果找到了表格边界，说明光标在表格内
    return startLine >= 0 && endLine < lines.length;
  }

  // 获取表格行/列信息
  static getTableInfo(lines: string[], cursorLine: number): { 
    start: number; 
    end: number; 
    row: number; 
    col: number; 
    data: string[][] 
  } | null {
    // 查找表格边界
    let tableStart = cursorLine;
    while (tableStart >= 0 && lines[tableStart].includes('|')) {
      tableStart--;
    }
    tableStart++; // 回到表格第一行
    
    let tableEnd = cursorLine;
    while (tableEnd < lines.length && lines[tableEnd].includes('|')) {
      tableEnd++;
    }
    tableEnd--; // 回到表格最后一行
    
    // 解析表格数据
    const tableData: string[][] = [];
    for (let i = tableStart; i <= tableEnd; i++) {
      // 分割表格行，移除首尾的|并按|分割
      const row = lines[i].split('|').map(cell => cell.trim()).filter((_, index, arr) => index > 0 && index < arr.length - 1);
      tableData.push(row);
    }
    
    // 查找光标所在的行和列
    let cursorRow = -1;
    let cursorCol = -1;
    
    for (let i = 0; i < tableData.length; i++) {
      // 这里简化处理，实际需要更精确地确定光标位置
      if (tableStart + i === cursorLine) {
        cursorRow = i;
        cursorCol = 0; // 简化处理
        break;
      }
    }
    
    if (cursorRow === -1) {
      return null;
    }
    
    return {
      start: tableStart,
      end: tableEnd,
      row: cursorRow,
      col: cursorCol,
      data: tableData
    };
  }

  // 移除HTML标签，保留纯文本
  static stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // 转换为引用块
  static convertToBlockquote(text: string): string {
    return text.split('\n').map(line => `> ${line}`).join('\n');
  }

  // 转换为待办列表项
  static convertToTodoList(text: string): string {
    return text.split('\n').map(line => `- [ ] ${line}`).join('\n');
  }

  // 转换为行内代码
  static convertToInlineCode(text: string): string {
    // 如果只有一行且较短，使用行内代码
    if (text.includes('\n') === false && text.length < 50) {
      return `\`${text}\``;
    }
    // 否则使用代码块
    return `\`\`\`\n${text}\n\`\`\``;
  }
}