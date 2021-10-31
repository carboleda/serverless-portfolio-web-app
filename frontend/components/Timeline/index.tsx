import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Tweet } from '../../types/tweet';

export declare interface TimelineProps {
  tweets: Tweet[],
}

const Timeline = ({ tweets }: TimelineProps): JSX.Element => {
  const shouldAddDivider = (index: number) => index < tweets.length - 1;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        tweets.map((tweet, index) => {
          return (
            <Link href={tweet.url} target="_blank" key={tweet.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={tweet.userName} src={tweet.userImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={tweet.userName}
                  secondary={
                    <React.Fragment>
                      {tweet.text}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {shouldAddDivider(index) && <Divider variant="inset" component="li" />}
            </Link>
          )
        })
      }
    </List>
  );
}

export default Timeline;