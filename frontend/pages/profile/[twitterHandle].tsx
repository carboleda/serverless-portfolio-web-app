import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';
import Timeline from '../../components/Timeline';
import EditableBio from '../../components/EditableBio';
import { UserProfile } from '../../types/profile';
import EditButton from '../../components/EditButton';

export declare interface ProfilePageProps {
  twitterHandle: string,
  userProfile: UserProfile
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { twitterHandle } = context.query;
  const userProfile: UserProfile = {
    "user": {
      "twitterHandle": "cfarboleda",
      "image": "https://pbs.twimg.com/profile_images/1170839720009641990/JzxG3FZz_normal.jpg",
      "name": "Carlos F Arboleda G",
      "description": "Senior Software Engineer at Patagonian\nAndroid and Javascript Developer\nCo-founder at @LaManicuristApp\nTeacher @DevHack\nCo-Organizer/Speaker @GDGCali"
    },
    "tweets": [
      {
        "id": "1451587037409206273",
        "text": "Mañana sábado 23 de Octubre en el #GDGCali tendemos un meetup totalmente práctico donde podrás aprender desde las b… https://t.co/ORGClpCaus",
        "url": "https://t.co/ORGClpCaus",
        "userName": "Carlos F Arboleda G",
        "userImage": "https://pbs.twimg.com/profile_images/1170839720009641990/JzxG3FZz_normal.jpg",
        "twitterHandle": "cfarboleda"
      },
      {
        "id": "1450639692089675777",
        "text": "Acompáñanos en el GDG Cali este sábado 23 de Octubre en un meetup totalmente práctico donde podrás aprender desde l… https://t.co/XkOaImdT4k",
        "url": "https://t.co/XkOaImdT4k",
        "userName": "Carlos F Arboleda G",
        "userImage": "https://pbs.twimg.com/profile_images/1170839720009641990/JzxG3FZz_normal.jpg",
        "twitterHandle": "cfarboleda"
      },
      {
        "id": "1448791750647091203",
        "text": "RT @jggomezt: I just published How to distribute your application with Firebase App Distribution \nhttps://t.co/T6gVzNqw4p",
        "url": "https://t.co/T6gVzNqw4p",
        "userName": "Juan Guillermo Gómez",
        "userImage": "https://pbs.twimg.com/profile_images/1273690890129813504/HQh4CW_K_normal.jpg",
        "twitterHandle": "cfarboleda"
      },
      {
        "id": "1445868905788968960",
        "text": "RT @jggomezt: Hola a tod@s ya tenemos nuevo episodio hablando de #microservicios. Esta vez hablamos de tecnologías de integración basadas e…",
        "url": "https://t.co/w3N523dcsp",
        "userName": "Juan Guillermo Gómez",
        "userImage": "https://pbs.twimg.com/profile_images/1273690890129813504/HQh4CW_K_normal.jpg",
        "twitterHandle": "cfarboleda"
      },
      {
        "id": "1442157181789515779",
        "text": "RT @jggomezt: Hola a tod@s ya tenemos nuevo episodio hablando de #microservicios. Esta vez hablamos de tecnologías de integración, RPC, RES…",
        "url": "https://t.co/epizf6rPAt",
        "userName": "Juan Guillermo Gómez",
        "userImage": "https://pbs.twimg.com/profile_images/1273690890129813504/HQh4CW_K_normal.jpg",
        "twitterHandle": "cfarboleda"
      }
    ]
  };
  return {
    props: {
      twitterHandle,
      userProfile
    }
  }
}

const ProfilePage: NextPage<ProfilePageProps> = ({ twitterHandle, userProfile }): JSX.Element => {
  const { user, tweets } = userProfile;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, margin: 5, alignContent: 'center' }}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}>
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={6} lg={6}>
          <Avatar
            variant="rounded"
            src="https://pbs.twimg.com/profile_images/1170839720009641990/JzxG3FZz.jpg"
            sx={{ width: 100, height: 100 }} />

          <Typography
            sx={{ display: 'inline' }}
            component="div"
            variant="h5"
            color="text.primary">
            {user.name}
          </Typography>

          <EditableBio text={user.description} isEditing={isEditing} />
          <Grid container
            justifyContent="flex-end"
            xs={12} md={12} lg={12}>
            <EditButton isEditing={isEditing} onClick={(edit) => setIsEditing(edit)}/>
          </Grid>
        </Grid>
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={6} lg={6}>
          <Typography
            sx={{ display: 'inline' }}
            component="div"
            variant="h5"
            color="text.primary">
            {user.name} Timeline
          </Typography>
          <Timeline tweets={tweets}></Timeline>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;