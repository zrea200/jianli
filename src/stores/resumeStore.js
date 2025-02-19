// 导入 zustand 状态管理库的 create 函数
import { create } from "zustand";

// 创建简历状态管理 store
const useResumeStore = create((set, get) => ({
  // 存储简历中的所有组件
  components: [],
  // 当前选中的活动组件
  activeComponent: null,
  // 全局样式配置
  styles: {
    theme: "default", // 主题
    fontSize: "14px", // 字体大小
    fontFamily: "Arial", // 字体族
    lineHeight: "1.5", // 行高
    color: "#333333", // 文字颜色
  },

  // 添加新组件到简历
  addComponent: (component) =>
    set((state) => {
      return {
        components: [...state.components, component],
      };
    }),

  updateComponent: (updatedComponent) =>
    set((state) => {
      return {
        components: state.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
    }),

  // 保存数据到 localStorage
  saveToLocalStorage: () => {
    const state = get();
    const dataToSave = {
      components: state.components,
      activeComponent: state.activeComponent,
      styles: state.styles,
    };
    localStorage.setItem("resumeData", JSON.stringify(dataToSave));
    alert("数据保存成功！");
  },

  // 从 localStorage 加载数据
  loadFromLocalStorage: () => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      set(parsedData);
    }
  },
}));
// 初始化时自动加载保存的数据
if (typeof window !== "undefined") {
  const savedData = localStorage.getItem("resumeData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    useResumeStore.setState(parsedData);
  }
}

// 导出状态管理 hook
export default useResumeStore;
