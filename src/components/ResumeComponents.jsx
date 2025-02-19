// 简历组件
// 导入样式组件库
import styled from "styled-components";

// 定义个人信息组件的基础样式
export const PersonalInfo = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

// 定义教育经历组件的基础样式
export const Education = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

// 定义工作经验组件的基础样式
export const Experience = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

// 定义技能特长组件的基础样式
export const Skills = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

// 定义组件类型常量，用于标识不同的简历模块
export const componentTypes = {
  PERSONAL_INFO: "personal_info",  // 个人信息模块标识
  EDUCATION: "education",          // 教育经历模块标识
  EXPERIENCE: "experience",        // 工作经验模块标识
  SKILLS: "skills",               // 技能特长模块标识
};

// 定义各组件的配置信息，包括标题和字段
export const componentConfig = {
  // 个人信息组件配置
  [componentTypes.PERSONAL_INFO]: {
    title: "个人信息",
    fields: ["姓名", "电话", "邮箱", "地址"],
  },
  // 教育经历组件配置
  [componentTypes.EDUCATION]: {
    title: "教育经历",
    fields: ["学校", "专业", "学位", "时间"],
  },
  // 工作经验组件配置
  [componentTypes.EXPERIENCE]: {
    title: "工作经验",
    fields: ["公司", "职位", "时间", "描述"],
  },
  // 技能特长组件配置
  [componentTypes.SKILLS]: {
    title: "技能特长",
    fields: ["技能类别", "技能描述"],
  },
};
