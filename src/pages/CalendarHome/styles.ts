import styled from "styled-components";

export const Container = styled.div`
`;

export const CheckBox = styled.input`  
  width: 2rem;
   > input:checked {
      color: red;
  }   
`;

export const Span = styled.span `
  position: absolute;
  font-size: 0.8rem;
  color: var(--red);
  margin-top: -1rem;  
  right: 3.5rem;  
`;

