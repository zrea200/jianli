import styled from "styled-components";
import { useDraggable } from "@dnd-kit/core";

const Panel = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ComponentItem = styled.div`
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: move;
  user-select: none;

  &:hover {
    background: #e9ecef;
  }
`;

const DraggableItem = ({ id, type, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type,
    },
  });

  return (
    <ComponentItem ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </ComponentItem>
  );
};

const LeftPanel = () => {
  const components = [
    { id: "personal", type: "personal_info", label: "个人信息" },
    { id: "education", type: "education", label: "教育经历" },
    { id: "experience", type: "experience", label: "工作经验" },
    { id: "skills", type: "skills", label: "技能特长" },
  ];

  return (
    <Panel>
      <h3>简历组件</h3>
      {components.map((comp) => (
        <DraggableItem key={comp.id} id={comp.id} type={comp.type}>
          {comp.label}
        </DraggableItem>
      ))}
    </Panel>
  );
};

export default LeftPanel;
