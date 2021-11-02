import { VFC } from "react";
import { useCallback } from "react";
import styled from "styled-components";

const checkboxSize = "1.5rem";

const Input = styled.input`
  position: relative;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  width: ${checkboxSize};
  height: ${checkboxSize};
  background: transparent;
  z-index: 0;
  cursor: pointer;
  margin: 0;
  &:checked:after {
    content: url(./checkmark.svg);
    display: block;
    width: ${checkboxSize};
    height: ${checkboxSize};
    position: absolute;
    top: 0;
    font-size: 1.25rem;
    left: 0px;
    z-index: 0;
    background: #000;
    border-radius: 4px;
    color: #fff;
    text-align: center;
  }
  &:before {
    box-sizing: border-box;
    content: "";
    display: block;
    width: ${checkboxSize};
    height: ${checkboxSize};
    border: 1px solid #000;
    border-radius: 4px;
    background: "white";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
`;

const Container = styled.div`
  margin-right: 1rem;
  height: 1.5rem;
  @media (min-width: 450px) {
    margin-right: 2rem;
  }
`;

type Checkboxprops = {
  className?: string;
  onChange?: (checked: boolean) => void;
  checked: boolean;
};

const Checkbox: VFC<Checkboxprops> = ({ className, onChange, checked }) => {
  // const [checked, setChecked] = useState(checked);
  const handleOnChange = useCallback(() => {
    // setChecked(!checked);
    onChange && onChange(!checked);
  }, [checked, onChange]);
  return (
    <Container>
      <Input
        onChange={handleOnChange}
        type="checkbox"
        checked={checked}
        className={className}
      />
    </Container>
  );
};

export default Checkbox;
