# 智慧园区 3D 数字孪生平台

基于 Vite + React 18 + TypeScript + Three.js 的 3D 智慧园区可视化展示系统。

## 功能特性

- **3D 鸟瞰模型**：园区全景 3D 模型，包含办公楼、厂房、研发中心、综合楼、绿化带和道路
- **交互操作**：鼠标旋转、缩放、点击建筑查看详情
- **建筑信息面板**：点击建筑弹出信息面板，显示楼栋名称、楼层总数、入驻企业和入驻率
- **楼层布局视图**：进入某栋楼内部查看各楼层布局和入驻情况
- **数据面板**：底部展示园区整体数据（入驻率、能耗、停车位、公告）
- **视角切换**：支持鸟瞰视角、平视视角切换
- **楼栋导航**：左侧楼栋列表，点击直接飞到对应位置，选中建筑高亮显示

## 技术栈

- **Vite 5** — 构建工具
- **React 18** — UI 框架
- **TypeScript** — 类型安全
- **@react-three/fiber** — React Three.js 封装
- **@react-three/drei** — Three.js 辅助组件
- **three.js** — 3D 渲染引擎

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:5173

## 项目结构

```
├── index.html              # 入口 HTML（含全局样式）
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── src/
    ├── main.tsx            # 应用入口
    ├── App.tsx             # 主应用组件（UI 面板）
    ├── data.ts             # 模拟数据（建筑、园区统计）
    ├── vite-env.d.ts       # Vite 类型声明
    └── components/
        └── Scene.tsx       # 3D 场景组件
```
