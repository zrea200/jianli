import styled from "styled-components";
import { useState } from "react";
import ResumePreview from "./ResumePreview";
import useResumeStore from "../stores/resumeStore";

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
`;

const List = styled.div`
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  background: white;
`;

const ListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: white;

  h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
`;

const ListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const PreviewContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  position: relative;
`;

const PreviewHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 20px;
  background: #f5f5f5;
  text-align: center;
  z-index: 1;

  h3 {
    margin: 0;
    color: #333;
  }
`;

const PreviewActions = styled.div`
  position: sticky;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(transparent, #f5f5f5);
`;

const TemplateItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  background: ${(props) => (props.$isSelected ? "#e3f2fd" : "white")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) => (props.$isSelected ? "#e3f2fd" : "#f8f9fa")};
  }

  h4 {
    margin: 0 0 5px 0;
  }

  small {
    color: #666;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button.attrs((props) => ({
  type: "button",
  // 使用 $primary 和 $danger 来避免属性传递到 DOM
  $primary: props.primary,
  $danger: props.danger,
}))`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  ${(props) =>
    props.$primary &&
    `
    background: #1a73e8;
    color: white;
    &:hover {
      background: #1557b0;
    }
  `}

  ${(props) =>
    props.$danger &&
    `
    background: #dc3545;
    color: white;
    &:hover {
      background: #c82333;
    }
  `}
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
  background: #f9f9f9;
  border-radius: 4px;
  margin: 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TemplateList = ({ templates, onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { deleteTemplate } = useResumeStore();

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      if (window.confirm("确定要使用此模板吗？这将替换当前的简历内容。")) {
        onSelect(selectedTemplate);
      }
    }
  };

  const handleDeleteTemplate = (e, template) => {
    e.stopPropagation();
    if (window.confirm("确定要删除此模板吗？此操作不可恢复。")) {
      deleteTemplate(template.name);
      if (selectedTemplate?.name === template.name) {
        setSelectedTemplate(null);
      }
      window.location.reload();
    }
  };

  return (
    <Container>
      <List>
        <ListHeader>
          <h3>模板列表</h3>
        </ListHeader>
        <ListContent>
          {templates.length === 0 ? (
            <EmptyText>暂无保存的模板</EmptyText>
          ) : (
            templates.map((template, index) => (
              <TemplateItem
                key={index}
                $isSelected={selectedTemplate?.name === template.name}
                onClick={() => handleTemplateClick(template)}
              >
                <h4>{template.name}</h4>
                <small>{new Date(template.createTime).toLocaleString()}</small>
                <ActionButtons>
                  <Button
                    $danger
                    onClick={(e) => handleDeleteTemplate(e, template)}
                  >
                    删除
                  </Button>
                </ActionButtons>
              </TemplateItem>
            ))
          )}
        </ListContent>
      </List>

      <PreviewContainer>
        {selectedTemplate ? (
          <>
            <ResumePreview
              previewData={{
                components: selectedTemplate.components,
                styles: selectedTemplate.styles,
              }}
              isPreview={true}
            />
            <PreviewActions>
              <Button $primary onClick={handleUseTemplate}>
                使用此模板
              </Button>
            </PreviewActions>
          </>
        ) : (
          <EmptyText>请选择一个模板进行预览</EmptyText>
        )}
      </PreviewContainer>
    </Container>
  );
};

export default TemplateList;
