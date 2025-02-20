import styled from "styled-components";
import { useState } from "react";
// 导入 PDF 导出相关的库
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// 导入状态管理 hook
import useResumeStore from "../stores/resumeStore";
// 导入预览相关组件
import PreviewModal from "./PreviewModal";
import ResumePreview from "./ResumePreview";
// 导入 TemplateModal 和 TemplateList 组件，假设它们存在
import TemplateModal from "./TemplateModal";
import TemplateList from "./TemplateList";

// 定义右侧面板容器样式
const Panel = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 定义通用按钮样式
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

// 定义输入框样式
const Input = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RightPanel = () => {
  const {
    styles,
    updateStyles,
    saveToLocalStorage,
    saveAsTemplate,
    getTemplates,
    importTemplate
  } = useResumeStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState("");

  // 处理导出 PDF 的函数
  const handleExportPDF = async () => {
    // 获取简历预览区域的 DOM 元素
    const resumeElement = document.querySelector('.resume-preview');
    if (!resumeElement) return;

    try {
      // 使用 html2canvas 将简历内容转换为画布
      const canvas = await html2canvas(resumeElement, {
        scale: 2,          // 设置输出质量
        useCORS: true,     // 允许加载跨域图片
        logging: false     // 关闭日志输出
      });

      // 将画布转换为图片数据
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      // 创建 PDF 文档（A4 纸张大小）
      const pdf = new jsPDF('p', 'mm', 'a4');
      // 获取 PDF 页面尺寸
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 将图片添加到 PDF 中
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      // 保存 PDF 文件
      pdf.save('我的简历.pdf');
    } catch (error) {
      console.error('导出 PDF 失败:', error);
    }
  };

  // 处理保存模板
  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert("请输入模板名称");
      return;
    }
    saveAsTemplate(templateName);
    setTemplateName("");
    alert("模板保存成功！");
  };

  // 处理导入模板
  const handleImportTemplate = (template) => {
    importTemplate(template);
    setShowTemplateModal(false);
    alert("模板导入成功！");
  };

  return (
    <Panel>
      {/* 操作按钮区域 */}
      <h3>操作</h3>
      <Button onClick={() => setShowPreview(true)}>预览</Button>
      <Button onClick={handleExportPDF}>导出 PDF</Button>
      <Button onClick={saveToLocalStorage}>保存数据</Button>
      <Button onClick={() => setShowTemplateModal(true)}>导入模板</Button>

      {/* 保存模板区域 */}
      <h3>保存模板</h3>
      <div>
        <Input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="输入模板名称"
        />
        <Button onClick={handleSaveTemplate}>保存为模板</Button>
      </div>

      {/* 模板选择弹窗 */}
      {showTemplateModal && (
        <TemplateModal onClose={() => setShowTemplateModal(false)}>
          <TemplateList
            templates={getTemplates()}
            onSelect={handleImportTemplate}
          />
        </TemplateModal>
      )}

      {/* 预览模态框 */}
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)}>
          <ResumePreview isPreview={true} />
        </PreviewModal>
      )}
    </Panel>
  );
};

export default RightPanel;