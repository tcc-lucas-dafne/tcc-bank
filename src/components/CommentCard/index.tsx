import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <Card className="my-2 shadow-md flex items-center">
      <Avatar className="m-4">
        <AccountCircleIcon />
      </Avatar>
      <CardContent className='flex flex-col items-start'>
        <Typography variant="body1" component="p">
          { comment.comment }
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(comment.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;