// 导入 React 核心库
import React from "react";
// 导入 ReactDOM 客户端渲染方法
import ReactDOM from "react-dom/client";
// 导入根组件 App
import App from "./App";
// 导入全局样式文件
import "./index.css";

// 创建 React 根实例并渲染应用
ReactDOM.createRoot(document.getElementById("root")).render(
  // 启用严格模式，用于检测潜在问题和优化性能
  <React.StrictMode>
    {/* 渲染根组件 */}
    <App />
  </React.StrictMode>,
);
