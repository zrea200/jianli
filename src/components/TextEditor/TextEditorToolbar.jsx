import styled from 'styled-components';

const ToolbarContainer = styled.div`
  position: absolute;
  top: -36px;
  left: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  /* display: ${props => props.$isVisible ? 'flex' : 'none'}; */
  display: flex;
  padding: 4px;
  gap: 4px;
  z-index: 100;
  border: 1px solid #eee;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
  padding: 0 4px;
  
  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
`;

const ToolbarButton = styled.button`
  padding: 4px 8px;
  background: none;
  border: none;
  border-radius: 3px;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
    color: #1a73e8;
  }

  &.active {
    background: #e8f0fe;
    color: #1a73e8;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const TextEditorToolbar = ({ isVisible, onFormatText }) => {
  return (
    <ToolbarContainer $isVisible={isVisible}>
      <ButtonGroup>
        <ToolbarButton title="加粗">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton title="斜体">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton title="下划线">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z"/>
          </svg>
        </ToolbarButton>
      </ButtonGroup>

      <ButtonGroup>
        <ToolbarButton title="左对齐"   onClick={() => onFormatText('alignLeft')}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton title="居中对齐"  onClick={() => onFormatText('alignCenter')}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton title="右对齐">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z"/>
          </svg>
        </ToolbarButton>
      </ButtonGroup>
      <ButtonGroup>
        <ToolbarButton 
          title="无序列表"
          onClick={() => onFormatText('bulletList')}
        >
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton 
          title="有序列表"
          onClick={() => onFormatText('numberList')}
        >
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.23L4,11H2V10H4.25Z"/>
          </svg>
        </ToolbarButton>
      </ButtonGroup>
      <ButtonGroup>
        <ToolbarButton 
          title="字号"
          onClick={() => onFormatText('fontSize')}
        >
        
          字号
        </ToolbarButton>
        <ToolbarButton 
          title="字体"
          onClick={() => onFormatText('fontFamily')}
        >
          字体
        </ToolbarButton>
        <ToolbarButton 
          title="字体颜色"
          onClick={() => onFormatText('color')}
        >
          字体颜色
        </ToolbarButton>
        <ToolbarButton 
          title="行距"
          onClick={() => onFormatText('lineHeight')}
        >
          行距
        </ToolbarButton>
      </ButtonGroup>
    </ToolbarContainer>
  );
};

export default TextEditorToolbar;