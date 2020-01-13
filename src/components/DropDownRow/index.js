import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import StyledDropDownRow from './DropDownRow.styled';

const DropDownRow = React.memo(function DropDownRow(props) {
  const { text, type, color } = props.data;

  return (
    <StyledDropDownRow theme={theme}
      className={`${props.className} row`}
      onClick={props.onClick}
      hidden={props.hidden}
      id={props.id}
      key={props.id}
      type={type}
      color={color}
    >
      {text}
      {type === 'section-breaker' ? <div className="sectionBreaker" /> : ''}
    </StyledDropDownRow>
  );
});

export default DropDownRow;


DropDownRow.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

DropDownRow.defaultProps = {
  type: 'default',
  color: 'White',
  text: 'defaultText'
};