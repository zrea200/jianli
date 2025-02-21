import React from 'react';
import styled from 'styled-components';
import useResumeStore from '../../stores/resumeStore';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ComponentActions from "../ComponentActions";
import { useState } from 'react';

// 定义基础容器样式
const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-direction: ${props => props.$imagePosition === 'right' ? 'row-reverse' : 'row'};
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Field = styled.div`
  margin-bottom: 10px;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

const AvatarWrapper = styled.div`
  width: 120px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ddd;
  }

  &:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
`;

const UploadText = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

// 添加位置切换按钮的样式
const PositionButton = styled.button`
  padding: 6px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;

  &:hover {
    background: #e9ecef;
    color: #1a73e8;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const AvatarUpload = ({ data, $isPreview }) => {
  const { updateComponent, removeComponent } = useResumeStore();
  const inputRef = React.useRef(null);
  const [isActive, setIsActive] = useState(false);  // 添加状态来跟踪组件是否被选中

  // 切换头像位置的处理函数
  const togglePosition = () => {
    updateComponent({
      ...data,
      data: {
        ...data.data,
        imagePosition: data.data?.imagePosition === 'right' ? 'left' : 'right'
      }
    });
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateComponent({
          ...data,
          data: {
            ...data.data,
            imageUrl: e.target.result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    updateComponent({
      ...data,
      data: {
        ...data.data,
        [field]: value
      }
    });
  };

  if ($isPreview) {
    return (
      <Container $imagePosition={data.data?.imagePosition}>
        <AvatarWrapper>
          {data.data?.imageUrl ? (
            <AvatarContainer>
              <img src={data.data.imageUrl} alt="头像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </AvatarContainer>
          ) : null}
        </AvatarWrapper>
        <InfoContainer>
          <InfoGrid>
            <Input value={data.data?.gender || ""} readOnly />
            <Input value={data.data?.age || ""} readOnly />
            <Input value={data.data?.education || ""} readOnly />
            <Input value={data.data?.phone || ""} readOnly />
            <Input value={data.data?.email || ""} readOnly />
          </InfoGrid>
          <Field>
            <Input value={data.data?.status || ""} readOnly />
          </Field>
        </InfoContainer>
      </Container>
    );
  }

  // 添加鼠标事件处理函数
  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ComponentActions
        onDelete={() => removeComponent(data.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        <Container $imagePosition={data.data?.imagePosition}>
          <AvatarWrapper>
            <AvatarContainer onClick={() => inputRef.current?.click()}>
              {data.data?.imageUrl ? (
                <img src={data.data.imageUrl} alt="头像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UploadText>点击上传照片</UploadText>
              )}
            </AvatarContainer>
            <HiddenInput
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
            {isActive && (  // 只在组件被选中时显示箭头按钮
              <PositionButton 
                onClick={togglePosition} 
                title={data.data?.imagePosition === 'right' ? '切换到左侧' : '切换到右侧'}
              >
                {data.data?.imagePosition === 'right' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
                  </svg>
                )}
              </PositionButton>
            )}
          </AvatarWrapper>
          <InfoContainer>
            <InfoGrid>
              <Input 
                placeholder="性别"
                value={data.data?.gender || ""}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              <Input 
                placeholder="年龄"
                value={data.data?.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
              <Input 
                placeholder="学历"
                value={data.data?.education || ""}
                onChange={(e) => handleChange("education", e.target.value)}
              />
              <Input 
                placeholder="电话"
                value={data.data?.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Input 
                placeholder="邮箱"
                value={data.data?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </InfoGrid>
            <Field>
              <Input 
                placeholder="求职状态"
                value={data.data?.status || ""}
                onChange={(e) => handleChange("status", e.target.value)}
              />
            </Field>
          </InfoContainer>
        </Container>
      </ComponentActions>
    </div>
  );
};

export default AvatarUpload;