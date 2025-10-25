import {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {login} from "../redux/auth/authSlice";
import  type {AppDispatch} from '../store';

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #ffffffff;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #4f4b4bff;
    border-radius: 6px;
    font-size: 1rem;
`;

const Title = styled.h2`
    margin-bottom: 90px;
    font-family: 'Inter', sans-serif;
    color: #333333;
    align-self: center;

`;

const Button = styled.button`
    background-color: #525254ff;
    color: white;
    padding: 8px;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 10px;
    height: 40px;
    width: 80%;
    align-self: center;

    &:hover {
        background-color: #fce144ff;
    }
`;

const Error = styled.p`
    color:red;
    font-size: 0.9rem;
`;

export const Login_screen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (username === "admin" && password === "password") {
            alert("Inicio de sesion exitoso");
            dispatch(login(username));
        } else {
            setError("Usuario o contraseña incorrectos.");
        }

        if (!username || !password) {
            setError("Todos los campos son requeridos.");
            return;
        }

    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Pokedex</Title>
                <Input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Error>{error}</Error>}
                <Button type="submit">Iniciar Sesion</Button>
            </Form>
        </Container>
    );
};
