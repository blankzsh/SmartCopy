# SmartCopy - Smart Copy Paste Enhancement Plugin

Let Obsidian users quickly and accurately copy/paste/delete content like in VS Code — without manual selection, with context awareness, formatted paste, and shortcut controls.

![GitHub package.json version](https://img.shields.io/github/package-json/v/Blankzsh/SmartCopy)
![GitHub](https://img.shields.io/github/license/Blankzsh/SmartCopy)

[中文版 README](README_zh.md)

## Features

### Smart Copy
- ✅ Copy current line (Ctrl+Alt+L)
- ✅ Copy current paragraph (Ctrl+Alt+P)
- ✅ Copy current heading section
- ✅ Copy current code block (Ctrl+Alt+B)
- ✅ Smart copy (Ctrl+Shift+C) - Automatically determine content to copy based on context
- ✅ Table row/column copy (coming soon)

### Smart Delete
- ✅ Delete current line (Ctrl+Alt+D)
- ✅ Delete current paragraph (Ctrl+Alt+X)
- ✅ Smart delete (Ctrl+Shift+D) - Automatically determine content to delete based on context

### Smart Paste
- ✅ Paste as plain text
- ✅ Paste as quote block
- ✅ Paste as todo list item
- ✅ Paste as inline code
- ✅ Automatic formatted paste

### Customization
- ✅ Enable/disable specific copy/delete modes
- ✅ Customize default paste behavior
- ✅ Set custom shortcuts via Obsidian's shortcut settings
- ✅ Status bar notification display

## Installation

### Install from Obsidian Community Plugin Marketplace (Recommended)

1. Open Settings in Obsidian
2. Go to the "Community Plugins" tab
3. Disable "Safe Mode"
4. Click the "Browse" button and search for "SmartCopy"
5. Find the plugin and click "Install"
6. Enable the plugin after installation

### Manual Installation

1. Download the latest `main.js`, `manifest.json`, and `styles.css` files
2. Create a `plugins/smartcopy/` folder in your Obsidian vault
3. Place the downloaded files in that folder
4. Reload Obsidian
5. Enable the SmartCopy plugin in Settings

## Usage

### Copy Operations

1. **Copy Current Line**: Place cursor on the line to copy, use command palette or shortcut to copy current line
2. **Copy Current Paragraph**: Place cursor in the paragraph to copy (paragraphs separated by blank lines)
3. **Copy Current Heading Section**: Place cursor in content under a heading, will copy to before the next same-level heading
4. **Copy Current Code Block**: Place cursor in code block, will copy the entire code block
5. **Smart Copy**: Automatically determine content to copy based on cursor position

### Delete Operations

1. **Delete Current Line**: Place cursor on the line to delete, use command palette or shortcut to delete current line
2. **Delete Current Paragraph**: Place cursor in the paragraph to delete (paragraphs separated by blank lines)
3. **Smart Delete**: Automatically determine content to delete based on cursor position

### Paste Operations

1. **Paste as Plain Text**: Remove all formatting, paste only plain text content
2. **Paste as Quote Block**: Convert content to Markdown quote format
3. **Paste as Todo List Item**: Convert content to todo list item
4. **Paste as Inline Code**: Convert content to inline code or code block

### Using Command Palette

1. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac) to open command palette
2. Search for "SmartCopy" related commands
3. Select the command to execute

## Settings Options

You can find SmartCopy settings options in Obsidian Settings:

- **Enable Copy Current Line**: Enable or disable copy current line feature
- **Enable Copy Current Paragraph**: Enable or disable copy current paragraph feature
- **Enable Delete Current Line**: Enable or disable delete current line feature
- **Enable Delete Current Paragraph**: Enable or disable delete current paragraph feature
- **Enable Copy Code Block**: Enable or disable copy code block feature
- **Enable Table Copy**: Enable or disable table copy feature
- **Default Paste Behavior**: Set default paste behavior (plain text, formatted, quote block)
- **Remove Link Formatting When Pasting**: Automatically remove link formatting when pasting, keep only text
- **Show Status Bar Notifications**: Display copy/paste operation notifications in status bar

## Shortcuts

You can customize shortcuts for the following commands via Obsidian's shortcut settings:

| Command | Default Shortcut |
|---------|------------------|
| Smart Copy | Ctrl+Shift+C |
| Smart Delete | Ctrl+Shift+D |
| Copy Current Line | Ctrl+Alt+L |
| Delete Current Line | Ctrl+Alt+D |
| Copy Current Paragraph | Ctrl+Alt+P |
| Delete Current Paragraph | Ctrl+Alt+X |
| Copy Current Code Block | Ctrl+Alt+B |
| Paste as Plain Text | No default |
| Paste as Quote Block | No default |

## Development

### Clone and Install

```bash
git clone https://github.com/Blankzsh/SmartCopy.git
cd SmartCopy
pnpm install
```

### Development Mode

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Update Version

```bash
pnpm run version 1.0.1
```

## Support

If you like this plugin, please consider supporting me through:

- Starring this project on GitHub
- Rating this plugin in the Obsidian plugin marketplace
- Supporting me via Buy Me a Coffee

## Contributing

Feel free to submit Issues and Pull Requests to help improve this plugin.

## License

MIT License

---

Made with ❤️ for the Obsidian community