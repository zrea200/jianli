// 导入拖拽排序相关的依赖
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// 导入样式和类型检查相关的依赖
import PropTypes from "prop-types";
import styled from "styled-components";
// 导入自定义组件和状态管理
import { useState } from "react";
import useResumeStore from "../../stores/resumeStore";
import ComponentActions from "../ComponentActions";
import TextEditor from "../TextEditor/TextEditor";

// 删除重复的组件声明，只保留一个
const PersonalInfo = ({ data, $isPreview }) => {
  const { removeComponent, updateComponent } = useResumeStore();
  const [activeField, setActiveField] = useState(null);
  const [fields, setFields] = useState({
    name: data.data?.name || '',
    phone: data.data?.phone || '',
    email: data.data?.email || '',
    address: data.data?.address || '',
    description: data.data?.description || ''
  });

  // 如果是预览模式，渲染只读版本
  if ($isPreview) {
    return (
      <div>
        <Container>
          <Field>
            <div dangerouslySetInnerHTML={{ __html: fields.name }} />
          </Field>

          <Grid>
            <Field>
              <div dangerouslySetInnerHTML={{ __html: fields.phone }} />
            </Field>
            <Field>
              <div dangerouslySetInnerHTML={{ __html: fields.email }} />
            </Field>
            <Field>
              <div dangerouslySetInnerHTML={{ __html: fields.address }} />
            </Field>
          </Grid>

          <Field>
            <div dangerouslySetInnerHTML={{ __html: fields.description }} />
          </Field>
        </Container>
      </div>
    );
  }

  // 使用 dnd-kit 的拖拽排序功能
  const {
    attributes, // 拖拽属性
    listeners, // 拖拽事件监听器
    setNodeRef, // 设置可拖拽节点的引用
    transform, // 变换属性
    transition, // 过渡效果
  } = useSortable({ id: data.id });

  // 设置拖拽时的样式
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 文本域自动调整高度的方法
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // 处理表单字段变化的方法
  const handleChange = (field, value) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));

    const updatedData = {
      id: data.id,
      type: data.type || "personal_info",
      data: {
        ...data.data,
        [field]: value,
      },
    };

    updateComponent(updatedData);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ComponentActions
        onDelete={() => removeComponent(data.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        <Container>
          <Field>
            <EditorLabel></EditorLabel>
            <TextEditor
              value={fields.name}
              onChange={(content) => handleChange("name", content)}
            />
          </Field>

          <Grid>
            <Field>
              <EditorLabel></EditorLabel>
              <TextEditor
                value={fields.phone}
                onChange={(content) => handleChange("phone", content)}
              />
            </Field>
            <Field>
              <EditorLabel></EditorLabel>
              <TextEditor
                value={fields.email}
                onChange={(content) => handleChange("email", content)}
              />
            </Field>
            <Field>
              <EditorLabel></EditorLabel>
              <TextEditor
                value={fields.address}
                onChange={(content) => handleChange("address", content)}
              />
            </Field>
          </Grid>

          <Field>
            <EditorLabel></EditorLabel>
            <TextEditor
              value={fields.description}
              onChange={(content) => handleChange("description", content)}
            />
          </Field>
        </Container>
      </ComponentActions>
    </div>
  );
};
// 组件属性类型检查
PersonalInfo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};

// 定义基础容器样式
const Container = styled.div`
  padding: 20px;
  position: relative;
  margin-top: 40px; // 为工具栏预留空间
`;

// 定义三列网格布局
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 15px 0;
`;

// 定义表单字段容器样式
const Field = styled.div`
  margin-bottom: 15px;
  position: relative;

  .quill {
    background: transparent;
  }

  .ql-container {
    border: 1px solid transparent !important;
    border-radius: 4px;
    font-size: 14px;
    background: transparent;
    transition: all 0.3s ease;
  }

  &:hover .ql-container {
    border-color: #ddd !important;
  }

  .ql-editor {
    padding: 8px;
    min-height: 30px;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    left: 8px;
    color: #666;
  }

  &:focus-within .ql-container {
    outline: none;
    border-color: #1a73e8 !important;
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
`;

const EditorLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

// 删除不再需要的 Input 和 TextArea 样式组件，因为现在使用 TextEditor 替代

export default PersonalInfo;
