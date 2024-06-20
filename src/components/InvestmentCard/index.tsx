import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import InvestmentService from '../../services/investment';
import { toast } from 'react-toastify';
import CommentCard from '../CommentCard';

const InvestmentCard = ({ investment }: { investment: InvestmentData }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>();
  const [newComment, setNewComment] = useState('');

  const getInvestmentComments = async () => {
    try {
      const response = await InvestmentService.getInvestmentComments(investment.investment_id);
      if (response.status === 200) {
        const { data } = response.data;
        setComments(data)
      }
    } catch (err) {
      console.error('Err: ', err);
      toast.error('Erro ao obter comentarios')
    }
  }

  const handleExpandClick = async () => {
    setExpanded(!expanded);
    setIsLoading(true);

    await getInvestmentComments();

    setIsLoading(false);
  };

  const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    const data = {
      investmentId: investment.investment_id,
      comment: `<p>${newComment}</p>`,
      created_at: new Date().toISOString()
    };
    
    try {
      const response = await InvestmentService.createComment(data)
      if (response.status === 201) {
        toast.success('Comentário criado com sucesso!');
        await getInvestmentComments();
      }
    } catch (err) {
      console.error('Err: ', err);
      toast.error('Erro ao obter comentarios')
    }
  };

  return (
    <Card className="my-4 shadow-lg">
      <CardContent className="flex flex-col items-start">
        <Typography variant="h5" component="div" className="!font-bold">
          {investment.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {investment.description}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between'>
        <Button
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Exibir comentários"
          startIcon={!expanded ? <ExpandMore /> : <ExpandLess />}
        >
          Comentários
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="ml-auto"
          onClick={() => console.log('Investir clicked')}
        >
          Investir
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className='max-h-96 overflow-y-auto'>
          {!isLoading ? (
            <div>
              {comments?.length ? (
                <div>
                  {comments.map((comment, idx) => <CommentCard key={idx} comment={comment} />)}
                </div>
              ) : (
                <Typography paragraph>Nenhum comentário encontrado</Typography>
              )}
            </div>
          ) : (
            <Typography paragraph>Carregando Comentários...</Typography>
          )}
          <div className="flex items-end mt-4 gap-6">
            <TextField
              label="Novo Comentário"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={newComment}
              onChange={handleNewCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Comentar
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InvestmentCard;