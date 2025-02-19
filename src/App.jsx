// 导入拖拽功能相关的上下文组件
import { DndContext } from "@dnd-kit/core";
// 导入样式组件库
import styled from "styled-components";
// 导入全局样式组件
import GlobalStyles from "./styles/GlobalStyles";
// 导入三个主面板组件
import LeftPanel from "./components/LeftPanel";
import ResumePreview from "./components/ResumePreview";
import RightPanel from "./components/RightPanel";
// 导入简历数据状态管理 hook
import useResumeStore from "./stores/resumeStore";

// 使用 styled-components 定义应用容器样式
const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
`;

// 主应用组件
function App() {
  // 从状态管理 hook 中获取添加组件的方法
  const { addComponent } = useResumeStore();

  // 处理拖拽结束事件的回调函数
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "resume-drop-area") {
      const componentId = `personal_info-${Date.now()}`;
      const newComponent = {
        id: componentId,
        type: "personal_info",
        data: {
          name: "",
          phone: "",
          email: "",
          address: "",
          description: ""
        }
      };

      addComponent(newComponent);
    }
  };

  // 渲染应用界面
  return (
    <>
      {/* 应用全局样式 */}
      <GlobalStyles />
      {/* 拖拽功能上下文提供者 */}
      <DndContext onDragEnd={handleDragEnd}>
        {/* 应用主容器 */}
        <AppContainer>
          {/* 左侧组件面板 */}
          <LeftPanel />
          {/* 中间简历预览区域 */}
          <ResumePreview />
          {/* 右侧属性编辑面板 */}
          <RightPanel />
        </AppContainer>
      </DndContext>
    </>
  );
}

// 导出应用组件
export default App;
