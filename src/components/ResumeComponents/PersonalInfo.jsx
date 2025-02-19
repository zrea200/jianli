// 导入styled-components库用于组件样式
import styled from "styled-components";
import PropTypes from "prop-types"; // 添加这行导入
import useResumeStore from "../../stores/resumeStore";
// 定义容器组件样式
// 添加内边距和底部边框
const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

// 定义标题组件样式
// 设置下边距和文字颜色
const Title = styled.h2`
  margin-bottom: 15px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 定义网格布局组件
// 使用CSS Grid创建两列布局，设置列间距
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

// 定义字段组件样式
// 为每个信息字段添加下边距
const Field = styled.div`
  margin-bottom: 10px;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  background: transparent;
  transition: all 0.3s ease;

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
const PersonalInfo = ({ data }) => {
  // 组件接收到的 props
  console.log('PersonalInfo - Received props:', data);
  const { updateComponent } = useResumeStore();

  const handleChange = (field, value) => {
    if (!data || !data.id) {
      console.error('PersonalInfo - Invalid data structure:', data);
      return;
    }
    
    // 更新时的数据结构
    const updatedData = {
      id: data.id,
      type: data.type || "personal_info",
      data: {
        ...data.data,
        [field]: value,
      }
    };
    
    console.log('PersonalInfo - Updating with:', updatedData);
    updateComponent(updatedData);
  };

  // 在渲染前记录当前的数据状态
  console.log('PersonalInfo - Current data state:', data?.data);

  return (
    <Container>
      <Field>
        <Input
          type="text"
          value={data.data?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="姓名"
        />
      </Field>
      <Grid>
        <Field>
          <Input
            type="tel"
            value={data.data?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="电话"
          />
        </Field>
        <Field>
          <Input
            type="email"
            value={data.data?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="邮箱"
          />
        </Field>
        <Field>
          <Input
            type="text"
            value={data.data?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="地址"
          />
        </Field>
      </Grid>
      <Field>
        <Input
          type="text"
          value={data.data?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="个人简介"
        />
      </Field>
    </Container>
  );
};
PersonalInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

export default PersonalInfo;
