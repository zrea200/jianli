// 左侧面板主组件
// 导入样式组件库
import styled from "styled-components";
// 导入拖拽功能 hook
import { useDraggable } from "@dnd-kit/core";

// 定义左侧面板容器样式
const Panel = styled.div`
  background: white;        // 白色背景
  border-radius: 8px;      // 圆角边框
  padding: 1rem;           // 内边距
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  // 阴影效果
`;

// 定义可拖拽组件项的样式
const ComponentItem = styled.div`
  padding: 0.8rem;         // 内边距
  margin: 0.5rem 0;        // 上下外边距
  background: #f8f9fa;     // 浅灰色背景
  border-radius: 4px;      // 圆角边框
  cursor: move;            // 移动光标
  user-select: none;       // 禁止文本选择

  &:hover {
    background: #e9ecef;   // 悬停时背景色变深
  }
`;

// 可拖拽项组件
const DraggableItem = ({ id, type, children }) => {
  // 使用 useDraggable hook 设置拖拽功能
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,                    // 拖拽项唯一标识
    data: {
      type,               // 组件类型信息
    },
  });

  return (
    // 将拖拽相关属性和引用传递给组件
    <ComponentItem ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </ComponentItem>
  );
};

// 左侧面板主组件
const LeftPanel = () => {
  // 定义可用的简历组件列表
  const components = [
    { id: "personal", type: "personal_info", label: "个人信息" },

  ];

  return (
    <Panel>
      <h3>简历组件</h3>
      {/* 遍历渲染所有可拖拽组件 */}
      {components.map((comp) => (
        <DraggableItem key={comp.id} id={comp.id} type={comp.type}>
          {comp.label}
        </DraggableItem>
      ))}
    </Panel>
  );
};

export default LeftPanel;
