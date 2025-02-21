import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextEditorToolbar from "./TextEditorToolbar";

const EditorWrapper = styled.div`
  // ... 样式保持不变 ...
`;

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