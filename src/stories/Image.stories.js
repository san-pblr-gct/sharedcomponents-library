import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text ,boolean, select } from '@storybook/addon-knobs/react';
import  {Image}  from '../components';


export default {
  title: 'Image',
  component: Image,
  decorators: [withKnobs]
};

export const WithImage = () =>     <Image
className="profileIconAccount"
src="https://image.shutterstock.com/image-photo/paragliding-above-chamonix-mont-blanc-260nw-755932549.jpg"
alt="account-user-icon"
/>

export const AlternateText = () =>     <Image
className="profileIconAccount"
alt="alternate text"
/>
