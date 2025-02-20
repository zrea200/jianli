import styled from "styled-components";
import { useState } from "react";
import ResumePreview from "./ResumePreview";
import useResumeStore from "../stores/resumeStore";

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  overflow: hidden;  // 防止溢出
`;

const List = styled.div`
  width: 300px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #eee;
  padding-right: 20px;
`;

const PreviewContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .resume-preview {
    margin: 20px 0;
  }
`;

const TemplateItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.isSelected ? '#f0f7ff' : 'transparent'};

  &:hover {
    background: ${props => props.isSelected ? '#f0f7ff' : '#f5f5f5'};
  }
`;

const DeleteButton = styled.button`
  padding: 4px 8px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

// 添加空状态提示组件
const EmptyText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
  background: #f9f9f9;
  border-radius: 4px;
  margin: 20px;
`;

// 添加使用模板按钮样式
const UseTemplateButton = styled.button`
  position: sticky;
  bottom: 20px;
  margin-top: 20px;
  padding: 10px 20px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background: #1557b0;
  }
`;

const TemplateList = ({ templates, onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { deleteTemplate, getTemplates } = useResumeStore();

  const handleDeleteTemplate = async (e, template) => {
    e.stopPropagation();
    if (window.confirm('确定要删除此模板吗？')) {
      await deleteTemplate(template.name);
      // 强制刷新模板列表
      window.location.reload();
    }
  };

  // 如果没有模板，显示空状态
  if (!templates || templates.length === 0) {
    return <EmptyText>暂无保存的模板</EmptyText>;
  }

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };


  return (
    <Container>
      <List>
        {templates.map((template, index) => (
          <TemplateItem 
            key={index} 
            isSelected={selectedTemplate?.name === template.name}
            onClick={() => handleTemplateClick(template)}
          >
            <div>
              <h4>{template.name}</h4>
              <small>{new Date(template.createTime).toLocaleString()}</small>
            </div>
            <DeleteButton onClick={(e) => handleDeleteTemplate(e, template)}>
              删除
            </DeleteButton>
          </TemplateItem>
        ))}
      </List>
      <PreviewContainer>
        {selectedTemplate ? (
          <>
            <ResumePreview 
              previewData={{
                components: selectedTemplate.components,
                styles: selectedTemplate.styles
              }}
              isPreview={true}
            />
            <UseTemplateButton onClick={handleUseTemplate}>
              使用此模板
            </UseTemplateButton>
          </>
        ) : (
          <EmptyText>请选择一个模板进行预览</EmptyText>
        )}
      </PreviewContainer>
    </Container>
  );
};

export default TemplateList;