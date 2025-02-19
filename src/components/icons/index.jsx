import styled from 'styled-components';

// 定义图标包装器组件
// 使用 flex 布局使图标居中对齐
// 设置固定尺寸和鼠标样式
const IconWrapper = styled.div`
  display: inline-flex;          // 内联弹性布局
  align-items: center;           // 垂直居中对齐
  justify-content: center;       // 水平居中对齐
  width: 20px;                   // 固定宽度
  height: 20px;                  // 固定高度
  cursor: pointer;               // 鼠标指针样式
  color: #666;                   // 默认颜色
  
  &:hover {
    color: #333;                 // 悬停时的颜色
  }
`;

// 导出拖拽图标组件
// 使用 SVG 实现三条横线的拖拽手柄图标
export const DragIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  </IconWrapper>
);

// 导出删除图标组件
// 使用 SVG 实现垃圾桶样式的删除图标
export const DeleteIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  </IconWrapper>
);