import React from 'react';
import styled from 'styled-components';
import useResumeStore from '../../stores/resumeStore';

const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  margin: 20px auto;
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

  &:hover {
    border-color: #1a73e8;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const UploadIcon = styled.div`
  font-size: 24px;
  color: #999;
  margin-bottom: 8px;
`;

const UploadText = styled.div`
  font-size: 12px;
  color: #666;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ff4d4f;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;

  ${AvatarWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ff7875;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const AvatarUpload = ({ data, $isPreview }) => {
  const { updateComponent, removeComponent } = useResumeStore();
  const inputRef = React.useRef(null);

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

  const handleDelete = () => {
    removeComponent(data.id);
  };

  if ($isPreview) {
    return data.imageUrl ? (
      <AvatarWrapper>
        <AvatarContainer>
          <AvatarImage src={data.imageUrl} alt="头像" />
        </AvatarContainer>
      </AvatarWrapper>
    ) : null;
  }

  return (
    <AvatarWrapper>
      <AvatarContainer onClick={() => inputRef.current?.click()}>
        {data.imageUrl ? (
          <AvatarImage src={data.imageUrl} alt="头像" />
        ) : (
          <>
            <UploadIcon>+</UploadIcon>
            <UploadText>上传照片</UploadText>
          </>
        )}
      </AvatarContainer>
      <DeleteButton onClick={handleDelete}>×</DeleteButton>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />
    </AvatarWrapper>
  );
};

export default AvatarUpload;