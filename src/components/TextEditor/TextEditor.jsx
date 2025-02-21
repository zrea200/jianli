import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextEditorToolbar from "./TextEditorToolbar";


// ... 其他导入保持不变 ...

const EditorWrapper = styled.div`
  position: relative;
  
  .quill {
    background: transparent;
  }

  .ql-container {
    width: 100%;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 14px;
    background: transparent;
    transition: all 0.3s ease;
  }

  &:hover .ql-container {
    border-color: #ddd;
  }

  .ql-editor {
    padding: 0;
    min-height: 30px;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    left: 0;
    color: #666;
  }

  &:focus-within .ql-container {
    outline: none;
    border-color: #1a73e8;
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }

  // 移除 Quill 编辑器默认的边框和内边距
  .ql-toolbar {
    display: none;
  }
`;

// ... 其他代码保持不变 ...

const modules = {
  toolbar: false,
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  'bold', 'italic', 'underline',
  'align', 'list'
];

const TextEditor = ({ value, onChange }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);

  const handleFocus = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowToolbar(true);
  }, []);

  const handleBlur = useCallback((e) => {
    if (containerRef.current?.contains(e.relatedTarget)) {
      return;
    }
    
    timeoutRef.current = setTimeout(() => {
      setShowToolbar(false);
    }, 200);
  }, []);

  const handleFormat = useCallback((format) => {
    try {
      const editor = editorRef.current?.getEditor();
      if (!editor) return;

      const currentFormat = editor.getFormat();
      
      switch(format) {
        case 'bold':
          editor.format('bold', !currentFormat.bold);
          break;
        case 'italic':
          editor.format('italic', !currentFormat.italic);
          break;
        case 'underline':
          editor.format('underline', !currentFormat.underline);
          break;
        case 'alignLeft':
          editor.format('align', currentFormat.align === 'left' ? false : 'left');
          break;
        case 'alignCenter':
          editor.format('align', currentFormat.align === 'center' ? false : 'center');
          break;
        case 'bulletList':
          editor.format('list', currentFormat.list === 'bullet' ? false : 'bullet');
          break;
        case 'numberList':
          editor.format('list', currentFormat.list === 'ordered' ? false : 'ordered');
          break;
      }
    } catch (error) {
      console.error('Format error:', error);
    }
  }, []);

  return (
    <EditorWrapper ref={containerRef}>
      {showToolbar && (
        <div ref={toolbarRef} className="editor-toolbar">
          <TextEditorToolbar onFormat={handleFormat} />
        </div>
      )}
      <ReactQuill
        ref={editorRef}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </EditorWrapper>
  );
};

export default TextEditor;