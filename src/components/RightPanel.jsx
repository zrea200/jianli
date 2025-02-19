// 右侧面板组件
// 导入必要的依赖
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

// 右侧面板组件
const RightPanel = () => {
  // 从状态管理中获取样式相关的状态和方法
  const { styles, updateStyles } = useResumeStore();
  // 控制预览模态框的显示状态
  const [showPreview, setShowPreview] = useState(false);

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
      console.error('导出PDF失败:', error);
    }
  };

  // 渲染组件
  return (
    <Panel>
      {/* 操作按钮区域 */}
      <h3>操作</h3>
      <Button onClick={() => setShowPreview(true)}>预览</Button>
      <Button onClick={handleExportPDF}>导出 PDF</Button>
      <Button>导入模板</Button>

      {/* 样式设置区域 */}
      <h3>样式设置</h3>
      <select
        value={styles.fontSize}
        onChange={(e) => updateStyles({ fontSize: e.target.value })}
      >
        <option value="12px">小号</option>
        <option value="14px">中号</option>
        <option value="16px">大号</option>
      </select>

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
