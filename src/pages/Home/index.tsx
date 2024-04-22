import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";
import { formatCurrency } from "../../utils/format-currency";


const Home = () => {
  const { user } = useAppContext();

  return (
    <div>
      <Box sx={{ maxWidth: '500px', margin: "1rem" }}>
        <Card variant="outlined">
          <CardContent className="text-left">
            <h1 className="text-4xl mb-2">Bem-Vindo de volta { user?.name }</h1>
            <h3 className="text-xl whitespace-nowrap">Você possui um saldo de { formatCurrency(user?.balance) }</h3>
            <h3 className="text-xl whitespace-nowrap">E limite liberado de { formatCurrency(user?.acc_limit) }</h3>
            <button className="border-solid border-slate-400 rounded-sm bg-violet-400 px-4 py-2 mt-3">Aumentar meu Limite</button>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
};

export default Home;