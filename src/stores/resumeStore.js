import { create } from "zustand";

// 创建简历状态管理 store
const useResumeStore = create((set, get) => ({
    // === 状态定义 ===
    // 存储所有简历组件的数组
    components: [],
    
    // 当前选中的组件，用于编辑操作
    activeComponent: null,
    
    // 全局样式配置对象
    styles: {
        theme: "default",     // 主题样式
        fontSize: "14px",     // 基础字体大小
        fontFamily: "Arial",  // 字体类型
        lineHeight: "1.5",    // 行高比例
        color: "#333333",     // 默认文字颜色
    },

    // === 组件操作方法 ===
    // 添加新组件到简历
    // component: 要添加的新组件对象
    addComponent: (component) =>
        set((state) => ({
            components: [...state.components, component],
        })),

    // 更新现有组件的内容
    // updatedComponent: 更新后的组件对象
    updateComponent: (updatedComponent) =>
        set((state) => ({
            components: state.components.map((comp) =>
                comp.id === updatedComponent.id ? updatedComponent : comp
            ),
        })),

    // 从简历中删除指定组件
    // componentId: 要删除的组件ID
    removeComponent: (componentId) =>
        set((state) => ({
            components: state.components.filter(comp => comp.id !== componentId)
        })),

    // 更新组件的排序顺序
    // newComponents: 重新排序后的组件数组
    updateComponentOrder: (newComponents) =>
        set({ components: newComponents }),

    // === 数据持久化方法 ===
    // 将当前状态保存到本地存储
    saveToLocalStorage: () => {
        const state = get();  // 获取当前状态
        const dataToSave = {
            components: state.components,
            activeComponent: state.activeComponent,
            styles: state.styles,
        };
        // 将数据转换为 JSON 字符串并保存
        localStorage.setItem("resumeData", JSON.stringify(dataToSave));
        alert("数据保存成功！");
    },

    // 从本地存储加载保存的数据
    loadFromLocalStorage: () => {
        const savedData = localStorage.getItem("resumeData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            set(parsedData);  // 更新状态
        }
    },

    // 保存为模板
    saveAsTemplate: (templateName) => {
      const currentState = {
        components: get().components,
        styles: get().styles,
        name: templateName,
        createTime: new Date().toISOString()
      };
      
      // 从 localStorage 获取现有模板
      const existingTemplates = JSON.parse(localStorage.getItem('resumeTemplates') || '[]');
      
      // 添加新模板
      existingTemplates.push(currentState);
      
      // 保存回 localStorage
      localStorage.setItem('resumeTemplates', JSON.stringify(existingTemplates));
    },

    // 获取所有模板
    getTemplates: () => {
      return JSON.parse(localStorage.getItem('resumeTemplates') || '[]');
    },

    // 导入模板
    importTemplate: (template) => {
      set({
        components: template.components,
        styles: template.styles
      });
    },
    //  删除模板
  deleteTemplate: (templateName) => {
    const templates = JSON.parse(localStorage.getItem('resumeTemplates') || '[]');
    const updatedTemplates = templates.filter(t => t.name !== templateName);
    localStorage.setItem('resumeTemplates', JSON.stringify(updatedTemplates));
  },
}));

// === 初始化逻辑 ===
// 在客户端环境下自动加载保存的数据
if (typeof window !== "undefined") {  // 确保在浏览器环境中执行
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        useResumeStore.setState(parsedData);  // 初始化状态
    }
}

// 导出状态管理 hook 供组件使用
export default useResumeStore;