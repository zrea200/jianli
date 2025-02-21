import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextEditorToolbar from "./TextEditorToolbar";

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextEditor = ({ children, onFormat }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const timeoutRef = useRef(null);
  const editorRef = useRef(null);

  const handleFocus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowToolbar(true);
  };

  const handleBlur = (e) => {
    // 检查点击的目标是否在编辑器内部
    if (editorRef.current && !editorRef.current.contains(e.relatedTarget)) {
      timeoutRef.current = setTimeout(() => {
        setShowToolbar(false);
      }, 200);
    }
  };

  return (
    <EditorWrapper ref={editorRef}>
      {showToolbar && <TextEditorToolbar onFormat={onFormat} />}
      {React.cloneElement(children, {
        onFocus: handleFocus,
        onBlur: handleBlur,
      })}
    </EditorWrapper>
  );
};

export default TextEditor;
