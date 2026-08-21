# 小氵AI — Personal Digital Workshop

用 AI，把想法做成真正能用的东西。

## 开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

后台：[http://localhost:3000/admin.html](http://localhost:3000/admin.html)

## 部署到 Netlify

1. 把项目推到 GitHub / GitLab / Bitbucket  
2. 打开 [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**  
3. 选仓库后确认构建设置（`netlify.toml` 已写好）：
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy，等构建完成即可拿到站点域名

内容更新流程（推荐）：

1. 本地 `npm run dev`，打开 `/admin.html` 改文案 / 上传图片  
2. 保存后提交 `content/store.json` 和 `public/` 里的新图  
3. Push，Netlify 自动重新部署  

说明：Netlify 函数环境是只读的，线上后台不能持久保存或上传；前台内容来自仓库里的 JSON 与图片。

## 技术栈

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion / GSAP
- Lucide React

## 内容数据

- `content/store.json` — 后台可编辑的站点内容（前台实际读取）
- `data/*.ts` — 默认回退数据
