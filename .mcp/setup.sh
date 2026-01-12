#!/bin/bash

# MCP Configuration Setup Script
# This script helps you quickly set up MCP server configurations for your AI tools

set -e

echo "🚀 MCP Server Configuration Setup"
echo "=================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Detect platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="mac"
    CLINE_DIR="$HOME/Library/Application Support/Code/User/globalStorage/ebay.ebay-cline/settings"
    CLAUDE_DIR="$HOME/Library/Application Support/Claude"
    VSCODE_DIR="$HOME/Library/Application Support/Code/User"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux"
    CLINE_DIR="$HOME/.config/Code/User/globalStorage/ebay.ebay-cline/settings"
    CLAUDE_DIR="$HOME/.config/Claude"
    VSCODE_DIR="$HOME/.config/Code/User"
else
    PLATFORM="windows"
    print_error "Windows detected. Please manually copy configuration files."
    echo "See .mcp/SETUP_GUIDE.md for Windows-specific instructions."
    exit 1
fi

INTELLIJ_DIR="$HOME/.config/github-copilot/intellij"

echo "Platform detected: $PLATFORM"
echo ""

# Ask which tool to configure
echo "Which AI tool would you like to configure?"
echo "1) Claude Desktop App"
echo "2) VS Code with Cline Extension"
echo "3) VS Code Settings (Global)"
echo "4) IntelliJ IDEA with GitHub Copilot"
echo "5) All of the above"
echo ""
read -p "Enter your choice (1-5): " choice

setup_claude() {
    echo ""
    echo "📱 Setting up Claude Desktop App..."
    
    if [ -d "$CLAUDE_DIR" ]; then
        print_warning "Claude config directory exists"
    else
        mkdir -p "$CLAUDE_DIR"
        print_success "Created Claude config directory"
    fi
    
    if [ -f "$CLAUDE_DIR/claude_desktop_config.json" ]; then
        print_warning "Existing configuration found at $CLAUDE_DIR/claude_desktop_config.json"
        read -p "Backup existing config? (y/n): " backup
        if [ "$backup" = "y" ]; then
            cp "$CLAUDE_DIR/claude_desktop_config.json" "$CLAUDE_DIR/claude_desktop_config.backup.json"
            print_success "Backed up to claude_desktop_config.backup.json"
        fi
    fi
    
    cp .mcp/claude_desktop_config.example.json "$CLAUDE_DIR/claude_desktop_config.json"
    print_success "Copied configuration template"
    
    echo ""
    print_warning "⚠️  IMPORTANT: Edit $CLAUDE_DIR/claude_desktop_config.json"
    echo "   Replace placeholders with your actual values:"
    echo "   - jdoe → Your username"
    echo "   - jdoe@ebay.com → Your eBay email"
    echo "   - API tokens → Your actual tokens"
}

setup_cline() {
    echo ""
    echo "💻 Setting up VS Code with Cline..."
    
    if [ -d "$CLINE_DIR" ]; then
        print_warning "Cline config directory exists"
    else
        mkdir -p "$CLINE_DIR"
        print_success "Created Cline config directory"
    fi
    
    if [ -f "$CLINE_DIR/cline_mcp_settings.json" ]; then
        print_warning "Existing configuration found at $CLINE_DIR/cline_mcp_settings.json"
        read -p "Backup existing config? (y/n): " backup
        if [ "$backup" = "y" ]; then
            cp "$CLINE_DIR/cline_mcp_settings.json" "$CLINE_DIR/cline_mcp_settings.backup.json"
            print_success "Backed up to cline_mcp_settings.backup.json"
        fi
    fi
    
    cp .mcp/cline_mcp_settings.template.json "$CLINE_DIR/cline_mcp_settings.json"
    print_success "Copied configuration template"
    
    echo ""
    print_warning "⚠️  IMPORTANT: Edit $CLINE_DIR/cline_mcp_settings.json"
    echo "   Replace placeholders with your actual values:"
    echo "   - YOUR_USERNAME → Your username"
    echo "   - YOUR_EMAIL@ebay.com → Your eBay email"
    echo "   - REPLACE_WITH_YOUR_* → Your actual tokens"
}

setup_vscode_settings() {
    echo ""
    echo "⚙️  Setting up VS Code Global Settings..."

    if [ ! -d "$VSCODE_DIR" ]; then
        print_error "VS Code User directory not found at $VSCODE_DIR"
        echo "Please ensure VS Code is installed."
        return 1
    fi

    if [ -f "$VSCODE_DIR/settings.json" ]; then
        print_warning "Existing settings.json found at $VSCODE_DIR/settings.json"
        read -p "Backup existing settings? (y/n): " backup
        if [ "$backup" = "y" ]; then
            cp "$VSCODE_DIR/settings.json" "$VSCODE_DIR/settings.backup.json"
            print_success "Backed up to settings.backup.json"
        fi

        echo ""
        read -p "Merge with existing settings or replace completely? (merge/replace): " merge_choice
        if [ "$merge_choice" = "merge" ]; then
            print_warning "Manual merge required. Template copied to $VSCODE_DIR/vscode_settings.template.json"
            echo "   Please manually merge the settings from vscode_settings.template.json into your settings.json"
            cp .mcp/vscode_settings.template.json "$VSCODE_DIR/vscode_settings.template.json"
            print_success "Template copied for manual merge"
            return 0
        fi
    fi

    cp .mcp/vscode_settings.template.json "$VSCODE_DIR/settings.json"
    print_success "Copied VS Code settings"

    echo ""
    print_success "✓ VS Code settings configured!"
    echo "   Settings include:"
    echo "   - eBay proxy configuration"
    echo "   - GitHub Enterprise setup"
    echo "   - GitHub Copilot optimizations"
    echo "   - Claude Code authentication"
}

setup_intellij() {
    echo ""
    echo "🧠 Setting up IntelliJ IDEA with GitHub Copilot..."

    if [ -d "$INTELLIJ_DIR" ]; then
        print_warning "IntelliJ Copilot config directory exists"
    else
        mkdir -p "$INTELLIJ_DIR"
        print_success "Created IntelliJ Copilot config directory"
    fi

    if [ -f "$INTELLIJ_DIR/mcp.json" ]; then
        print_warning "Existing configuration found at $INTELLIJ_DIR/mcp.json"
        read -p "Backup existing config? (y/n): " backup
        if [ "$backup" = "y" ]; then
            cp "$INTELLIJ_DIR/mcp.json" "$INTELLIJ_DIR/mcp.backup.json"
            print_success "Backed up to mcp.backup.json"
        fi
    fi

    cp .mcp/intellij_mcp_settings.template.json "$INTELLIJ_DIR/mcp.json"
    print_success "Copied configuration template"

    echo ""
    print_warning "⚠️  IMPORTANT: Edit $INTELLIJ_DIR/mcp.json"
    echo "   Replace placeholders with your actual values:"
    echo "   - YOUR_USERNAME → Your username"
    echo "   - YOUR_EMAIL@ebay.com → Your eBay email"
    echo "   - REPLACE_WITH_YOUR_* → Your actual tokens"
}

# Execute based on choice
case $choice in
    1)
        setup_claude
        ;;
    2)
        setup_cline
        ;;
    3)
        setup_vscode_settings
        ;;
    4)
        setup_intellij
        ;;
    5)
        setup_claude
        setup_cline
        setup_vscode_settings
        setup_intellij
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "=================================="
print_success "Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Edit the configuration file(s) to add your API tokens"
echo "   2. See .mcp/SETUP_GUIDE.md for detailed instructions"
echo "   3. See .mcp/CONFIGURATION_EXAMPLES.md for configuration examples"
echo "   4. Restart your AI tool after editing the configuration"
echo ""
echo "🔑 Get your API tokens:"
echo "   - GitHub: https://github.corp.ebay.com/settings/tokens"
echo "   - Confluence: https://wiki.corp.ebay.com/"
echo "   - JIRA: https://jirap.corp.ebay.com/secure/ViewProfile.jspa"
echo ""
print_warning "⚠️  Never commit your actual API tokens to git!"
echo ""
