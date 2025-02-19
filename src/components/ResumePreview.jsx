import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import useResumeStore from "../stores/resumeStore";
import PersonalInfo from "./ResumeComponents/PersonalInfo";
import PropTypes from "prop-types";

const PreviewContainer = styled.div`
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ComponentWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &:hover {
    outline: 2px solid #1a73e8;
  }
`;

const ResumePreview = ({ isPreview = false }) => {
  const { components } = useResumeStore();
  const { setNodeRef } = useDroppable({
    id: "resume-drop-area",
  });

  const renderComponent = (component) => {
    switch (component.type) {
      case "personal_info":
        return <PersonalInfo data={component.data} />;
      default:
        return null;
    }
  };

  return (
    <PreviewContainer 
      ref={!isPreview ? setNodeRef : undefined} 
      className="resume-preview"
    >
      {components.map((component) => (
        <ComponentWrapper key={component.id}>
          {renderComponent(component)}
        </ComponentWrapper>
      ))}
    </PreviewContainer>
  );
};

ResumePreview.propTypes = {
  isPreview: PropTypes.bool
};

export default ResumePreview;
