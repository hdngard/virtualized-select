import styled from "@emotion/styled";

interface StyledSelectedOptionProps {
    offsetTop: number;
    itemHeight: number;
}

const StyledSelectOption = styled.button<StyledSelectedOptionProps>`
  position: absolute;
  top: 0;
  transform: translateY(${props => props.offsetTop}px);
  height: ${props => props.itemHeight}px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid transparent;
  text-align: left;

  &:hover {
    background-color: #E4EAFF;
    cursor: pointer;
  }

  &:focus {
    border: 2px solid #4971FF;
  }

  div {
    width: 16px;
    height: 16px;
    background-color: #4971FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: white;
    font-size: 11px;
  }

  p {
    max-width: 300px;
    overflow: hidden;
  }
`

interface SelectOptionProps {
    firstName: string;
    lastName: string;
    job?: string | undefined;
    itemHeight: number;
    offsetTop: number;
    setValue: (value: string) => void;
}

export function SelectOption(props: SelectOptionProps) {
    const {
        firstName,
        lastName,
        job,
        offsetTop,
        itemHeight,
        setValue
    } = props;

    return (
        <StyledSelectOption
            onClick={() => setValue(`${firstName} ${lastName}, ${job}`)}
            itemHeight={itemHeight}
            offsetTop={offsetTop}
        >
            <div>{lastName.charAt(0)}</div>
            <p>{firstName} {lastName}, {job}</p>
        </StyledSelectOption>
    )
}