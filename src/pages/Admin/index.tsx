import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import RequestService from '../../services/requests';
import { toast } from 'react-toastify';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<UserRequest[]>([]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '---';
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
  };

  const handleReview = async (requestId: number, review: "approved" | "reproved") => {
    try {
      await RequestService.reviewRequest({ requestId, review })
      toast.success("Solicitação aprovada com sucesso!");
      window.location.reload()
    } catch (err) {
      console.error('handleReview: ', err)
      toast.error("Erro ao revisar solicitação");
    }
  }

  const formatAmount = (amount: string) => {
    const amountValue = parseFloat(amount)
    if (!isNaN(amountValue)) {
      return amountValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    return amount || "---"
  }

  const getRequests = async () => {
    setIsLoading(true);

    try {
      const response = await RequestService.getRequests();
      if (response.status === 200) {
        const { data } = response.data;
        setRequests(data);
      }
    } catch (err) {
      console.error('getRequests: ', err);
      toast.error('Ocorreu um erro ao carregar as solicitações dos usuários');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRequests();
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Revisão de Solicitações
      </Typography>
      <Typography variant="body1" paragraph>
        Bem-vindo à página de revisão de solicitações! Aqui, você pode gerenciar e revisar as solicitações feitas pelos usuários. Cada solicitação inclui informações detalhadas sobre o valor solicitado, a data da solicitação, a data de revisão (se aplicável) e o status atual da solicitação.
      </Typography>
      <Typography variant="body1" paragraph>
        Para cada solicitação, você pode tomar uma ação aprovando ou reprovando-a. As ações são facilitadas por botões de fácil uso: um botão verde para "Aprovar" e um botão vermelho para "Reprovar". Esses botões são desativados automaticamente se a solicitação já tiver sido revisada, garantindo que nenhuma ação duplicada seja tomada.
      </Typography>
      <Typography variant="body1" paragraph>
        Esta funcionalidade foi criada para proporcionar uma maneira eficiente e organizada de gerenciar as solicitações dos usuários, ajudando a manter a transparência e a integridade do processo de revisão. Explore as solicitações e tome as decisões necessárias para garantir o melhor atendimento possível aos nossos usuários.
      </Typography>
      <TableContainer component={Paper} className='mt-3'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Valor Solicitado</TableCell>
              <TableCell>Data da Solicitação</TableCell>
              <TableCell>Data da Revisão</TableCell>
              <TableCell>Status da Revisão</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              <>
                {requests.length ? (
                  <>
                    {requests.map(request => {
                      const isReviewed = request.review_date !== null && request.status !== 'pending';

                      return (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{formatAmount(request.requested_amount)}</TableCell>
                          <TableCell>{formatDate(request.request_date)}</TableCell>
                          <TableCell>{formatDate(request.review_date)}</TableCell>
                          <TableCell>{request.status.toUpperCase()}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="success"
                              className="!mr-2"
                              disabled={isReviewed}
                              onClick={() => handleReview(request.id, 'approved')}
                            >
                              Aprovar
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              disabled={isReviewed}
                              onClick={() => handleReview(request.id, 'reproved')}
                            >
                              Reprovar
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  <Typography paragraph>Nenhuma solicitação encontrada</Typography>
                )}
              </>
            ) : (
              <Typography paragraph>Carregando Solicitações...</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Admin;