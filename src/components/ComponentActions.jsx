// 导入样式组件库
import styled from "styled-components";
// 导入自定义图标组件
import { DragIcon, DeleteIcon } from './icons';

// 定义操作按钮容器样式
// 使用绝对定位将按钮放置在组件右侧
const ActionsContainer = styled.div`
  position: absolute;    // 绝对定位
  right: -40px;         // 向右偏移，确保不遮挡主内容
  top: 0;               // 顶部对齐
  display: flex;        // 弹性布局
  flex-direction: column; // 垂直排列
  gap: 8px;            // 按钮间距
  opacity: 0;          // 默认隐藏
  transition: opacity 0.3s; // 透明度过渡动画
`;

// 定义组件包装器样式
// 用于控制操作按钮的显示/隐藏
const ComponentWrapper = styled.div`
  position: relative;   // 相对定位，作为操作按钮的定位参考
  
  // 鼠标悬停时显示操作按钮
  &:hover ${ActionsContainer} {
    opacity: 1;
  }
`;

// 定义操作按钮基础样式
const ActionButton = styled.button`
  padding: 4px;        // 内边距
  background: white;   // 背景色
  border: 1px solid #ddd; // 边框
  border-radius: 4px;  // 圆角
  cursor: pointer;     // 鼠标指针
  display: flex;       // 弹性布局
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中

  // 鼠标悬停效果
  &:hover {
    background: #f5f5f5;
  }
`;

// 组件操作按钮组件
// children: 被包裹的内容
// onDelete: 删除回调函数
// dragHandleProps: 拖拽相关属性
const ComponentActions = ({ children, onDelete, dragHandleProps }) => {
  return (
    <ComponentWrapper>
      {children}
      <ActionsContainer>
        {/* 拖拽按钮 */}
        <ActionButton {...dragHandleProps}>
          <DragIcon />
        </ActionButton>
        {/* 删除按钮 */}
        <ActionButton onClick={onDelete}>
          <DeleteIcon />
        </ActionButton>
      </ActionsContainer>
    </ComponentWrapper>
  );
};

export default ComponentActions;