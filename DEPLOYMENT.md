# 部署指南

## 方法一：部署到 Vercel（推荐）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库，命名为 `wuxia-card-game`
3. 选择 Public（公开）或 Private（私有）
4. 点击"Create repository"

### 步骤 2：推送代码到 GitHub

在项目目录执行以下命令：

```bash
cd wuxia-card-game
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/wuxia-card-game.git
git branch -M main
git push -u origin main
```

### 步骤 3：在 Vercel 部署

1. 访问 https://vercel.com
2. 注册或登录 Vercel 账号
3. 点击"Add New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测项目配置
6. 点击"Deploy"

部署完成后，Vercel 会提供一个访问链接，如：`https://wuxia-card-game.vercel.app`

## 方法二：部署到 GitHub Pages（免费）

### 步骤 1：创建 GitHub 仓库

同方法一步骤 1

### 步骤 2：推送代码到 GitHub

同方法一步骤 2

### 步骤 3：启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 进入 Settings → Pages
3. 在"Source"下选择"main"分支
4. 点击"Save"

GitHub Pages 会自动部署，访问链接为：
`https://你的用户名.github.io/wuxia-card-game/`

## 方法三：部署到 Netlify（免费）

### 步骤 1：创建 GitHub 仓库

同方法一步骤 1

### 步骤 2：推送代码到 GitHub

同方法一步骤 2

### 步骤 3：在 Netlify 部署

1. 访问 https://app.netlify.com/drop
2. 将项目文件夹拖拽到上传区域
3. 等待部署完成

Netlify 会提供一个访问链接

## 方法四：本地预览

如果你想本地预览，可以使用 Python 自带的 HTTP 服务器：

```bash
cd wuxia-card-game
python3 -m http.server 8080
```

然后在浏览器中访问：`http://localhost:8080`

## 注意事项

1. 确保 `index.html` 在项目根目录
2. 所有 JS 和 CSS 文件的路径正确
3. Vercel 和 GitHub Pages 都支持 HTTPS
4. 免费额度：Vercel（100GB/月）、GitHub Pages（无限）、Netlify（100GB/月）

## 推荐选择

- **Vercel**：速度最快，CDN 全球覆盖，推荐使用
- **GitHub Pages**：完全免费，适合个人项目
- **Netlify**：易用性强，拖拽部署

## 自定义域名

如果你有自己的域名，可以在部署平台配置自定义域名，如：`game.yourdomain.com`

---

**需要帮助？** 告诉臣你想用哪种方式，臣可以提供更详细的指导！
