// 导入 zustand 状态管理库的 create 函数
import { create } from "zustand";

// 创建简历状态管理 store
const useResumeStore = create((set) => ({
  // 存储简历中的所有组件
  components: [],
  // 当前选中的活动组件
  activeComponent: null,
  // 全局样式配置
  styles: {
    theme: "default",     // 主题
    fontSize: "14px",     // 字体大小
    fontFamily: "Arial",  // 字体族
    lineHeight: "1.5",    // 行高
    color: "#333333",     // 文字颜色
  },

  // 添加新组件到简历
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),

  // 根据 ID 删除组件
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
    })),

  // 更新组件顺序（用于拖拽排序）
  updateComponentOrder: (newOrder) =>
    set({
      components: newOrder,
    }),

  // 设置当前活动组件（用于编辑）
  setActiveComponent: (component) =>
    set({
      activeComponent: component,
    }),

  // 更新全局样式配置
  updateStyles: (newStyles) =>
    set((state) => ({
      styles: { ...state.styles, ...newStyles },
    })),
}));

// 导出状态管理 hook
export default useResumeStore;
