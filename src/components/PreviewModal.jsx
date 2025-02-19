// 预览模态框组件
// 导入样式组件库
import styled from "styled-components";
// 导入 PropTypes 用于类型检查
import PropTypes from "prop-types";

// 定义模态框遮罩层样式
const ModalOverlay = styled.div`
  position: fixed;           // 固定定位，覆盖整个视口
  top: 0;
  left: 0;
  width: 100vw;             // 使用视口宽度单位
  height: 100vh;            // 使用视口高度单位
  background: rgba(0, 0, 0, 0.5);  // 半透明黑色背景
  display: flex;            // 使用 flex 布局
  justify-content: center;  // 水平居中
  align-items: center;      // 垂直居中
  z-index: 1000;           // 确保显示在最上层
`;

// 定义模态框内容区域样式
const ModalContent = styled.div`
  background: white;        // 白色背景
  padding: 20px;           // 内边距
  border-radius: 8px;      // 圆角边框
  max-width: 90%;          // 最大宽度为视口的90%
  max-height: 90vh;        // 最大高度为视口的90%
  overflow: auto;          // 内容溢出时显示滚动条
  position: relative;      // 相对定位，用于关闭按钮定位
`;

// 定义关闭按钮样式
const CloseButton = styled.button`
  position: absolute;      // 绝对定位
  top: 10px;              // 距顶部10px
  right: 10px;            // 距右侧10px
  background: none;       // 无背景
  border: none;           // 无边框
  font-size: 20px;        // 字体大小
  cursor: pointer;        // 鼠标指针样式
  padding: 5px;           // 内边距
  
  &:hover {
    color: #666;          // 悬停时改变颜色
  }
`;

// 预览模态框组件
const PreviewModal = ({ onClose, children }) => {
  return (
    // 点击遮罩层时关闭模态框
    <ModalOverlay onClick={onClose}>
      {/* 阻止点击内容区域时触发遮罩层的点击事件 */}
      <ModalContent onClick={e => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <CloseButton onClick={onClose}>×</CloseButton>
        {/* 模态框内容 */}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

// 定义组件属性类型
PreviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,    // 关闭回调函数
  children: PropTypes.node.isRequired,   // 子组件内容
};

export default PreviewModal;