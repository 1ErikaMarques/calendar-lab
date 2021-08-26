import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Brand, Button, Input, Label } from '../Login/styles';
import { Container } from './styled';
import closeImg from '../../assets/close.svg'
import { useAuth } from '../../hooks/AuthContext';
Modal.setAppElement('#root');
export function SignUp()  {
  const[modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useAuth()

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
    }
    signUp(data);
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return  (
    <Container>
      <button onClick={handleOpenModal}>
        <span>Cadastre-se</span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        
      >        
        <Brand>CalendarLab</Brand>
        <form id="sign-up" onSubmit={handleSubmit}>
          <button 
            type="button" 
            onClick={handleCloseModal} 
            className="react-modal-close"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>
          <Label>Nome
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              required
            >        
            </Input>
          </Label>

          <Label>Email
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              required
            >
          </Input>
          </Label>

          <Label>Senha
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"         
              required
            >
            </Input>
          </Label>

          <Button >Cadastrar</Button>
        </form>

      </Modal>
    </Container>
  )
}