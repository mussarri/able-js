'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| TABLE PAGINATION ||============================== //

export default function TablePagination({ getPageCount, setPageIndex, setPageSize, getState, initialPageSize }) {
  const [open, setOpen] = useState(false);
  let options = [10, 25, 50, 100];

  if (initialPageSize) {
    options = [...options, initialPageSize]
      .filter((item, index) => [...options, initialPageSize].indexOf(item) === index)
      .sort(function (a, b) {
        return a - b;
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPageSize(initialPageSize || 10), []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (event, value) => {
    setPageIndex(value - 1);
  };

  const handleChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Grid spacing={1} container sx={{ alignItems: 'center', justifyContent: 'center', width: 'auto' }}>
      <Grid sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
          count={getPageCount()}
          page={getState().pagination.pageIndex + 1}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
}

TablePagination.propTypes = {
  getPageCount: PropTypes.func,
  setPageIndex: PropTypes.func,
  setPageSize: PropTypes.func,
  getState: PropTypes.func,
  initialPageSize: PropTypes.number
};
