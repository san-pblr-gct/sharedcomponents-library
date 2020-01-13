import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text ,boolean, select } from '@storybook/addon-knobs/react';
import  {Avatar}  from '../components';
import User from '../assets/images/illustration-new-user.svg';


export default {
  title: 'Avatar',
  component: Avatar,
  decorators: [withKnobs]
};

const sizeOptions=["S","M","L","X"]

export const WithImage = () =>    <Avatar 
size={select("size",sizeOptions,"XL")}
name="test"
image={User}
name={text("Name", "Santhosh Kumar")}
hidden={boolean("Hide Image",false)}
/>

export const WithoutImage = () =>    <Avatar 
size={select("size",sizeOptions,"M")}
name={text("Name", "Santhosh Kumar")}

/>
