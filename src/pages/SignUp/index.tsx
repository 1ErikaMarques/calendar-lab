import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Brand, Button, Input, Label } from '../Login/styles';
import { Container } from './styles';
import closeImg from '../../assets/close.svg'
import { useAuth } from '../../hooks/AuthContext';

//adicionando para acessibilidade da modal
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
            className="close-modal"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>
          <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />          
          

          <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}            
              required
            />          
          

          <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}                     
              required
            />
            <Button >Cadastrar</Button>
        </form>

      </Modal>
    </Container>
  )
}