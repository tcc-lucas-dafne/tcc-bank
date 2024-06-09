import { useState } from "react";
import { Container } from "./style";
import TextInput from "../../components/TextInput";
import User from "../../services/account";
import { toast } from "react-toastify";
import { useAppContext } from "../../context";
import { Navigate } from "react-router-dom";

type AccessForm = {
  email?: string;
  password?: string;
  name?: string;
  passwordConfirmation?: string;
}

const Login = () => {
  const [accessForm, setAccessForm] = useState<AccessForm>({});
  const [activeView, setActiveView] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const handleAccessForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessForm((currState) => ({ ...currState, [event.target.name]: event.target.value }));
  };

  const login = async () => {
    try {
      if (!accessForm.email || !accessForm.password) return;
      const response = await User.login({ email: accessForm.email, password: accessForm.password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.location.reload();
      }
    } catch (error: unknown) {
      console.error('[login]: ', error);
    }
  };

  const register = async () => {
    try {
      if (!accessForm.name || !accessForm.email || !accessForm.password || accessForm.password !== accessForm.passwordConfirmation) return;
      const response = await User.createUser({ name: accessForm.name, email: accessForm.email, password: accessForm.password })  
      if (response.status === 201) {
        toast.success("Conta criada com sucesso!");
      }
    } catch (error: unknown) {
      console.error('[register]: ', error);
    }
  };

  const switchToCreate = () => {
    setAccessForm({});
    setActiveView("REGISTER");
  };

  const switchToLogin = () => {
    setAccessForm({});
    setActiveView("LOGIN");
  };

  const isLoginFormValid = () => {
    return !(accessForm.email && accessForm.password);
  };

  const isRegisterFormValid = () => {
    return !(
      accessForm.email && 
      accessForm.name && 
      accessForm.password && 
      accessForm.passwordConfirmation && 
      accessForm.password === accessForm.passwordConfirmation
    );
  };

  return (
    <Container className="flex items-center justify-center flex-col h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 w-96 rounded-xl absolute left-48">
        <div className="flex flex-col gap-8">
          {activeView === "LOGIN" && (
            <>
              <h3 className="text-3xl tracking-wide text-center">Acesse a sua Conta</h3>
              <div className="flex flex-col gap-3">
                <TextInput
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                  onChange={handleAccessForm}
                  value={accessForm.email || ""}
                />
                <TextInput
                  name="password"
                  placeholder="Senha"
                  label="Senha"
                  type="password"
                  onChange={handleAccessForm}
                  value={accessForm.password || ""}
                />
                <div>
                  <p className="mb-0.5">Esqueci a minha senha</p>
                  <p className="mb-0.5 cursor-pointer" onClick={switchToCreate}>Não possui uma conta?</p>
                </div>
              </div>
              <button 
                onClick={login} 
                disabled={isLoginFormValid()}
                className="w-full bg-black disabled:bg-black text-white rounded-md py-2 mt-5"
              >
                Entrar
              </button>
            </>
          )}
          {activeView === "REGISTER" && (
            <>
              <h3 className="text-3xl tracking-wide text-center">Criar Conta</h3>
              <div className="flex flex-col gap-3">
                <TextInput
                  name="name"
                  placeholder="Nome Completo"
                  label="Nome Completo"
                  type="text"
                  onChange={handleAccessForm}
                  value={accessForm.name || ""}
                />
                <TextInput
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                  onChange={handleAccessForm}
                  value={accessForm.email || ""}
                />
                <TextInput
                  name="password"
                  placeholder="Senha"
                  label="Senha"
                  type="password"
                  onChange={handleAccessForm}
                  value={accessForm.password || ""}
                />
                <TextInput
                  name="passwordConfirmation"
                  placeholder="Confirmação de Senha"
                  label="Confirmação de Senha"
                  type="password"
                  onChange={handleAccessForm}
                  value={accessForm.passwordConfirmation || ""}
                />
                <p className="mb-0.5 cursor-pointer" onClick={switchToLogin}>Já possuo uma conta</p>
              </div>
              <button 
                onClick={register} 
                disabled={isRegisterFormValid()}
                className="w-full bg-black disabled:bg-black text-white rounded-md py-2 mt-5"
              >
                Criar Conta
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  )
};

export default Login;