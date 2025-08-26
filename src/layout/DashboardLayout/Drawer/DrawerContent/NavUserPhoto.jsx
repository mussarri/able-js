'use client';
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
const avatar1 = '/assets/images/users/avatar-6.png';

const NavUserPhoto = ({ drawerOpen }) => {
  const [personelData, setPersonalData] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPersonalData(data?.data);
        } else {
          console.error('Error fetching personal data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching personal data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ListItemAvatar>
        <Avatar alt="Avatar" src={personelData?.data?.url || avatar1} sx={{ ...(drawerOpen && { width: 46, height: 46 }) }} />
      </ListItemAvatar>
      <ListItemText primary={personelData?.data?.userName || ''} sx={{ ...(!drawerOpen && { display: 'none' }) }} secondary="" />
    </>
  );
};

export default NavUserPhoto;
