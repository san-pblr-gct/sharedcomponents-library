import React, { useState, useEffect, Suspense } from 'react';
import propTypes from 'prop-types';
import { isURL } from '../../utils/app.utils';
import StyledAvatar from './Avatar.styled';
import theme from '../../styles/theme';

const Avatar = React.memo(function Avatar(props) {
  const [showInitials, setShowInitials] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setImage(props.image);
    setShowInitials(!isURL(props.image));
  }, [props.image]);

  useEffect(() => {
    setName(props.name);
    const initials_first_name = props.name && props.name.split(' ')[0] ? props.name.split(' ')[0][0].toUpperCase() : '';
    const initials_last_name = props.name && props.name.split(' ')[1] ? props.name.split(' ')[1][0].toUpperCase() : '';
    setInitials(initials_first_name + initials_last_name);
  }, [props.name]);

  return (
    <StyledAvatar
      hidden={props.hidden || (!initials)}
      className={props.className}
      size={props.size}
      name={name}
      theme={theme}
    >
      <div className="avatarContainer">
        <>
          <div
            className="defaultImage"
            hidden={!showInitials}
            id="initials"
          />
          <p className="defaultText"
            hidden={!showInitials}
          >
            {initials}
          </p>
        </>
        <Suspense fallback={
          <>
            <div
              className="defaultImage"
              id="initials"
            />
            <p className="defaultText">
              {initials}
            </p>
          </>
        }
        >
          <img
            className="defaultImage"
            src={image}
            alt="avatar"
            id="image"
            hidden={image == null || showInitials}
            onError={() => setShowInitials(true)}
            onLoad={() => setShowInitials(false)}
          />
        </Suspense>
      </div>
    </StyledAvatar >
  );
});

export default Avatar;

Avatar.propTypes = {
  size: propTypes.string,
  name: propTypes.string,
  image: propTypes.string
};

Avatar.defaultProps = {
  size: 'M',
  name: '',
  image: null,
};