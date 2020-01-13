import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text ,boolean, select } from '@storybook/addon-knobs/react';
import  {Button}  from '../components';
import ProhibitedIcon from '../assets/images/prohibitedIcon.svg';
import SelectionWhite from '../assets/images/selectionWhite.svg';
import Alert from '../assets/images/alert.svg';

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs]
};

const imageOptions=[ProhibitedIcon,SelectionWhite,Alert]

export const PrimaryButton = () =>   <Button
className="inviteBtn button14"
primaryBtn
buttonText={text("Label", "Primary Button")}
disabled ={boolean('Disabled',false)}
isLoader ={boolean('Loading',false)}
width="auto"
hoverColor={text("Hover color", "")}
activeColor={text("Active color", "")}
buttonColor={text("Button color", "")}
fontColor={text("Font color", "")}
fontSize={text("Font size","14px")}
imageUrl={select("Image URL",imageOptions,ProhibitedIcon)}

/>

export const SecondaryButton = () =>  <Button
secondaryBtn
className='button14'
style={{ marginLeft: '8px' }}
buttonText={text("Label", "Secondary Button")}
isLoader ={boolean('Loading',false)}
disabled ={boolean('Disabled',false)}
width="auto"
hoverColor={text("Hover color", "")}
activeColor={text("Active color", "")}
buttonColor={text("Button color", "")}
fontColor={text("Font color", "")}
fontSize={text("Font size","14px")}
imageUrl={select("Image URL",imageOptions,ProhibitedIcon)}
/>
