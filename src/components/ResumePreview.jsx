import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import useResumeStore from '../stores/resumeStore';

const PreviewContainer = styled.div`
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ResumePreview = () => {
  const { components } = useResumeStore();
  const { setNodeRef } = useDroppable({
    id: 'resume-drop-area'
  });

  return (
    <PreviewContainer ref={setNodeRef}>
      {components.map((component, index) => (
        <div key={component.id}>
          {/* 这里后续会根据component.type渲染不同的组件 */}
          <h4>{component.type}</h4>
        </div>
      ))}
    </PreviewContainer>
  );
};

export default ResumePreview;