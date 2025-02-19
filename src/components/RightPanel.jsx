import styled from "styled-components";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useResumeStore from "../stores/resumeStore";
import PreviewModal from "./PreviewModal";
import ResumePreview from "./ResumePreview";

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

const RightPanel = () => {
  const { styles, updateStyles } = useResumeStore();
  const [showPreview, setShowPreview] = useState(false);

  const handleExportPDF = async () => {
    const resumeElement = document.querySelector('.resume-preview');
    if (!resumeElement) return;

    try {
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
    } catch (error) {
      console.error('导出PDF失败:', error);
    }
  };

  return (
    <Panel>
      <h3>操作</h3>
      <Button onClick={() => setShowPreview(true)}>预览</Button>
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
        <PreviewModal onClose={() => setShowPreview(false)}>
          <ResumePreview isPreview={true} />
        </PreviewModal>
      )}
    </Panel>
  );
};

export default RightPanel;
