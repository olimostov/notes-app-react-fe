import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';

import EditIcon from '@material-ui/icons/Edit';
import {
  green,
  indigo,
  lime,
  orange,
  teal,
  yellow
} from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: note => {
      if (note.category === 'work') {
        return yellow[800];
      }
      if (note.category === 'todos') {
        return indigo[300];
      }
      if (note.category === 'reminders') {
        return lime[500];
      }
      if (note.category === 'money') {
        return green[500];
      }
    }
  }
});

const NoteCard = ({ note, handleDelete, handleEdit }) => {
  const classes = useStyles(note);
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        >
          {note.title}
        </CardHeader>
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
          <IconButton onClick={() => handleEdit(note)}>
            <EditIcon fontSize='small' />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
