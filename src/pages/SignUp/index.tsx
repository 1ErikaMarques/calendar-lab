import { useState } from 'react';
import Modal from 'react-modal';
import { Brand, Button, Input, Label } from '../Login/styles';
import { Container } from './styled';
import closeImg from '../../assets/close.svg'

export function SignUp(){
  const[modalIsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return(
    <Container>
      <button onClick={handleOpenModal}>
        <h4>Cadastre-se</h4>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <Brand>CalendarLab</Brand>
        <button type="button" onClick={handleCloseModal} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <Label>Nome
          <Input></Input>
        </Label>

        <Label>Email
          <Input
            type="email"
            name="email"
            required
          >
        </Input>
        </Label>

        <Label>Senha
          <Input
          type="password"          
          name="password"
          required
          >     
          </Input>
        </Label>

        <Button>Cadastrar</Button>

      </Modal>
    </Container>
  )
}