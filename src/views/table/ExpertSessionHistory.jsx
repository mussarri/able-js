'use client';
import PropTypes from 'prop-types';

import { useCallback, useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DebouncedInput from 'components/third-party/react-table/DebouncedInput';

// third-party

// project-imports
import LinearWithLabel from 'components/@extended/LinearWithLabel';
import MainCard from 'components/MainCard';
import { CSVExport, Filter, HeaderSort, SelectColumnSorting, TablePagination } from 'components/third-party/react-table';
import makeData from 'data/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';
import { fontSize, Grid } from '@mui/system';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Divider, TextField, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// ==============================|| REACT TABLE ||============================== //

const betweenDatesFilter = (row, columnId, filterValue) => {
  const [start, end] = filterValue || [];
  const rowDate = new Date(row.getValue(columnId));
  if (isNaN(rowDate.getTime())) return false; // geçersiz tarih

  if (start && rowDate < new Date(start)) return false;
  if (end && rowDate > new Date(end)) return false;
  return true;
};
const DateRangeFilter = ({ column }) => {
  const [start, end] = column.getFilterValue() || ['', ''];
  const theme = useTheme();

  const style = {
    '.MuiPickersSectionList-root': {
      padding: '10px 0px',
      width: '80px',
      fontSize: '12px'
    },
    '.MuiPickersOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary['400'] + ' !important',
      borderWidth: '1px !important'
    },
    '.MuiPickersOutlinedInput-notchedOutline:hover': {
      borderColor: 'red !important'
    },
    '.MuiButtonBase-root': {
      color: theme.palette.secondary['400']
    },
    '.MuiPickersInputBase-root': {
      padding: '0 10px'
    },
    '.Mui-focused  .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light + ' !important'
    },
    '&:hover .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light + ' !important'
    }
  };

  let startPicker = (
    <DesktopDatePicker
      inputFormat="dd/MM/yyyy"
      value={start}
      onChange={(newValue) => column.setFilterValue([newValue, end])}
      renderInput={(params) => <TextField {...params} />}
      fontSize="small"
      sx={style}
    />
  );
  let endPicker = (
    <DesktopDatePicker
      inputFormat="dd/MM/yyyy"
      value={end}
      onChange={(newValue) => column.setFilterValue([start, newValue])}
      renderInput={(params) => <TextField {...params} />}
      fontSize="small"
      sx={style}
    />
  );

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {startPicker}
        <span>—</span>
        {endPicker}
      </LocalizationProvider>
      {(start || end) && (
        <button aria-label="Temizle" onClick={() => column.setFilterValue(['', ''])} style={{ marginLeft: 4 }}>
          ✕
        </button>
      )}
    </Stack>
  );
};

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

function ReactTable({ columns, data, title }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const theme = useTheme();

  const table = useReactTable({
    data: data.items,
    columns,
    state: { columnFilters, sorting },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    // filtre fonksiyonlarını tanımlamak istersen:
    globalFilterFn: fuzzyFilter, // veya 'includesString' gibi basit
    filterFns: {
      fuzzy: fuzzyFilter,
      between: betweenDatesFilter
    }
  });

  const headers = [];

  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      sx={{
        '.MuiCardHeader-root': {
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          '.MuiCardHeader-action': {
            width: { xs: 1, sm: 'auto' },
            margin: { xs: '0 auto', sm: '0 auto' },
            alignSelf: { xs: 'start', sm: 'center' }
          }
        }
      }}
      title={title}
      content={false}
      secondary={
        <Stack
          direction="row"
          sx={{ gap: { xs: 1, sm: 2 }, alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'flex-end' } }}
        >
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          <CSVExport {...{ data: table.getSortedRowModel().rows.map((d) => d.original), headers, filename: 'sorting.csv' }} />
        </Stack>
      }
    >
      {/* <Stack sx={{ gap: 1, maxWidth: '500px', padding: '10px' }}>
              <Select fullWidth value={''} onChange={() => {}} placeholder="Ara.." />
            </Stack> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                    Object.assign(header.column.columnDef.meta, {
                      className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                    });
                  }

                  return (
                    <TableCell
                      key={header.id}
                      {...header.column.columnDef.meta}
                      onClick={header.column.getToggleSortingHandler()}
                      {...(header.column.getCanSort() &&
                        header.column.columnDef.meta === undefined && {
                          className: 'cursor-pointer prevent-select'
                        })}
                    >
                      {header.isPlaceholder ? null : (
                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                          <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                          {header.column.getCanSort() && <HeaderSort column={header.column} />}
                        </Stack>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>

          <TableBody sx={(theme) => ({ ...theme.applyStyles('dark', { bgcolor: 'background.paper' }) })}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        <Divider />
        <Box sx={{ p: 2 }}>
          <TablePagination
            {...{
              pageCount: data.totalPages
            }}
          />
        </Box>
      </>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - SORTING ||============================== //

export default function SortingTable({ list }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = searchParams.get('filter');

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const columns = useMemo(
    () => [
      {
        header: 'Hasta',
        accessorKey: 'userName',
        enableColumnFilter: true,
        // eğer özel filterFn istersen:
        filterFn: 'fuzzy'
      },

      {
        header: 'Baslangic',
        accessorKey: 'startTime',
        type: 'date',
        filterFn: 'between',
        cell: (info) => {
          const d = new Date(info.getValue());
          return isNaN(d.getTime()) ? '-' : d.toISOString().split('T')[0] + ' - ' + d.toISOString().split('T')[1].slice(0, 5);
        }
      },
      {
        header: 'Sonlanma',
        accessorKey: 'endTime',
        type: 'date',
        filterFn: 'between',
        cell: (info) => {
          const d = new Date(info.getValue());
          return isNaN(d.getTime()) ? '-' : d.toISOString().split('T')[0] + ' - ' + d.toISOString().split('T')[1].slice(0, 5);
        }
      },

      {
        header: 'Fiyat',
        accessorKey: 'price',
        cell: (info) => {
          let lira = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
          });
          return lira.format(info.getValue());
        }
      },
      {
        header: 'Durum',
        accessorKey: 'status',
        enableColumnFilter: true,
        // eğer özel filterFn istersen:
        filterFn: 'fuzzy'
      }
    ],
    []
  );

  return <ReactTable {...{ data: list, columns }} title="Seans Geçmişi" />;
}
