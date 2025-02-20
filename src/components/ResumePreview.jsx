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
import AvatarUpload from "./ResumeComponents/AvatarUpload";  // 添加头像组件导入
import PropTypes from "prop-types";

// 定义预览容器样式
// 使用标准 A4 纸张尺寸和样式
const PreviewContainer = styled.div`
  width: 21cm;              
  min-height: 29.7cm;       
  padding: 2cm;             
  margin: 0 auto;           
  background: white;        
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  
  // 在预览模式下的特殊样式
  ${props => props.$isPreview && `
    transform: scale(0.68);
    transform-origin: center center;
    margin: 20px auto;
  `}
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
// 定义组件映射表
const componentMap = {
  personal_info: PersonalInfo,
  avatar: AvatarUpload,  // 添加头像组件映射
};

const ResumePreview = ({ $isPreview = false, previewData }) => {
  const { components: storeComponents, styles: storeStyles, updateComponentOrder } = useResumeStore();
  const { components = storeComponents, styles = storeStyles } = previewData || {};

  // 如果是预览模式，渲染简化版本
  if ($isPreview) {
    return (
      <PreviewContainer 
        className="resume-preview"
        style={{ fontSize: styles.fontSize }}
        $isPreview={$isPreview}  
      >
        {components?.map((component) => {
          const Component = componentMap[component.type];
          return Component ? (
            <ComponentWrapper key={component.id}>
              <Component data={component} $isPreview={$isPreview} />  
            </ComponentWrapper>
          ) : null;
        })}
      </PreviewContainer>
    );
  }

  // 非预览模式的原有逻辑
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
    const Component = componentMap[component.type];
    return Component ? (
      <Component 
        key={component.id}
        data={component}
        $isPreview={$isPreview}
      />
    ) : null;
  };

  // 渲染预览区域
  return (
    // 拖拽上下文提供者
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {/* 排序上下文，提供垂直列表排序策略 */}
      <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
        {/* 预览容器 */}
        <PreviewContainer 
          ref={!$isPreview ? setNodeRef : undefined} 
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
  $isPreview: PropTypes.bool
};

export default ResumePreview;