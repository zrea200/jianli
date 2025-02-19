import styled from "styled-components";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useResumeStore from "../stores/resumeStore";

const Panel = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 4px;
  background: #1a73e8;
  color: white;
  cursor: pointer;

  &:hover {
    background: #1557b0;
  }
`;

const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PreviewContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
`;

const RightPanel = () => {
  const { styles, updateStyles } = useResumeStore();
  const [showPreview, setShowPreview] = useState(false);
  
  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleExportPDF = async () => {
    const resumeElement = document.querySelector('.resume-preview');
    if (!resumeElement) return;

    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('我的简历.pdf');
  };

  return (
    <Panel>
      <h3>操作</h3>
      <Button onClick={handlePreview}>预览</Button>
      <Button onClick={handleExportPDF}>导出 PDF</Button>
      <Button>导入模板</Button>

      <h3>样式设置</h3>
      <select
        value={styles.fontSize}
        onChange={(e) => updateStyles({ fontSize: e.target.value })}
      >
        <option value="12px">小号</option>
        <option value="14px">中号</option>
        <option value="16px">大号</option>
      </select>

      {showPreview && (
        <PreviewModal onClick={() => setShowPreview(false)}>
          <PreviewContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPreview(false)}>✕</CloseButton>
            <div className="resume-preview">
              {/* 这里将插入简历预览内容的克隆 */}
              {document.querySelector('.resume-preview')?.cloneNode(true)}
            </div>
          </PreviewContent>
        </PreviewModal>
      )}
    </Panel>
  );
};

export default RightPanel;
