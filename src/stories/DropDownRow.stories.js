import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs/react";
import { DropDownRow } from "../components";

export default {
  title: "DropDownRow",
  component: DropDownRow,
  decorators: [withKnobs]
};

const DropDownOptions = [
  { id: 1, text: "Item 1",type:"text" },
  { id: 2, text: "Item 2" ,type:"text" },
  { id: 3, text: "Item 3" ,type:"text" },
  { id: 4, text: "Item 4" ,type:"text" },
  { id: 5, text: "Item 5" ,type:"text" }
];
const DropDownOptionsWithSection = [
  { id: 1, text: "Item 1",type:"text" },
  { id: 2, text: "Item 2" ,type:"text" },
  { id: 3, text: "" ,type:"section-breaker" },
  { id: 4, text: "Item 3" ,type:"text" },
  { id: 5, text: "Item 4" ,type:"text" }
];

export const Default = () => (
  <React.Fragment>
    {DropDownOptions.map(child => (
      <DropDownRow key={child.id} data={child} id={child.id} />
    ))}
  </React.Fragment>
);

export const WithSection = () => (
  <React.Fragment>
    {DropDownOptionsWithSection.map(child => (
      <DropDownRow key={child.id} data={child} id={child.id} />
    ))}
  </React.Fragment>
);
