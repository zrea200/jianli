// 导入拖拽排序相关的依赖
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// 导入样式和类型检查相关的依赖
import styled from "styled-components";
import PropTypes from "prop-types";
// 导入自定义组件和状态管理
import ComponentActions from '../ComponentActions';
import useResumeStore from "../../stores/resumeStore";

// 定义基础容器样式
const Container = styled.div`
  padding: 20px;
  /* border-bottom: 1px solid #eee;  // 添加底部分隔线 */
`;

// 定义三列网格布局
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  // 平均分配三列
  gap: 15px;  // 设置列间距
`;

// 定义表单字段容器样式
const Field = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

// 定义输入框基础样式
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  background: transparent;
  transition: all 0.3s ease;

  // 悬停和聚焦状态的样式
  &:hover {
    border-color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #1a73e8;
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
`;

// 定义文本域样式，继承输入框的基础样式
const TextArea = styled.textarea`
  // 继承 Input 的基础样式
  width: 100%;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  background: transparent;
  transition: all 0.3s ease;
  
  // 文本域特有的样式
  resize: none;  // 禁止手动调整大小
  overflow: hidden;  // 隐藏滚动条
  min-height: 40px;
  height: auto;

  // 悬停和聚焦状态
  &:hover {
    border-color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #1a73e8;
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
`;

// 个人信息组件定义
const PersonalInfo = ({ data, $isPreview }) => {
  const { removeComponent, updateComponent } = useResumeStore();

  // 如果是预览模式，渲染只读版本，不显示操作图标
  if ($isPreview) {
    return (
      <div>  {/* 移除 ComponentActions 包装 */}
        <Container>
          <Field>
            <Input
              type="text"
              value={data.data?.name || ""}
              readOnly
              style={{ pointerEvents: 'none' }}
            />
          </Field>
          
          <Grid>
            <Field>
              <Input
                type="tel"
                value={data.data?.phone || ""}
                readOnly
                style={{ pointerEvents: 'none' }}
              />
            </Field>
            <Field>
              <Input
                type="email"
                value={data.data?.email || ""}
                readOnly
                style={{ pointerEvents: 'none' }}
              />
            </Field>
            <Field>
              <Input
                type="text"
                value={data.data?.address || ""}
                readOnly
                style={{ pointerEvents: 'none' }}
              />
            </Field>
          </Grid>
          
          <Field>
            <TextArea
              value={data.data?.description || ""}
              readOnly
              style={{ pointerEvents: 'none' }}
            />
          </Field>
        </Container>
      </div>
    );
  }

  // 使用 dnd-kit 的拖拽排序功能
  const {
    attributes,  // 拖拽属性
    listeners,   // 拖拽事件监听器
    setNodeRef,  // 设置可拖拽节点的引用
    transform,   // 变换属性
    transition,  // 过渡效果
  } = useSortable({ id: data.id });

  // 设置拖拽时的样式
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 文本域自动调整高度的方法
  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // 处理表单字段变化的方法
  const handleChange = (field, value) => {
    // 数据验证
    if (!data || !data.id) {
      console.error('PersonalInfo - Invalid data structure:', data);
      return;
    }
    
    // 构建更新数据结构
    const updatedData = {
      id: data.id,
      type: data.type || "personal_info",
      data: {
        ...data.data,
        [field]: value,
      }
    };
    
    // 更新数据
    updateComponent(updatedData);
  };

  // 渲染组件
  return (
    <div ref={setNodeRef} style={style}>
      <ComponentActions
        onDelete={() => removeComponent(data.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        <Container>
          {/* 姓名输入字段 */}
          <Field>
            <Input
              type="text"
              value={data.data?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="姓名"
            />
          </Field>
          
          {/* 联系信息网格布局 */}
          <Grid>
            {/* 电话输入字段 */}
            <Field>
              <Input
                type="tel"
                value={data.data?.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="电话"
              />
            </Field>
            {/* 邮箱输入字段 */}
            <Field>
              <Input
                type="email"
                value={data.data?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="邮箱"
              />
            </Field>
            {/* 地址输入字段 */}
            <Field>
              <Input
                type="text"
                value={data.data?.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="地址"
              />
            </Field>
          </Grid>
          
          {/* 个人简介文本域 */}
          <Field>
            <TextArea
              value={data.data?.description || ""}
              onChange={(e) => {
                handleChange("description", e.target.value);
                autoResize(e);
              }}
              onInput={autoResize}
              placeholder="个人简介"
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
      description: PropTypes.string
    })
  }).isRequired,
};

export default PersonalInfo;