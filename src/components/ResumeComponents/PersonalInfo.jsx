// 导入styled-components库用于组件样式
import styled from "styled-components";
import PropTypes from "prop-types"; // 添加这行导入

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
`;

// 定义网格布局组件
// 使用CSS Grid创建两列布局，设置列间距
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

// 定义字段组件样式
// 为每个信息字段添加下边距
const Field = styled.div`
  margin-bottom: 10px;
`;

/**
 * 个人信息展示组件
 * @component
 * @description 用于展示用户的基本个人信息，包括姓名、电话、邮箱和地址
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.data - 个人信息数据
 * @param {string} [props.data.name] - 姓名
 * @param {string} [props.data.phone] - 电话号码
 * @param {string} [props.data.email] - 电子邮箱
 * @param {string} [props.data.address] - 居住地址
 *
 * @example
 * const data = {
 *   name: '张三',
 *   phone: '13800138000',
 *   email: 'zhangsan@example.com',
 *   address: '北京市朝阳区'
 * };
 *
 * return <PersonalInfo data={data} />;
 */
const PersonalInfo = ({ data = {} }) => {
  return (
    <Container>
      <Title>个人信息</Title>
      <Grid>
        {/* 姓名字段 - 如果没有数据显示"点击编辑" */}
        <Field>
          <strong>姓名：</strong> {data.name || "点击编辑"}
        </Field>
        {/* 电话字段 - 如果没有数据显示"点击编辑" */}
        <Field>
          <strong>电话：</strong> {data.phone || "点击编辑"}
        </Field>
        {/* 邮箱字段 - 如果没有数据显示"点击编辑" */}
        <Field>
          <strong>邮箱：</strong> {data.email || "点击编辑"}
        </Field>
        {/* 地址字段 - 如果没有数据显示"点击编辑" */}
        <Field>
          <strong>地址：</strong> {data.address || "点击编辑"}
        </Field>
      </Grid>
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
};

export default PersonalInfo;
