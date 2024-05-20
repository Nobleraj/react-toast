import React, { useState, createContext } from "react";
import { useContext } from "react";
import {
  Body,
  Header,
  Wrapper,
  Item,
  Title,
  Container,
} from "./Accordion.styles";

const ToggleContext = createContext();

export default function Accordion({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

Accordion.Wrapper = function AccordionWrapper({ children, ...rest }) {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

Accordion.Title = function AccordionTitle({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>;
};

Accordion.Item = function AccordionItem({ children, ...rest }) {
  const [toggleShow, setToggleShow] = useState(false);
  const toggleIsShown = (isShow) => setToggleShow(!isShow);
  return (
    <ToggleContext.Provider value={{ toggleShow, toggleIsShown }}>
      <Item {...rest}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.ItemHeader = function AccordionHeader({ children, ...rest }) {
  const { toggleShow, toggleIsShown } = useContext(ToggleContext);
  return (
    <Header {...rest} onClick={() => toggleIsShown(toggleShow)}>
      {children}
      <span>{toggleShow ? "-" : "+"}</span>
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...rest }) {
  const { toggleShow } = useContext(ToggleContext);
  return (
    <Body className={`${toggleShow ? "open" : ""}`} {...rest}>
      {children}
    </Body>
  );
};
