import create from 'zustand';

const useResumeStore = create((set) => ({
  components: [],
  activeComponent: null,
  styles: {
    theme: 'default',
    fontSize: '14px',
    fontFamily: 'Arial',
    lineHeight: '1.5',
    color: '#333333'
  },

  addComponent: (component) => set((state) => ({
    components: [...state.components, component]
  })),

  removeComponent: (id) => set((state) => ({
    components: state.components.filter(c => c.id !== id)
  })),

  updateComponentOrder: (newOrder) => set({
    components: newOrder
  }),

  setActiveComponent: (component) => set({
    activeComponent: component
  }),

  updateStyles: (newStyles) => set((state) => ({
    styles: { ...state.styles, ...newStyles }
  }))
}));

export default useResumeStore;