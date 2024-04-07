import { useState } from "react";
import { Container } from "./style";
import TextInput from "../../components/TextInput";

type LoginForm = {
  email?: string;
  password?: string;
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({});
  
  const handleLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((currState) => ({ ...currState, [event.target.name]: event.target.value }));
  };
  
  return (
    <Container>
      <form>
        <TextInput
          name="email"
          placeholder="Email"
          label="Email"
          onChange={handleLoginForm}
          value={loginForm.email || ""}
        />
        <TextInput
          name="password"
          placeholder="Senha"
          label="Senha"
          onChange={handleLoginForm}
          value={loginForm.password || ""}
        />
      </form>
    </Container>
  )
};

export default Login;