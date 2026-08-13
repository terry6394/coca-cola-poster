# Coca-Cola Poster — 交接说明 / Handover

> 这是一个由 firstmate 代理执行的 **SCOUT 研究任务** 的产出与交接节点。今天是第一阶段：研究 + 视觉方向规划。真正的代码实现尚未开始，等待你（captain）选定方向。

---

## 今天完成了什么

1. **公开网络调研**  
   - 收集了高质量的品牌/编辑海报网站与单页 HTML 体验参考（Awwwards、One Page Love、Codrops 等）。
   - 整理了可口可乐官方品牌/历史资料（2026 全球视觉识别系统更新、轮廓瓶历史、红色来源等）。
   - 所有来源都已在 `docs/RESEARCH.md` 中列出，并区分了“官方资料”与“第三方灵感”。

2. **三个可执行的视觉方向**  
   - **A. Heritage Poster（传统海报 / 瑞士印刷编辑风格）**：推荐方向。红白黑 + Georgia Green，Playfair + Inter，滚动揭示 + 微视差。
   - **B. Dynamic Ribbon（动态丝带）**：高能量、Canvas/SVG 丝带与气泡，复杂度高。
   - **C. Brutalist Pop（粗野主义拼贴）**：重叠色块、跑马灯、高对比，中等复杂度。
   - 详细对比见 `docs/RESEARCH.md` 第 5–6 节。

3. **Lavish 评审页面**  
   - 已生成交互式 HTML 评审稿：`docs/visual-direction-plan.html`。
   - 在线评审地址：**http://127.0.0.1:4387/session/cdf81e6981de8e0b**（需本地 Lavish 服务正在运行；若服务已关闭，可直接打开 `docs/visual-direction-plan-export.html` 这个自包含版本）。
   - 页面内有单选框、下拉菜单和提交按钮，可直接选定方向并反馈给代理。

4. **决策挂起（decision hold）**  
   已注册三个需要你最终决定的项：
   - `creative-direction`：选择 A / B / C 方向。
   - `asset-sourcing`：瓶身图形等素材来源（原创 SVG / 你提供 / 授权图库）。
   - `motion-ambition`：动态层级（推荐滚动揭示 + 视差 / 仅静态海报 + 微交互 / 最大化动态）。

---

## 文件位置

| 文件 | 位置 | 说明 |
|------|------|------|
| 完整研究报告 | `docs/RESEARCH.md` | 调研、三个方向、推荐、实施计划、版权边界、测试矩阵 |
| Lavish 评审原稿 | `docs/visual-direction-plan.html` | 需要 Lavish 服务器 |
| 自包含评审稿 | `docs/visual-direction-plan-export.html` | 可直接用浏览器打开，无需服务器 |
| 本交接说明 | `README.md` | 你正在看的文件 |

---

## 明天怎么继续

### 方式一：在 Lavish 里直接选（推荐）
1. 打开本地链接：http://127.0.0.1:4387/session/cdf81e6981de8e0b
2. 在页面底部选择方向、素材来源、动态层级，点击 **Submit direction to agent**。
3. 代理会收到你的选择，并在 firstmate 中关闭对应决策，随后开始实现。

如果 Lavish 服务已经关闭，直接打开 `docs/visual-direction-plan-export.html`，然后在聊天里告诉代理你的选择即可。

### 方式二：直接在聊天里回复
回复类似：
> “选择 A. Heritage Poster，素材用原创 SVG，动态用推荐滚动揭示 + 视差。”

代理会根据你的选择继续。

---

## 重要提醒

- **代码实现还没开始**。今天只交付了研究和计划。
- **没有复制任何可口可乐受版权保护的素材或字体**。任何实现都会使用原创 SVG、开源字体（如 Playfair Display、Inter）和明显的非商业/非官方声明。
- 若你选择 **B. Dynamic Ribbon** 或 **C. Brutalist Pop**，需要更多时间，且需要你在可访问性与视觉冲击力之间做权衡。

---

## GitHub 仓库

- 远程：`https://github.com/terry6394/coca-cola-poster.git`
- 当前分支：`main`
- 第一版提交内容：本交接说明 + 研究报告 + Lavish 评审稿。
