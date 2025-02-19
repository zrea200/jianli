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
  // 使用 CSS Grid 布局，将页面分为三列
  display: grid;
  // 左右面板固定 250px，中间自适应
  grid-template-columns: 250px 1fr 250px;
  // 设置容器高度为全屏
  height: 100vh;
  // 设置列间距
  gap: 1rem;
  // 设置内边距
  padding: 1rem;
  // 设置背景色
  background-color: #f5f5f5;
`;

// 主应用组件
function App() {
  // 从状态管理 hook 中获取添加组件的方法
  const { addComponent } = useResumeStore();

  // 处理拖拽结束事件的回调函数
  const handleDragEnd = (event) => {
    // 解构获取拖拽元素和目标区域的信息
    const { active, over } = event;
    // 判断是否拖入指定的放置区域
    if (over && over.id === "resume-drop-area") {
      // 添加新组件到简历中
      addComponent({
        // 使用组件类型和时间戳生成唯一 ID
        id: `${active.data.current.type}-${Date.now()}`,
        // 设置组件类型
        type: active.data.current.type,
        // 初始化空数据对象
        data: {
          name: "",
          phone: "",
          email: "",
          address: "",
          description: ""
        },
      });
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
