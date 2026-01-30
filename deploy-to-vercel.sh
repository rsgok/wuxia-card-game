#!/bin/bash

# 江湖行 - 一键部署到 Vercel 脚本

echo "=========================================="
echo "  江湖行 - 部署到 Vercel"
echo "=========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在 wuxia-card-game 目录下运行此脚本"
    exit 1
fi

echo "✅ 确认在项目目录"
echo ""

# 检查 Git 配置
GIT_EMAIL=$(git config user.email)
GIT_NAME=$(git config user.name)

if [ -z "$GIT_EMAIL" ]; then
    echo "⚙️  配置 Git 用户信息..."
    git config user.email "rsgok@users.noreply.github.com"
    git config user.name "rsgok"
    echo "✅ Git 配置完成"
    echo ""
fi

# 提交代码
echo "📦 准备提交代码..."
git add -A
git commit -m "准备部署到 Vercel" --quiet
echo "✅ 代码已提交"
echo ""

echo "=========================================="
echo "  接下来的步骤："
echo "=========================================="
echo ""
echo "步骤 1：在 GitHub 创建仓库"
echo "------------------------------"
echo "1. 访问这个链接创建仓库："
echo "   https://github.com/new"
echo ""
echo "2. 仓库名称填写：wuxia-card-game"
echo "3. 选择 Public（公开）"
echo "4. 点击 'Create repository'"
echo ""
echo "步骤 2：推送代码到 GitHub"
echo "------------------------------"
echo "执行以下命令："
echo ""
echo "git push -u origin main"
echo ""
echo "步骤 3：在 Vercel 部署"
echo "------------------------------"
echo "1. 访问：https://vercel.com"
echo "2. 用 GitHub 账号登录"
echo "3. 点击 'Add New Project'"
echo "4. 导入 rsgok/wuxia-card-game 仓库"
echo "5. 点击 'Deploy'"
echo ""
echo "等待部署完成后，你会得到一个类似这样的链接："
echo "   https://wuxia-card-game.vercel.app"
echo ""
echo "=========================================="
echo ""
