import { Input, InputContainer, InputLabel } from "components/common";
import { ERROR_MESSAGE, INPUT_FULL_LENGTH } from "constant/cardInput";
import { useError } from "hook/useError";
import styled from "styled-components";
import { isNumeric } from "utils/validate";

const CVCInfo = {
  label: "cvc",
  $width: "84px",
  $textPosition: "center",
  type: "password",
};

interface CVCInputProps {
  setCVC: (value: number) => void;
  validateCVCInput: (cvc: number) => boolean;
}

export const CVCInput = ({ validateCVCInput, setCVC }: CVCInputProps) => {
  const { isError, setErrorState, removeError } = useError();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNumeric(value)) {
      const onlyNumbers = value.match(/\d+/g)?.join("") || "";
      e.target.value = onlyNumbers;
      return;
    }

    if (value.length > INPUT_FULL_LENGTH.CVC) {
      e.target.value = value.slice(0, -1);
      return;
    }

    setCVC(Number(value));
  };

  const validate = (e: React.FocusEvent<HTMLInputElement>) => {
    const validity = validateCVCInput(Number(e.target.value));
    setErrorState(!validity);
  };

  return (
    <InputContainer>
      <InputLabel text="보안 코드 (CVC/CVV)" name="CVC" />
      <Wrapper>
        <Input
          {...CVCInfo}
          handleInput={handleInput}
          handleOutFocus={validate}
          handleFocus={removeError}
          error={{
            isError: isError,
            errorMessage: ERROR_MESSAGE.CVC,
          }}
        />
        <HelpIcon
          onClick={() => {
            console.log("CVC설명");
          }}
        >
          ?
        </HelpIcon>
      </Wrapper>
    </InputContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
`;

const HelpIcon = styled.div`
  position: absolute;
  transform: translate(95px, -7px);

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  width: 27px;
  height: 27px;
  border: 1px solid darkgray;
  border-radius: 50%;

  font-size: 15px;
  font-weight: 700;
  color: darkgray;
`;
