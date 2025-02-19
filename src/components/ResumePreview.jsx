// 简历预览
// 导入必要的依赖
import styled from "styled-components";
// 导入拖拽放置区域 hook
import { useDroppable } from "@dnd-kit/core";
// 导入状态管理 hook
import useResumeStore from "../stores/resumeStore";
// 导入简历组件
import PersonalInfo from "./ResumeComponents/PersonalInfo";
// 导入 PropTypes 用于类型检查
import PropTypes from "prop-types";

// 定义预览容器样式，使用 A4 纸张尺寸
const PreviewContainer = styled.div`
  width: 21cm;              // A4 纸宽度
  min-height: 29.7cm;       // A4 纸高度
  padding: 2cm;             // 页边距
  margin: 0 auto;           // 居中显示
  background: white;        // 白色背景
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  // 添加阴影效果
  position: relative;       // 相对定位，用于子元素定位
`;

// 定义组件包装器样式
const ComponentWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  // 悬停时显示蓝色边框
  &:hover {
    outline: 2px solid #1a73e8;
  }
`;

// 简历预览组件，接收 isPreview 属性用于区分预览模式
const ResumePreview = ({ isPreview = false }) => {
  // 从状态管理中获取组件列表
  const { components } = useResumeStore();
  // 创建可放置区域，用于接收拖拽的组件
  const { setNodeRef } = useDroppable({
    id: "resume-drop-area",
  });

  // 根据组件类型渲染对应的组件
  const renderComponent = (component) => {
    switch (component.type) {
      case "personal_info":
        return <PersonalInfo data={component} />; // 传递整个 component 对象
      default:
        return null;
    }
  };

  // 渲染预览区域
  return (
    <PreviewContainer 
      // 仅在非预览模式下设置放置区域引用
      ref={!isPreview ? setNodeRef : undefined} 
      className="resume-preview"
    >
      {/* 遍历渲染所有组件 */}
      {components.map((component) => (
        <ComponentWrapper key={component.id}>
          {renderComponent(component)}
        </ComponentWrapper>
      ))}
    </PreviewContainer>
  );
};

// 定义组件属性类型
ResumePreview.propTypes = {
  isPreview: PropTypes.bool
};

export default ResumePreview;
