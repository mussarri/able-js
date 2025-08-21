import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from 'utils/password-validation';
import { Minus, TickCircle } from '@wandersonalwes/iconsax-react';

const PasswordCriters = ({ password }) => {
  console.log(password);
  console.log(minLength(password));

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
        <Typography variant="h5">Yeni Parola Kriterleri:</Typography>
        <List sx={{ p: 0, mt: 1 }}>
          <ListItem divider>
            <ListItemIcon sx={{ color: minLength(password) ? 'success.main' : 'inherit' }}>
              {minLength(password) ? <TickCircle /> : <Minus />}
            </ListItemIcon>
            <ListItemText primary="En az 8 karakter" />
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: isLowercaseChar(password) ? 'success.main' : 'inherit' }}>
              {isLowercaseChar(password) ? <TickCircle /> : <Minus />}
            </ListItemIcon>
            <ListItemText primary="En az 1 küçük harf (a-z)" />
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: isUppercaseChar(password) ? 'success.main' : 'inherit' }}>
              {isUppercaseChar(password) ? <TickCircle /> : <Minus />}
            </ListItemIcon>
            <ListItemText primary="En az 1 büyük harf (A-Z)" />
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: isNumber(password) ? 'success.main' : 'inherit' }}>
              {isNumber(password) ? <TickCircle /> : <Minus />}
            </ListItemIcon>
            <ListItemText primary="En az 1 sayı (0-9)" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: isSpecialChar(password) ? 'success.main' : 'inherit' }}>
              {isSpecialChar(password) ? <TickCircle /> : <Minus />}
            </ListItemIcon>
            <ListItemText primary="En az 1 özel karakter" />
          </ListItem>
        </List>
      </Box>
    </Grid>
  );
};

export default PasswordCriters;
