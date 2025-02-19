// 导入拖拽相关的核心功能
import { DndContext, closestCenter } from '@dnd-kit/core';
// 导入排序相关的功能
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// 导入放置区域钩子
import { useDroppable } from "@dnd-kit/core";
// 导入样式组件和其他依赖
import styled from "styled-components";
import useResumeStore from "../stores/resumeStore";
import PersonalInfo from "./ResumeComponents/PersonalInfo";
import PropTypes from "prop-types";

// 定义预览容器样式
// 使用标准 A4 纸张尺寸和样式
const PreviewContainer = styled.div`
  width: 21cm;              // A4 标准宽度
  min-height: 29.7cm;       // A4 标准高度
  padding: 2cm;             // 标准页边距
  margin: 0 auto;           // 水平居中
  background: white;        // 纸张颜色
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  // 立体效果
  position: relative;       // 为内部定位提供参考
`;

// 定义每个简历组件的包装器样式
const ComponentWrapper = styled.div`
  position: relative;       // 相对定位
  margin-bottom: 1rem;      // 组件间距

  // 鼠标悬停时的视觉反馈
  &:hover {
    outline: 2px solid #1a73e8;  // 蓝色边框提示
  }
`;

// 简历预览组件定义
// isPreview: 用于区分是否为预览模式
const ResumePreview = ({ isPreview = false }) => {
  // 从状态管理中获取组件数据和更新方法
  const { components, updateComponentOrder } = useResumeStore();
  
  // 设置可放置区域
  const { setNodeRef } = useDroppable({
    id: "resume-drop-area",
  });

  // 处理拖拽结束事件
  const handleDragEnd = (event) => {
    const { active, over } = event;
    // 只在位置发生变化时处理
    if (active.id !== over.id) {
      // 获取原始位置和目标位置
      const oldIndex = components.findIndex(comp => comp.id === active.id);
      const newIndex = components.findIndex(comp => comp.id === over.id);
      // 创建新的组件数组并更新顺序
      const newComponents = [...components];
      const [removed] = newComponents.splice(oldIndex, 1);
      newComponents.splice(newIndex, 0, removed);
      updateComponentOrder(newComponents);
    }
  };

  // 根据组件类型渲染对应的组件
  const renderComponent = (component) => {
    switch (component.type) {
      case "personal_info":
        return <PersonalInfo data={component} />;
      default:
        return null;
    }
  };

  // 渲染预览区域
  return (
    // 拖拽上下文提供者
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {/* 排序上下文，提供垂直列表排序策略 */}
      <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
        {/* 预览容器 */}
        <PreviewContainer 
          ref={!isPreview ? setNodeRef : undefined} 
          className="resume-preview"
        >
          {/* 渲染所有简历组件 */}
          {components.map((component) => (
            <ComponentWrapper key={component.id}>
              {renderComponent(component)}
            </ComponentWrapper>
          ))}
        </PreviewContainer>
      </SortableContext>
    </DndContext>
  );
};

// 属性类型检查
ResumePreview.propTypes = {
  isPreview: PropTypes.bool
};

export default ResumePreview;