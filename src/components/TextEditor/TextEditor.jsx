import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import TextEditorToolbar from './TextEditorToolbar';

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextEditor = ({ children, onFormat }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const timeoutRef = useRef(null);

  const handleFocus = () => {
    setShowToolbar(true);
  };

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setShowToolbar(false);
    }, 200);
  };

  // 克隆子元素并添加事件处理器
  const childrenWithProps = React.cloneElement(children, {
    onFocus: handleFocus,
    onBlur: handleBlur,
  });

  return (
    <EditorWrapper>
      {showToolbar && <TextEditorToolbar onFormat={onFormat} />}
      {childrenWithProps}
    </EditorWrapper>
  );
};

export default TextEditor;