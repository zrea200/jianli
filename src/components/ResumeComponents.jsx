import styled from "styled-components";

export const PersonalInfo = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

export const Education = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

export const Experience = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

export const Skills = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

export const componentTypes = {
  PERSONAL_INFO: "personal_info",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  SKILLS: "skills",
};

export const componentConfig = {
  [componentTypes.PERSONAL_INFO]: {
    title: "个人信息",
    fields: ["姓名", "电话", "邮箱", "地址"],
  },
  [componentTypes.EDUCATION]: {
    title: "教育经历",
    fields: ["学校", "专业", "学位", "时间"],
  },
  [componentTypes.EXPERIENCE]: {
    title: "工作经验",
    fields: ["公司", "职位", "时间", "描述"],
  },
  [componentTypes.SKILLS]: {
    title: "技能特长",
    fields: ["技能类别", "技能描述"],
  },
};
