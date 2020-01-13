import styled from 'styled-components';
import { dim } from '../../styles/theme';


const StyledDropDownRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => {
    if (props.type === 'section') return `${dim._8px} ${dim._16px}`;
    if (props.type === 'text') return `${dim._10px} ${dim._16px}`;
    return '0';
  }};
  font-size: ${props => props.type === 'section' ? dim._12px : dim._14px};
  font-weight: ${props => props.type === 'section' ? '600' : 'normal'};
  background-color: ${props => props.theme.color.white};
  :hover {
    background-color: ${props =>  props.type === 'text' ? props.theme.color.highlights_blue : props.theme.color.white};
  }
  color: ${props => props.color || props.theme.color.base_20};
  cursor: ${props => props.type === 'text' ? 'pointer' : ''};

  .sectionBreaker {
    height: 1px;
    background-color: ${props => props.theme.color.base_80};
  }
`;

export default StyledDropDownRow;
