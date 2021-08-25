import { SignUp } from "../SignUp";
import {
  Container, 
  Input,   
  Label,  
  Form,
  Button,
  Brand
} from "./styles";


export function Login(){
  return(
  <Container>   
      <Form>

        <Brand>CalendarLab</Brand>
        <Label>Email     
          <Input
            type="email"
            name="email"
            required      
          />
        </Label>
        <Label>Senha
          <Input
            type="password"
            required
            name="password"
          />
        </Label>

          <Button>Entrar</Button>
          <SignUp />     
        </Form>
      
  </Container>
  )
}