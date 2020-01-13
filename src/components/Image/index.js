import React from 'react';
import PropTypes from 'prop-types';

const Image = React.memo(function Image(props) {
  return (
    <img
      hidden={props.hidden}
      id={props.id}
      key={props.id}
      className={`${props.className} icon`}
      src={props.src}
      alt={props.alt}
      onClick={props.onClick}
      ref={props.ref}
    />
  );
});

export default Image;

const defaultFunction = () => console.log('RequiredFunction');

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func
}

Image.defaultProps = {
  alt: 'imageAlt',
  onClick: defaultFunction
}