import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

import { SignUp } from '../SignUp';
import {
    Container,
    Input,
    Label,
    Form,
    Button,
    Brand,
    Content
} from "./styles";


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn} = useAuth();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            password,
        }
        signIn(data);
    }

    return (
        <Container>
            <Content>
                <Form id="sign-in" onSubmit={handleSubmit}>
                    <Brand>CalendarLab</Brand>
                    <Label>Email
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                    </Label>

                    <Label>Senha
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            name="password"
                            required
                        />
                    </Label>

                    <Button form="sign-in" type="submit">Entrar</Button>
                </Form>
                <SignUp/>
            </Content>
        </Container>
    )
}