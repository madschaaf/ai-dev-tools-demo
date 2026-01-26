# Inline Text Formatting - Word-Style Editing

## Overview
The Custom Steps Editor now features Word-style inline text formatting, allowing users to select text and apply formatting directly within the step description or additional details fields.

## Features

### 🎨 Inline Formatting Toolbar
When you select text in any step field, a floating toolbar appears with formatting options:

- **Bold** (`**text**`) - Makes text bold
- **Italic** (`*text*`) - Makes text italic  
- **Code** (`` `code` ``) - Formats as inline code
- **Link** (`[text](url)`) - Creates a clickable hyperlink
- **Highlight** (`==text==`) - Highlights text with yellow background

### 📝 How to Use

1. **Type your text** in the step description or additional details field
2. **Select the text** you want to format (drag to highlight)
3. **Click a format button** from the floating toolbar
4. **See the result** instantly in the live preview

### 🔗 Creating Links

1. Select the text you want to turn into a link
2. Click the 🔗 Link button
3. Enter the URL in the prompt dialog
4. The text becomes a clickable link in the preview

### ⌨️ Keyboard Workflow

The inline formatting works seamlessly with the existing keyboard shortcuts:

- **Enter**: Create new step
- **Shift+Enter**: Line break within step
- **Select text + Format button**: Apply inline formatting
- Continue typing normally after formatting

### 📊 Markdown Rendering

The editor uses markdown syntax for formatting:

| Format | Markdown | Rendered |
|--------|----------|----------|
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Code | `` `code` `` | `code` |
| Link | `[text](url)` | [text](url) |
| Highlight | `==text==` | ==text== |

### 🎯 Use Cases

#### 1. Emphasizing Important Words
```markdown
Make sure to **always** backup your data before proceeding.
```

#### 2. Inline Commands
```markdown
Run the `npm install` command in your terminal.
```

#### 3. Adding Reference Links
```markdown
For more details, see the [official documentation](https://example.com).
```

#### 4. Highlighting Critical Info
```markdown
==Warning==: This action cannot be undone.
```

#### 5. Mixed Formatting
```markdown
**Important**: Run `git pull` before pushing. See [Git Guide](https://git-scm.com) for ==more tips==.
```

### 🔄 Live Preview

The right-side preview panel shows exactly how your formatted text will appear:

- **Bold text** appears in strong weight
- *Italic text* appears slanted
- `Code snippets` appear in monospace with gray background
- [Links](url) appear in blue and underlined
- ==Highlights== appear with yellow background

### 💡 Best Practices

1. **Use formatting sparingly** - Too much formatting reduces readability
2. **Bold for emphasis** - Highlight key terms and important concepts
3. **Code for commands** - Use inline code for terminal commands and file names
4. **Links for resources** - Add helpful references without cluttering text
5. **Highlights for warnings** - Draw attention to critical information

### 🎭 Comparison: Inline vs Block Formatting

| Feature | Inline Formatting | Advanced Customization (Block) |
|---------|-------------------|-------------------------------|
| Use Case | Within paragraphs | Separate sections |
| Activation | Select text | Add content blocks |
| Examples | **bold**, `code` | Code blocks, callouts |
| Best For | Emphasis, small snippets | Complete code, detailed notes |

### 🚀 Workflow Example

Creating a Git setup step:

```markdown
1. Type: "Install Git using the official installer"
2. Select "Git" → Click Bold → Now: "Install **Git** using the official installer"
3. Select "official installer" → Click Link → Enter URL
4. Add details: "Run `git --version` to verify installation"
5. Select "git --version" → Click Code
6. Result in preview: Run `git --version` to verify installation
```

### 🔧 Technical Details

#### Components
- **RichTextEditor**: Handles text selection and toolbar display
- **MarkdownRenderer**: Parses and renders markdown in preview
- **CustomStepsEditor**: Integrates both components

#### Data Flow
1. User selects text in RichTextEditor
2. Floating toolbar appears with format options
3. User clicks format button
4. Markdown syntax wraps selected text
5. MarkdownRenderer displays formatted result in preview

### 🎨 Visual Design

The floating toolbar:
- Appears above selected text
- Dark theme (#333) for visibility
- Smooth fade-in animation
- Hover effects on buttons
- Disappears when clicking outside

### 📱 Responsive Behavior

- Toolbar positions dynamically based on text selection
- Works with scrolling
- Adapts to different viewport sizes
- Mobile-friendly (larger touch targets needed for mobile)

### 🔮 Future Enhancements

Potential additions:
- Strikethrough formatting
- Underline formatting
- Color picker for text
- Font size adjustments
- Undo/redo for formatting
- Keyboard shortcuts (Ctrl+B for bold, etc.)
- Markdown preview mode toggle
- Copy formatted text

### 🐛 Troubleshooting

**Toolbar doesn't appear**
- Make sure you've selected text (not just clicked)
- Try selecting more text (minimum characters may apply)

**Formatting looks wrong in preview**
- Check markdown syntax is correct
- Ensure closing tags match opening tags
- Verify URLs in links are properly formatted

**Can't click toolbar buttons**
- Toolbar may be positioned off-screen
- Try selecting text in middle of field
- Check z-index issues with other UI elements

### 📚 Related Documentation

- [Custom Steps Editor](CUSTOM_STEPS_EDITOR.md)
- [Markdown Renderer Component](../src/components/MarkdownRenderer.tsx)
- [Rich Text Editor Component](../src/components/RichTextEditor.tsx)
