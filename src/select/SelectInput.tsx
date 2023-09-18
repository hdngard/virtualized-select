import styled from "@emotion/styled";
import {ArrowDown} from "../icons/ArrowDown";

interface StyledInputProps {
    isOpen: boolean;
}

const StyledInput = styled.div<StyledInputProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 6px 12px;
  max-height: 32px;
  font-size: 13px;
  line-height: 20px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid ${props => props.isOpen ? '#4971FF' : 'white'};

  &:hover, &:focus {
    cursor: pointer;
    border-color: #4971FF;
  }
`

interface SelectInputProps {
    isOpen: boolean;
    setIsOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
    value: string;
}

export function SelectInput(props: SelectInputProps) {
    const {isOpen, setIsOpen, value} = props;

    const handleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <StyledInput tabIndex={0} isOpen={isOpen} onClick={handleOpen}>
            <p>{value ? value : 'LastName FirstName, jobTitle'}</p>
            <ArrowDown/>
        </StyledInput>
    )
}