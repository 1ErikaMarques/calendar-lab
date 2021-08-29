import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;  
  margin-top: 12rem;  
`;

export const Content = styled.div``;

export const Form = styled.form`
  max-width: 380px;
  height: 33rem;
  border-radius: 0.25rem;
  background-color: var(--background);
  box-shadow: 0 10px 70px rgb(0 0 0 / 15%);
  padding: 2rem;
`;

export const Brand = styled.h3`
  color: var(--text-title);
  font-size: 1.5rem;
  margin: 1rem 0 3rem 0;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.4rem;
  margin: 0.1rem 0 1.5rem 0;
  padding:  0 0.8rem;
  border-radius: 0.25rem;
  border: 1px solid var(--gray-light);
  background-color: var(--background);
  transition: 400ms ease;
  color: (--gray-dark);

    &:hover {
        background-color: var(--background);
        outline: none;
        box-shadow: 0 0 0 4px rgb(91 33 182 / 10%);
        border-color: var(--purple);
    }
    &:focus {
      background-color: var(--background);
      outline: none;
      border: var(--purple);
      box-shadow: 0 0 0 4px rgb(91 33 182 / 10%);
      transition: 400ms ease;
    }

`;

export const Label = styled.label`   
  padding:  0.3rem;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  font-weight: 500;
  color: var(--gray-medium);  
    
    ${Input}:hover  ~ & {
      color: var(--purple);
}
`;

export const Button = styled.button`
  width: 100%;
  margin: 1.5rem 0 3rem 0;
  padding: 0.7rem ;
  background-color: var(--purple);
  color: #FFF;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  border-radius: 4px;
  border: 1px solid var(--purple);
  transition: filter 0.2s;
  cursor: pointer;

    &:hover {
      transition: 0.25s;
      
      filter: brightness(0.8);
    }
    
    &:focus {
      transition: 0.25s;
      box-shadow: inset 22em 0 0 0 var(--purple);
      color: var(--background);
    }

`;