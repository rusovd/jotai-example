import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

export const InputWithCondition = styled.input<{ hasError: boolean }>`
  border: 1px solid ${(props) => (props.hasError ? 'red' : 'black')};
  color: ${(props) => (props.hasError ? 'red' : 'black')};
  padding: 5px;
`;