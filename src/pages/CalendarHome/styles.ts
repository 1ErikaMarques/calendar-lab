import styled from 'styled-components';

export const Container = styled.div``;

export const DeleteEvent = styled.button`
  position: absolute;
  right: 4rem;
  top: 1.1rem;
  border: 0;
  background: transparent;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const CheckBox = styled.input`
  width: 2rem;
`;

export const Span = styled.span`
  position: absolute;
  font-size: 0.8rem;
  color: var(--red);
  margin-top: -1rem;
  right: 3.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 2rem 0 0 2rem;
    font-size: 1.5rem;
    color: var(--gray-dark)
  }
`;

export const Logout = styled.button`
  margin: 2.1rem 6rem 0 0;
  background-color: transparent;
  border: none;

  &:hover {
    filter: brightness(0.1);
  }
`;
