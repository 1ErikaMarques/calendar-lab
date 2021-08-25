import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;

  button {    
    border: none;
    outline: none;
    cursor: pointer;

      img {
        width: 120px;
        height: 20px;
      }

      h4 {
      font-size: 1rem;
      letter-spacing: 0.03rem;
      color: var(--gray-dark);
        &:hover {
          color: var(--purple);        
    }     
  }      
}
`;


