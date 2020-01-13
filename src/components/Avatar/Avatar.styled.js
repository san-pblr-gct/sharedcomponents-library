import styled from 'styled-components';
import { dim } from '../../styles/theme';

const getSize = (props) => {
  switch (props.size.toString().charAt(0).toUpperCase()) {
    case 'X': return dim._scale(96);
    case 'L': return dim._40px;
    case 'M': return dim._32px;
    case 'S': return dim._24px;
    default: return dim._32px;
  }
};

const StyledAvatar = styled.div`
    .avatarContainer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .defaultImage {
        width: ${props => getSize(props)};
        height: ${props => getSize(props)};
        border-radius: 100%;
    }

    .defaultText {
        position: absolute;
        color: ${props => props.theme.color.white};
        font-size: ${(props) => {
    switch (props.size.toString().charAt(0).toUpperCase()) {
      case 'X': return dim._40px;
      case 'L': return dim._20px;
      case 'M': return dim._16px;
      case 'S': return dim._12px;
      default: return dim._16px;
    }
  }};
        margin: 0;
    }

    .defaultImage {
      background-color: ${props => props.theme.randomColor(props.name || '')};
      border: ${(props) => `1px solid ${props.theme.color.base_80}`};
    }
`;

export default StyledAvatar;
