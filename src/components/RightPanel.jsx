import styled from 'styled-components';
import useResumeStore from '../stores/resumeStore';

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

  return (
    <Panel>
      <h3>操作</h3>
      <Button>预览</Button>
      <Button>导出 PDF</Button>
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
    </Panel>
  );
};

export default RightPanel;