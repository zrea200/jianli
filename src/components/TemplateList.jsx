import styled from "styled-components";

const List = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const TemplateItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const TemplateList = ({ templates, onSelect }) => {
  if (templates.length === 0) {
    return <EmptyText>暂无保存的模板</EmptyText>;
  }

  return (
    <List>
      {templates.map((template, index) => (
        <TemplateItem key={index} onClick={() => onSelect(template)}>
          <h4>{template.name}</h4>
          <small>{new Date(template.createTime).toLocaleString()}</small>
        </TemplateItem>
      ))}
    </List>
  );
};

export default TemplateList;