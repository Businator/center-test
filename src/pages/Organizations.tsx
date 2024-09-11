import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  TextField,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { orgStore } from '../store/store.ts';

export const Organizations = observer(() => {
  const [name, setName] = useState('');
  const [activeUntil, setActiveUntil] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState('');

  useEffect(() => {
    orgStore.fetchOrganizations();
  }, []);

  const handleAddOrganization = async () => {
    try {
      const response = await orgStore.addOrganization(
        name,
        activeUntil ? activeUntil.toDate() : null
      );
      setError(response || '');
      setName('');
      setActiveUntil(dayjs());
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await orgStore.deleteOrganization(id);
      setError(response || '');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Box>
      <Typography variant='h1'>Организации</Typography>
      <form>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label='Название организации'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DateTimePicker
            label='Активна до'
            value={activeUntil}
            onChange={(newValue) => setActiveUntil(newValue)}
          />
          <Button variant='contained' onClick={handleAddOrganization}>
            Сохранить
          </Button>
        </Box>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Активна до</TableCell>
            <TableCell>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orgStore.organizations.map((org) => (
            <TableRow key={org._id}>
              <TableCell>{org._id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>
                {dayjs(org.exp).format('DD.MM.YYYY HH:mm:ss')}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(org._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        message={error}
        onClose={() => setError('')}
      />
    </Box>
  );
});
