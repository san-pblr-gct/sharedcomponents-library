import { createGlobalStyle } from 'styled-components';

export const minSupportedWidth = 1024;
export const maxSupportedWidth = 1366;

let { innerWidth } = window;
if (innerWidth < minSupportedWidth) {
  innerWidth = minSupportedWidth;
} else if (innerWidth > maxSupportedWidth) {
  innerWidth = maxSupportedWidth;
}
export const scaleFactor = innerWidth / 1366;

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: ${props => props.theme.color.base_90};
    color: ${props => props.theme.color.base_20};
    font-size: ${props => props.theme.dim._14px};
    margin: 0;
    height: 100%;
    scrollbar-width: none !important;
  }

  textarea {
   font-family: inherit;
   font-size: inherit;
  }

  input {
   font-family: inherit;
   font-size: inherit;
  }

  button {
   font-family: inherit;
   font-size: inherit;
   user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none;
  }

  img {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
  }

  a {
    text-decoration: none;
    :active, :visited {
      color: ${props => props.color || props.theme.color.blue_50};
    }
  }

  * {
    outline: none;
  }

  #root {
    height: 100%;
    min-width: ${minSupportedWidth}px;
    justify-content: center;
    position: relative;
  }

  .loaderContainer {
    background: ${props => props.theme.color.transparent};
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .loaderWrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .loader {
    color: ${props => props.theme.color.tomato};;
    font-size: ${props => props.theme.dim._8px};
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;

  }
  @-webkit-keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }
  @keyframes load4 {
    0%,
    100% {
      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }
    12.5% {
      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    25% {
      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    50% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }
    75% {
      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }
    87.5% {
      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
  }

  .icon {
    height: ${props => props.theme.dim._24px};
    width: ${props => props.theme.dim._24px};
  }

  .global-dropDown-container {
    position: relative;
  }

  .showDropDownUp {
    right: 0;
    bottom: ${props => props.theme.dim._32px};
  }

  .showDropDownNormal {
    right: 0;
  }

  // font ---------------
  .title56  {
    font-size: ${props => props.theme.dim._56px};
    font-weight: normal;
    line-height: 1.14;
    letter-spacing: -${props => props.theme.dim._scale(1.12)};
    font-family: inherit;
  }
  
  .header40 {
    font-size: ${props => props.theme.dim._40px};
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: normal;
    font-family: inherit;
  }

  .header32 {
    font-size: ${props => props.theme.dim._32px};
    font-weight: normal;
    line-height: 1.25;
    letter-spacing: normal;
    font-family: inherit;
  }

  .header24 {
    font-size: ${props => props.theme.dim._24px};
    font-weight: normal;
    line-height: 1.17;
    letter-spacing: normal;
    font-family: inherit;
  }

  .header12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}
  .subHeader20 {
  font-size: ${props => props.theme.dim._20px};
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: normal;
  font-family: inherit;
}
  .header20 {
  font-size: ${props => props.theme.dim._20px};
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: normal;
  font-family: inherit;
}
  .header16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: normal;
  font-family: inherit;
}
  .body16 {
  font-size: ${props => props.theme.dim._16px};
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: normal;
  font-family: inherit;
}
  .button14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: normal;
  font-family: inherit;
}
  .button14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: ${props => props.theme.dim._scale(0.28)};
  font-family: inherit;
}
  .tag14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: normal;
  line-height: 1.43;
  letter-spacing: normal;
  font-family: inherit;
}
.text14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: ${props => props.theme.dim._scale(0.28)};
  font-family: inherit;
}
  .note14 {
  font-size: ${props => props.theme.dim._14px};
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}

.text12 {
  font-size:  ${props => props.theme.dim._12px};
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}

.textNormal12 {
  font-size:  ${props => props.theme.dim._12px};
  font-weight: normal;
  line-height: 1.67;
  letter-spacing: normal;
  font-family: inherit;
}

.timeStamp12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
}

.textBold12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: ${props => props.theme.dim._scale(1.33)};
  letter-spacing: ${props => props.theme.dim._scale(0.24)};
  font-family: inherit;
}

.textItalic12 {
  font-size: ${props => props.theme.dim._12px};
  font-weight: 500;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
}

.label10 {
  font-size: ${props => props.theme.dim._10px};
  font-weight: 500;
  line-height: ${props => props.theme.dim._12px};
  letter-spacing: ${props => props.theme.dim._scale(0.2)};
  font-family: inherit;
}

  .no-user-select{
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
  }

.baseStyles__BaseModalBackground-sc-12bzkqq-0 {
  height: 100% !important;
  width: 100% !important;
}

  .__react_component_tooltip.type-dark.place-bottom:after,
  .__react_component_tooltip.type-dark.place-bottom:before {
    content: none;
  }

  input[type=number]::-webkit-inner-spin-button, /* remove up down button from input number */
  input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

.showDarkBg {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: rgba(0,0,0,0);
  align-items: center;
  justify-content: center;
}
`;

export default GlobalStyle;