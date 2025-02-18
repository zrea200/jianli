import { DndContext } from "@dnd-kit/core";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import LeftPanel from "./components/LeftPanel";
import ResumePreview from "./components/ResumePreview";
import RightPanel from "./components/RightPanel";
import useResumeStore from "./stores/resumeStore";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  height: 100vh;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
`;

function App() {
  const { addComponent } = useResumeStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "resume-drop-area") {
      addComponent({
        id: `${active.data.current.type}-${Date.now()}`,
        type: active.data.current.type,
        data: {},
      });
    }
  };

  return (
    <>
      <GlobalStyles />
      <DndContext onDragEnd={handleDragEnd}>
        <AppContainer>
          <LeftPanel />
          <ResumePreview />
          <RightPanel />
        </AppContainer>
      </DndContext>
    </>
  );
}

export default App;
