import { useAppContext } from "../../context";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Box, Grid, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/format-currency";
import creditCard from '../../assets/black_credit_card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faKey, faCopy, faBarcode, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { spacing } from '@mui/system';
import Graphic from "../../components/Graphic";
import bankSecurity from '../../assets/happy_people.png';
import aboutUs from '../../assets/colorful_people.png';
import happy from '../../assets/happy.png';

const Home = () => {
  const { user } = useAppContext();

  return (
    <div className="md:grid grid-cols-2 bg-neutral-50 h-full">
      <Box sx={{maxWidth: { xs: "500px", md: "100%", lg: "100%" }, marginLeft: { md:"2rem", lg:"2rem"}, marginTop: { md:"1rem", lg:"1rem"}}}>
      <h1 className="text-left text-xs font-semibold p-3 md:text-4xl mb-4">Bem vindo de volta, { user?.name }!</h1>
      {/* <h1 className="text-left text-xs md:text-2xl font-bold mb-2"></h1> */}
      <div className="md:grid grid-cols-3 grid-flow-col gap-4"> 
        <Card sx={{ mb:'10px', borderRadius:'1rem'  }}>
            <CardContent className="text-left col-span-1">
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Banco 123</h1>
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Agência 0101</h1>
              <h1 className="text-xs font-semibold md:text-base mb-2 p-1">Conta 12345678-0</h1>
              <hr></hr>
              <h1 className="align-text-bottom font-semibold text-xs md:text-base mb-2 p-1 mt-10">Chave PIX 000.000.000-00</h1>
            </CardContent>
          </Card>
          <Card sx={{ mb:'10px', borderRadius:'1rem' }} className="rounded-3xl grid gird-col-span-2">
            <CardContent className="text-left">
              <h3 className="text-xs md:text-2xl font-bold whitespace-nowrap mb-10 p-3">Saldo da sua conta</h3>
              <h3 className="text-xs md:text-4xl font-bold whitespace-nowrap pl-3 pt-2">{ formatCurrency(user?.balance) }</h3>
            </CardContent>
          </Card>
          <Card sx={{ mb:'10px', borderRadius:'1rem' }}>
            <Graphic></Graphic>
          </Card>
        </div>
        <Card sx={{ mb:'10px', borderRadius:'1rem' }} className="rounded-3xl">
          <CardContent className="text-left">
            <h3 className="text-xs md:text-2xl font-bold whitespace-nowrap mb-3 mt-5 ml-5">Cartão de Crédito</h3>
          </CardContent>
          <div className="sm:items-center content-center md:grid grid-cols-2">
            <CardMedia
              component="img"
              image={creditCard}
              sx={{ height: '100%', maxWidth: '100%', margin:'0' }} 
              alt="Cartão de crédito"
            />
            <Card className="m-5 bg-neutral-50" sx={{borderRadius:'1rem', backgroundColor: 'rgb(250 250 250)'}} variant="outlined" >
              <CardContent className="text-left" >
                <h3 className="text-xs lg:text-xl font-bold whitespace-nowrap">Total gasto</h3>
                <h3 className="text-xs lg:text-3xl font-bold whitespace-nowrap pb-10 pt-4">R$100.000,00</h3>
                <h3 className="text-xs md:text-xl whitespace-nowrap">Limite disponível { formatCurrency(user?.acc_limit) }</h3>
                <button className="w-full bg-black disabled:bg-black text-white rounded-md py-2 mt-5 cursor-pointer">Aumentar meu Limite</button>
                <button className="w-full bg-red-700 disabled:bg-black text-white rounded-md py-2 mt-5 cursor-pointer">Bloquear cartão</button>
              </CardContent>
            </Card>
          </div>
        </Card>
      </Box>
      <Box sx={{maxWidth: { xs: "500px", md: "100%", lg: "100%" }, marginRight: { md:"2rem", lg:"2rem"}, marginLeft: { md:"1rem", lg:"1rem"}, marginTop: { md:"1rem", lg:"1rem"}}}>
      <Card sx={{ mb:'10px', height:'auto', borderRadius:'1rem'}}>
          <div>  
            <p className='text-left font-semibold text-2xl p-5'>Oferecemos para você</p>
            <div className="flex grid grid-cols-3">
              <div className="rounded-full text-center pl-5 p-10">
                <img className="rounded-full w-40 h-40 m-auto pb-3" src={bankSecurity}></img>
                <span className='text-wrap ml-2 text-2xl font-semibold'>
                  {/* Você sabia que o nosso banco se preocupa muito com a sua segurança?
                  Nós mantemos os seus dados secretos sem nenhum acesso para que você esteja sempre seguro. */}
                  Segurança
                </span>
              </div>
              <div className="rounded-full text-center pl-5 p-10">
                <img className="rounded-full w-40 h-40 m-auto pb-3" src={aboutUs}></img>
                <span className='ml-2 text-2xl font-semibold'>
                  {/* Todas as suas transações são garantidas conosco. SEM ERROS E FALHAS! */}
                  Confiança
                </span>
              </div>
              <div className="rounded-full text-center pl-5 p-10">
                <img className="rounded-full w-40 h-40 m-auto pb-3" src={happy}></img>
                <span className='ml-2 text-2xl font-semibold'>
                  {/* No nosso banco você pode ver um histórico de todas as operações realizadas. */}
                  Proteção
                </span>
              </div>
            </div>
            <hr></hr>
            <div className="grid grid-cols-2">
            <div className='h-full'>
              <p className='text-left p-4 font-semibold text-xl pb-2 pt-7'>Transferências/Pagamentos</p>
              <div className="grid grid-cols-2 gap-4">
              <Card sx={{ borderRadius:'100rem', backgroundColor: 'rgb(250 250 250)' }}  className='cursor-pointer p-10 justify-center items-center grid grid-rows-2 m-5 rounded-3xl  '>
                <FontAwesomeIcon icon={faRightLeft} className="md:w-6 h-6 m-auto text-pink-600"/>
                <span className='ml-2 text-md font-bold'>
                  Transferir
                </span>
              </Card>
              <Card sx={{ borderRadius:'100rem',  backgroundColor: 'rgb(250 250 250)'}}  className='cursor-pointer p-10 justify-center items-center grid grid-rows-2 m-5 mr-2 rounded-3xl'>
                <FontAwesomeIcon icon={faBarcode} className="md:w-6 h-6  m-auto text-pink-600"/>
                <span className='ml-2 text-md font-bold'>
                  Pagar boleto
                </span>
              </Card>
              </div>
            </div>
            <div>
              <p className='text-left p-4 font-semibold text-xl pb-2 pt-7'>Recebimentos</p>
              <div className="grid grid-cols-1 gap-4">
                <Card sx={{ borderRadius:'100rem', backgroundColor: 'rgb(250 250 250)' }}  className='cursor-pointer p-10 justify-center items-center grid grid-rows-2 m-5 rounded-3xl'>
                  <FontAwesomeIcon icon={faReceipt} className="md:w-6 h-6 m-auto text-pink-600"/>
                  <span className='ml-2 text-md font-bold'>
                    {/* Depositar PIX, Boleto ou TED
                    Definir valor e gerar qr code, chave, boleto e dados de TED */}
                    Depósitos
                  </span>
                </Card>
              </div>
            </div>
            </div>
            <div>
              <p className='text-left p-4 font-semibold text-xl pb-2 pt-7'>PIX</p>
              <div className="grid grid-cols-3 gap-3">
              <Card sx={{ borderRadius:'100rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-10 grid grid-rows-2 m-5 rounded-3xl'>
                <FontAwesomeIcon icon={faKey} className="md:w-6 h-6 m-auto text-pink-600"/>
                <span className='text-xs font-bold'>
                  Ver e configurar CHAVES PIX
                </span>
              </Card>
              <Card sx={{ borderRadius:'100rem', backgroundColor: 'rgb(250 250 250)' }}  className='cursor-pointer flex items-center justify-center p-10 grid grid-rows-2 m-5 rounded-3xl'>
                <FontAwesomeIcon icon={faCopy} className="md:w-6 h-6 m-auto text-pink-600"/>
                <span className='text-xs font-bold'>
                  PIX copia e cola
                </span>
              </Card>
              <Card sx={{ borderRadius:'100rem', backgroundColor: 'rgb(250 250 250)' }} className='cursor-pointer flex items-center justify-center p-10 grid grid-rows-2 m-5 rounded-3xl'>
                <FontAwesomeIcon icon={faRightLeft} className="md:w-6 h-6 m-auto text-pink-600"/>
                <span className='text-xs font-bold'>
                  Transferir PIX
                </span>
              </Card>
              </div>
            </div>
            </div>
            {/* <div className='cursor-pointer p-10'>
              <FontAwesomeIcon icon={faKey}/>
              <span className='ml-2 text-md font-bold'>
                Ler QR code
              </span>
            </div> */}
        </Card>
      </Box>
    </div>
  )
};

export default Home;