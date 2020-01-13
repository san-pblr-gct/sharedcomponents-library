import React, { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import StyledButton from './Button.styled';


/**
 * Button component to render button with addition properties passed in props
 * @param {String} borderRadius
 * @param {Boolean} isLoader
 * @param {String} fontColor
 * @param {String} fontSize
 * @param {String} buttonColor
 * @param {String} type
 * @param {Number} width
 */

const Button = React.memo(function Button(props) {
  const [buttonState, setButtonState] = useState('default');


  const _handleOnClick = () => {
    setButtonState('focus');
    props.onClick();
  };

  return (
    <StyledButton theme={theme}
      {...props}
      onMouseEnter={() => props.onMouseEnter ? props.onMouseEnter() : setButtonState('enter')}
      onMouseLeave={() => props.onMouseLeave ? props.onMouseLeave() : setButtonState('default')}
      onClick={() => _handleOnClick()}
      className={props.className ? `${props.className} button14` : 'button14'}
      state={buttonState}
      hidden={props.hidden}
    >
      {

        props.isLoader ?
        <div className="loaderImage"></div>
        // eslint-disable-next-line no-nested-ternary
        :props.imageUrl ?
          <>
            <img
              src={props.imageUrl}
              alt='imageUrl'
              id='image url'
              className="icon buttonImage"
            />
            <div>
              {
                props.buttonText
              }
            </div>
          </>
          :
          props.buttonText
      }
    </StyledButton>
  );
});

export default Button;

const defaultFunction = () => console.log('Required Function');

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  isLoader: PropTypes.bool
};

Button.defaultProps = {
  onClick: defaultFunction,
  type: 'default',
  isLoader: false
};