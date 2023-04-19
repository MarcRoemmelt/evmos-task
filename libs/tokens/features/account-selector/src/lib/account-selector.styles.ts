import styled from 'styled-components';

export const StyledSection = styled.section`
  width: 550px;
`;

export const StyledSubmit = styled.input`
  font-size: 16px;
  border: 2px solid black;
  background: white;
  font-weight: bold;
  padding: 4px;
  appearance: none;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledInput = styled.input<{ isValid: boolean; isEmpty: boolean }>`
  width: 400px;
  padding: 4px;
  font-size: 16px;

  border: 2px solid
    ${({ isEmpty, isValid }) => {
      if (isEmpty) return 'black';
      if (isValid) return 'green';
      return 'red';
    }};
  background: ${({ isEmpty, isValid }) => {
    if (isEmpty) return 'white';
    if (isValid) return 'rgba(157, 249, 149, 0.44)';
    return 'rgba(249, 149, 149, 0.44)';
  }};
`;

export const StyledError = styled.p`
  color: red;
  width: 100%;
`;
