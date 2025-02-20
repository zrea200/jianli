import React from 'react';
import styled from 'styled-components';
import useResumeStore from '../../stores/resumeStore';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ComponentActions from "../ComponentActions";

const AvatarWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
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
  border: 2px dashed #ddd;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #1a73e8;
  }
`;

const UploadText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const AvatarUpload = ({ data, $isPreview }) => {
  const { updateComponent, removeComponent } = useResumeStore();
  const inputRef = React.useRef(null);

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
          imageUrl: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if ($isPreview) {
    return data.imageUrl ? (
      <AvatarWrapper>
        <AvatarContainer>
          <img src={data.imageUrl} alt="头像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </AvatarContainer>
        <UploadText>上传照片</UploadText>
      </AvatarWrapper>
    ) : null;
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ComponentActions
        onDelete={() => removeComponent(data.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        <AvatarWrapper>
          <AvatarContainer onClick={() => inputRef.current?.click()}>
            {data.imageUrl ? (
              <img src={data.imageUrl} alt="头像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        </AvatarWrapper>
      </ComponentActions>
    </div>
  );
};

export default AvatarUpload;