import React, { useEffect, useState } from 'react';
import InvestmentCard from '../../components/InvestmentCard';
import InvestmentService from '../../services/investment';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const Investments = () => {
  const [investments, setInvestments] = useState<InvestmentData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getInvestments = async () => {
    setIsLoading(true);

    try {
      const response = await InvestmentService.getInvestments();
      if (response.status === 200) {
        const { data } = response.data;
        setInvestments(data);
      }
    } catch (err) {
      console.error('getInvestments: ', err);
      toast.error('Ocorreu um erro ao carregar os investimentos');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getInvestments()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Lista de Investimentos
      </Typography>
      <Typography variant="body1" paragraph>
        Bem-vindo à nossa lista de investimentos! Aqui, você encontrará diversas opções de investimentos cuidadosamente selecionadas para atender às suas necessidades financeiras. Cada investimento apresenta informações detalhadas sobre suas características, permitindo que você tome decisões informadas.
      </Typography>
      <Typography variant="body1" paragraph>
        Além disso, oferecemos um espaço onde os usuários podem interagir e discutir sobre cada opção de investimento. Você pode ler os comentários de outros investidores, compartilhar suas opiniões e experiências, e fazer perguntas diretamente na seção de comentários. Esta funcionalidade foi criada para fomentar uma comunidade de investidores engajada e bem informada, ajudando todos a alcançar seus objetivos financeiros de maneira mais eficiente.
      </Typography>
      <Typography variant="body1" paragraph>
        Explore nossas opções de investimento e participe das discussões para aproveitar ao máximo os benefícios de nossa plataforma!
      </Typography>
      {!isLoading ? (
        <>
          {investments?.length ? (
            <>
              {investments.map(investment => (
                <InvestmentCard key={investment.investment_id} investment={investment} />
              ))}
            </>
          ) : (
            <Typography paragraph>Nenhum investimento encontrado</Typography>
          )}
        </>
      ) : (
        <Typography paragraph>Carregando Investimentos...</Typography>
      )}

    </div>
  );
}

export default Investments;