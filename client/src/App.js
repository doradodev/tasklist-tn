import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';
import { fetchDataAxios } from './utils/fetchData';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Album() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clickedUuid, setClickedUuid] = React.useState('');
  const [clickedTitle, setClickedTitle] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    const callData = async () => {
      const response = fetchDataAxios('http://localhost:5000/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response;
      setCards(responseData);
    };
    callData();
  }, []);

  const handleOpen = (currentUuid, currentTitle) => {
    setClickedUuid(currentUuid);
    setClickedTitle(currentTitle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTaskDone = (uuidToUpdate) => {
    const response = fetchDataAxios(
      `http://localhost:5000/tasks/${uuidToUpdate}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FormatListBulletedIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Tasks App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Tasks
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards &&
              cards.map((card) => (
                <Grid item key={card.uuid} xs={12} sm={6} md={4}>
                  <Card
                    className={classes.card}
                    onClick={() => handleOpen(card.uuid, card.title)}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography>{card.uuid}</Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          TRUENORTH
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          App made By Christian Dorado
        </Typography>
      </footer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
          className={classes.paper}
        >
          <h2 id="simple-modal-title">{clickedUuid}</h2>
          <p id="simple-modal-description">{clickedTitle}</p>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleTaskDone(clickedUuid)}
                >
                  Complete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
