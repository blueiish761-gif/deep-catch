# Deep Catch

这是《深海捕手》的可部署版本：游戏前端 + 真实 AI 顾问后端代理。

本版本已经把 React、ReactDOM、Babel 放到 `vendor/` 目录，避免游戏因为 CDN 加载失败而白屏。

## 能不能只用 GitHub 静态托管？

不建议，也不安全。

GitHub Pages 只能托管静态文件。如果把 `OPENAI_API_KEY` 写进 `index.html` 或任何前端 JS，浏览器里任何玩家都能看到并复制你的密钥。

推荐方案：

1. GitHub 仓库存这些文件。
2. 前端仍然是 `index.html`。
3. AI 请求走 `/api/advisor.js` 这个后端代理。
4. 部署到 Vercel，并在 Vercel 环境变量里填写密钥。

这样 GitHub 仓库里没有真实密钥，网页玩家也看不到密钥。游戏仍然可以通过 GitHub 管理代码，但最终访问地址建议用 Vercel。

如果你坚持只用 GitHub Pages，AI 顾问不能安全地使用私密 API Key，只能保留本地静态假顾问或调用一个单独部署的后端地址。

## 部署到 Vercel

1. 把本目录文件提交到 GitHub 仓库。
2. 打开 Vercel，导入这个 GitHub 仓库。
3. 在 Vercel 项目的 Environment Variables 里添加：

```text
OPENAI_API_KEY=你的真实密钥
OPENAI_BASE_URL=https://ai-pixel.online
OPENAI_MODEL=gpt-5.5
ALLOWED_ORIGIN=*
```

4. 部署完成后打开 Vercel 给你的网址。

AI 顾问会收到当前游戏状态和完整游戏数据库摘要，包括鱼类、区域、装备、餐厅升级、员工、任务、节日和关键规则，因此可以回答攻略、功能提示、经营策略和下一步建议。

## 本地开发

先安装依赖：

```bash
npm install
```

复制 `.env.example` 为 `.env.local`，填入真实密钥，然后运行：

```bash
npm run dev
```

打开 Vercel CLI 显示的本地地址即可。

## 安全提醒

如果密钥曾经发到聊天、Issue、公开仓库或截图里，建议去服务商后台重置密钥，然后只把新密钥填到 Vercel 环境变量，不要提交到 GitHub。
