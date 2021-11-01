import { useEffect, useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';
import Timeline from '../../components/Timeline';
import EditableBio from '../../components/EditableBio';
import { UserProfile } from '../../types/profile';
import EditButton from '../../components/EditButton';
import EditableName from '../../components/EditableName';
import Constants from '../../helpers/constants';
import { useUpdateProfile } from '../../hooks/useUserUpdateProfile';

export declare interface ProfilePageProps {
  twitterHandle: string,
  userProfile: UserProfile
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { twitterHandle } = context.query;
  const response = await fetch(`${Constants.API}/user/${twitterHandle}`)
    .then(res => res.json());

  return {
    props: {
      success: response.success,
      twitterHandle,
      userProfile: response.profile,
    }
  }
}

const ProfilePage: NextPage<ProfilePageProps> = ({ twitterHandle, userProfile }): JSX.Element => {
  const { user, tweets } = userProfile;
  const isMounted = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile();

  useEffect(() => {
    if (isMounted.current) {
      updateProfile(twitterHandle, { ...user, name, description });
    } else {
      isMounted.current = true;
    }
  }, [twitterHandle, user, name, description, updateProfile]);

  return (
    <Box sx={{ flexGrow: 1, margin: 5, alignContent: 'center' }}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}>
        <Grid container item
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={6} lg={6}>
          <Avatar
            variant="rounded"
            src={user.image}
            sx={{ width: 100, height: 100 }} />

          <EditableName text={name} isEditing={isEditing}
            onChange={(text) => setName(text)} />

          <EditableBio
            text={description} isEditing={isEditing}
            onChange={(text) => setDescription(text)} />

          <Grid container item
            justifyContent="flex-end"
            xs={12} md={12} lg={12}>
            <EditButton isEditing={isEditing} isLoading={isUpdatingProfile}
              onEditStarted={() => setIsEditing(true)}
              onEditFinished={() => setIsEditing(false)} />
          </Grid>
        </Grid>
        <Grid container item
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={6} lg={6}>
          <Typography
            sx={{ display: 'inline' }}
            component="div"
            variant="h5"
            color="text.primary">
            {name} <span>&apos; Timeline</span>
          </Typography>

          <Timeline tweets={tweets} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;