import { useAppContext } from "../../context";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, Divider, Grid } from "@mui/material";
import { formatCurrency } from "../../utils/format-currency";
import creditCard from '../../assets/black_credit_card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faKey, faCopy, faBarcode, faReceipt } from '@fortawesome/free-solid-svg-icons';
import Graphic from "../../components/Graphic";
import Timeline from "../../components/Timeline";
import bankSecurity from '../../assets/happy_people.png';
import aboutUs from '../../assets/colorful_people.png';
import happy from '../../assets/happy.png';
import { Modal, ModalDialog, DialogTitle, DialogContent, ModalClose, Typography } from '@mui/joy';
import { useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import { toast } from "react-toastify";
import User from "../../services/account";

const Home = () => {
  const { user } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newLimitAmount, setNewLimitAmount] = useState<number>(0);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);

  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  }

  const createIncreaseLimitRequest = async () => {
    try {
      setIsLoading(true);
      await User.createLimitIncreaseRequest(newLimitAmount);
      toast.success("Solicitação realizada com sucesso!");
    } catch (err) {
      console.error('Err: ', err);
      toast.error("Ocorreu um erro ao realizar a solicitação de aumento de limite. Tente novamente mais tarde");
    } finally {
      setIsLoading(false);
      closeRequestModal();
    }    
  }

  if (!user) return null;

  return (
    <div className="md:grid grid-cols-2 bg-neutral-50 h-full">
      <Box sx={{ maxWidth: { xs: "500px", md: "100%", lg: "100%" }, marginLeft: { md: "2rem", lg: "2rem" }, marginTop: { md: "1rem", lg: "1rem" } }}>
        <h1 className="text-left text-xs font-semibold p-3 md:text-4xl mb-4">Bem vindo de volta, {user?.name}!</h1>
        {/* <h1 className="text-left text-xs md:text-2xl font-bold mb-2"></h1> */}
        <div className="md:grid grid-cols-3 grid-flow-col gap-4">
          <Card sx={{ mb: '10px', borderRadius: '1rem' }}>
            <CardContent className="text-left col-span-1">
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Banco 123</h1>
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Agência 0101</h1>
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Conta 12345678-0</h1>
              <hr></hr>
              <h1 className="align-text-bottom font-semibold text-xs md:text-base mb-2 p-1 mt-10">Chave PIX 000.000.000-00</h1>
            </CardContent>
          </Card>
          <Card sx={{ mb: '10px', borderRadius: '1rem' }} className="rounded-3xl grid gird-col-span-2">
            <CardContent className="text-left">
              <h3 className="text-xs md:text-2xl font-bold whitespace-nowrap mb-10 p-3">Saldo da sua conta</h3>
              <h3 className="text-xs md:text-4xl font-bold whitespace-nowrap pl-3 pt-2">{formatCurrency(user?.balance)}</h3>
            </CardContent>
          </Card>
          <Card sx={{ mb: '10px', borderRadius: '1rem' }}>
            <Graphic></Graphic>
          </Card>
        </div>
        <Card sx={{ mb: '10px', borderRadius: '1rem' }} className="rounded-3xl">
          <CardContent className="text-left">
            <h3 className="text-xs md:text-2xl font-bold whitespace-nowrap mb-3 mt-5 ml-5">Cartão de Crédito</h3>
          </CardContent>
          <div className="sm:items-center content-center md:grid grid-cols-2 md:items-start content-center">
            <CardMedia
              component="img"
              image={creditCard}
              sx={{ height: '80%', maxWidth: '100%', margin: '0', display:'flex', alignItems: 'start' }}
              alt="Cartão de crédito"
            />
            <Card className="m-5 bg-neutral-50" sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)' }} variant="outlined" >
              <CardContent className="text-left" >
                <h3 className="text-xs lg:text-xl font-bold whitespace-nowrap">Total gasto</h3>
                <h3 className="text-xs lg:text-3xl font-bold whitespace-nowrap pb-10 pt-4">R$100.000,00</h3>
                <h3 className="text-xs md:text-xl whitespace-nowrap">Limite disponível {formatCurrency(user?.acc_limit)}</h3>
                <button
                  className="w-full bg-black disabled:bg-black text-white rounded-md py-2 mt-5 cursor-pointer"
                  onClick={openRequestModal}
                >
                  Aumentar meu Limite
                </button>
                <button className="w-full bg-red-700 disabled:bg-black text-white rounded-md py-2 mt-5 cursor-pointer" onClick={() => toast('TESTE')}>Bloquear cartão</button>
              </CardContent>
            </Card>
          </div>
        </Card>
      </Box>
      <div className="md:flex flex-columns bg-neutral-50 h-full">
        <Box sx={{ maxWidth: { xs: "500px", md: "100%", lg: "100%" }, marginRight: { md: "0.5rem", lg: "0.5rem" }, marginLeft: { md: "1.5rem", lg: "1.5rem" }, marginTop: { md: "1rem", lg: "1rem" } }}>
          <Card sx={{ mb: '10px', height: 'auto', borderRadius: '1rem' }}>
            <div>
            <p className='text-left font-bold text-2xl pb-2 pt-10 p-10'>Transferências/Pagamentos</p>
              <div className="grid grid-cols-3 flex justify-center items-center">
                {/* <div className='h-full'> */}
                  <div className="h-full">
                  {/* <div className="grid grid-cols-2 gap-4"> */}
                    <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)'}} className='cursor-pointer flex items-center justify-center p-8 grid grid-rows-2 m-10 rounded-xl'>
                      <FontAwesomeIcon icon={faRightLeft} className="md:w-6 h-6 m-auto text-pink-600" />
                      <span className='ml-2 text-md font-bold'>
                        Transferir
                      </span>
                    </Card>
                    </div>
                    <div  className="h-full">
                    <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-8 grid grid-rows-2 m-10 rounded-3xl '>
                      <FontAwesomeIcon icon={faBarcode} className="md:w-6 h-6  m-auto text-pink-600" />
                      <span className='ml-2 text-md font-bold'>
                        Pagar Boleto
                      </span>
                    </Card>
                    </div>
                  {/* </div> */}
                {/* </div> */}
                <div className="h-full">
                  {/* <p className='text-left p-4 font-semibold text-xl pb-2 pt-7'>Recebimentos</p> */}
                    <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-8 grid grid-rows-2 m-10 rounded-3xl'>
                      <FontAwesomeIcon icon={faReceipt} className="md:w-6 h-6 m-auto text-pink-600" />
                      <span className='ml-2 text-md font-bold'>
                        {/* Depositar PIX, Boleto ou TED
                      Definir valor e gerar qr code, chave, boleto e dados de TED */}
                        Depósitos
                      </span>
                    </Card>
                </div>
              </div>
              <div>
                <p className='text-left font-bold text-2xl pb-2 pt-0 p-10'>PIX</p>
                <div className="grid grid-cols-3 gap-3 flex justify-center items-center">
                  <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-8 grid grid-rows-2 m-10 rounded-3xl'>
                    <FontAwesomeIcon icon={faKey} className="md:w-6 h-6 m-auto text-pink-600" />
                    <span className='text-md font-bold'>
                      Chaves PIX
                    </span>
                  </Card>
                  <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)'}} className='cursor-pointer flex items-center justify-center p-10 grid grid-rows-2 m-10 rounded-3xl'>
                    <FontAwesomeIcon icon={faCopy} className="md:w-6 h-6 m-auto text-pink-600" />
                    <span className='text-md font-bold'>
                      PIX copia e cola
                    </span>
                  </Card>
                  <Card sx={{ borderRadius: '1rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-10 grid grid-rows-2 m-10 rounded-3xl'>
                    <FontAwesomeIcon icon={faRightLeft} className="md:w-6 h-6 m-auto text-pink-600" />
                    <span className='text-md font-bold'>
                      Transferir PIX
                    </span>
                  </Card>
                </div>
              </div>
              <p className='text-left font-bold text-2xl pb-2 pt-0 p-10'>Oferecemos para você</p>
              <div className="flex grid grid-cols-3">
                <div className="rounded-full text-center pl-5 p-10">
                  <img className="rounded-full w-36 h-36 m-auto pb-3" src={bankSecurity}></img>
                  <span className='text-wrap ml-2 text-2xl font-semibold'>
                    {/* Você sabia que o nosso banco se preocupa muito com a sua segurança?
                    Nós mantemos os seus dados secretos sem nenhum acesso para que você esteja sempre seguro. */}
                    Segurança
                  </span>
                </div>
                <div className="rounded-full text-center pl-5 p-10">
                  <img className="rounded-full w-36 h-36 m-auto pb-3" src={aboutUs}></img>
                  <span className='ml-2 text-2xl font-semibold'>
                    {/* Todas as suas transações são garantidas conosco. SEM ERROS E FALHAS! */}
                    Confiança
                  </span>
                </div>
                <div className="rounded-full text-center pl-5 p-10">
                  <img className="rounded-full w-36 h-36 m-auto pb-3" src={happy}></img>
                  <span className='ml-2 text-2xl font-semibold'>
                    {/* No nosso banco você pode ver um histórico de todas as operações realizadas. */}
                    Proteção
                  </span>
                </div>
              </div>
              <hr></hr>
            </div>
            {/* <div className='cursor-pointer p-10'>
                <FontAwesomeIcon icon={faKey}/>
                <span className='ml-2 text-md font-bold'>
                  Ler QR code
                </span>
              </div> */}
          </Card>
        </Box>
        <Box sx={{ maxWidth: { xs: "500px", md: "100%", lg: "100%" }, marginRight: { md: "2rem", lg: "2rem" }, marginLeft: { md: "0.5rem", lg: "0.5rem" }, marginTop: { md: "1rem", lg: "1rem" } }}>
          <Card sx={{ mb: '10px', height: '100vh', borderRadius: '1rem', padding:'1rem'}}>
            <p className='text-left font-bold text-2xl pb-10 pt-6'>Histórico de recebimentos</p>
            <Timeline/>
          </Card>
        </Box>
      </div>
      <Modal open={isRequestModalOpen} onClose={closeRequestModal}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle level="h4" className="text-center mb-2">
            Solicitar Aumento do Limite
          </DialogTitle>
          <Divider className="w-3/4 mx-auto mb-4" />
          <DialogContent>
            <div className="mb-4">
              <Typography level="body-md" maxWidth={600}>
                Ao solicitar um aumento do limite, seu pedido será revisado pela nossa equipe. Por favor, esteja ciente de que o aumento pode ser rejeitado com base em uma análise detalhada de seu histórico de conta e crédito.
              </Typography>
            </div>
            <div className="mb-4">
              <Typography level="body-md" maxWidth={600}>
                Insira o novo limite desejado.
              </Typography>
            </div>
            <div className="mb-4">
              <CurrencyInput
                id="currency-input"
                name="currency-input"
                placeholder="Digite o valor"
                className="w-full p-2 border border-gray-300 rounded"
                decimalsLimit={2}
                prefix="R$"
                groupSeparator="."
                decimalSeparator=","
                defaultValue={user.acc_limit || 0}
                onValueChange={(value, name, values) => setNewLimitAmount(values?.float ?? 0)}
              />
            </div>
            <div className="mb-4">
              <Typography level="body-md" maxWidth={600}>
                Este processo pode levar alguns dias úteis. Você será notificado sobre a decisão via e-mail. Agradecemos pela sua compreensão e paciência.
              </Typography>
            </div>
            <div className="flex justify-end space-x-2 mt-10 ml-5">
              <Button variant="outlined" onClick={closeRequestModal}>
                Fechar
              </Button>
              <Button
                onClick={createIncreaseLimitRequest}
                disabled={!newLimitAmount || isLoading || newLimitAmount <= Number(user.acc_limit)}
                className="bg-blue-500 text-white hover:bg-blue-700"
              >
                Solicitar
              </Button>
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  )
};

export default Home;