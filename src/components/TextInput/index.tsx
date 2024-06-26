import { HTMLInputTypeAttribute } from "react";

import { Container, Input, Label } from "./style"

interface ITextInputProps {
  label?: string;
  isRequired?: boolean;
  name: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: ITextInputProps) => {
  return (
    <Container>
      {props.label && <Label isRequired={!!props.isRequired}>{props.label}:</Label>}
      <Input 
        className="px-1 py-2"
        type={props.type || "text"} 
        name={props.name} 
        value={props.value} 
        onChange={props.onChange} 
        placeholder={props.placeholder} 
      />
    </Container>
  )
};

export default TextInput;