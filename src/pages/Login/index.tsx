import { useState } from "react";
import { Container } from "./style";
import TextInput from "../../components/TextInput";
import User from "../../services/account";
import { toast } from "react-toastify";
import { useAppContext } from "../../context";
import { Navigate } from "react-router-dom";
import securityImage from '../../assets/bank_people.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

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
    <Container className="bg-inherit md:grid grid-cols-2 h-screen">
      <div className="flex flex-col rounded-xl left-48 overflow-x-hidden">  
        <div className='flex items-center gap-2 p-10'>
          <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
          <h1 className='text-xs md:text-xl font-bold'>MyBank</h1>
        </div>
        <div className="flex items-center justify-center p-10 rounded-xl left-48">
          <div className="flex flex-col gap-12 w-[470px]">
            {activeView === "LOGIN" && (
              <>
                <h3 className="text-4xl tracking-wide text-center font-bold">Acesse a sua Conta</h3>
                <hr></hr>
                <div className="flex flex-col gap-8 mt-200">
                  <TextInput
                    name="email"
                    placeholder="Digite o seu email"
                    label="Email"
                    type="email"
                    onChange={handleAccessForm}
                    value={accessForm.email || ""}
                  />
                  <TextInput
                    name="password"
                    placeholder="Digite a sua senha"
                    label="Senha"
                    type="password"
                    onChange={handleAccessForm}
                    value={accessForm.password || ""}
                  />
                  <div>
                    <p className="mb-0.5 bg-blue text-rose-500">Esqueci a minha senha</p>
                    <p className="mb-0.5 cursor-pointer text-rose-500" onClick={switchToCreate}>Não possui uma conta?</p>
                  </div>
                </div>
                <button 
                  onClick={login} 
                  disabled={isLoginFormValid()}
                  className="w-full bg-black disabled:bg-black text-white rounded-md py-2 mt-5 cursor-pointer"
                >
                  Entrar
                </button>
              </>
            )}
            {activeView === "REGISTER" && (
              <>
                <h3 className="text-3xl tracking-wide text-center">Criar Conta</h3>
                <hr></hr>
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
                  <p className="mb-0.5 cursor-pointer text-rose-500" onClick={switchToLogin}>Já possuo uma conta</p>
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
      </div>
      <div className="flex justify-end items-end h-screen drop-shadow-xl flex justify-start grid grid-columns-1 mt-0 md:justify-center items-center overflow-hidden hidden sm:block">
        <img className="h-full" src={securityImage}></img>
        {/* <div className="flex my-0 grid grid-columns-2">
          <p className="flex items-center justify-center text-4xl leading-3 font-bold text-slate-800 mt-0">Mantenha seu dinheiro SEGURO no </p>
          <p className="flex items-center justify-center text-4xl leading-3 font-bold text-pink-800 mt-0">melhor banco: O MyBank !</p>
        </div> */}
        {/* <div className="flex items-center justify-center">
          <img className="flex w-75 h-65" src={securityImage}></img>
        </div> */}
      </div>
    </Container>
  )
};

export default Login;