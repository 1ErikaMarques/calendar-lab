import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  button {
    position: absolute;
    padding-bottom: 4rem;
    border: none;
    outline: none;    
    cursor: pointer;      

      span {        
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.03rem;
      color: var(--gray-dark);
        &:hover {
          color: var(--purple);        
    }     
  }      
}
`;


