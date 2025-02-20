// 简历组件
// 导入样式组件库
import styled from "styled-components";

// 定义个人信息组件的基础样式
export const PersonalInfo = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

// 定义组件类型常量，用于标识不同的简历模块
export const componentTypes = {
  PERSONAL_INFO: "personal_info",  // 个人信息模块标识
  AVATAR: "avatar",  // 添加头像组件类型
};

// 定义各组件的配置信息，包括标题和字段
export const componentConfig = {
  // 个人信息组件配置
  [componentTypes.PERSONAL_INFO]: {
    title: "个人信息",
    fields: ["姓名", "电话", "邮箱", "地址"],
  },
  [componentTypes.AVATAR]: {
    title: "头像",
  },
};
