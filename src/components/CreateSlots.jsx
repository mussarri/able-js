import { Box, Button } from '@mui/material';
import { createMultiSlots } from 'actions';
import React, { startTransition, useActionState, useEffect } from 'react';

const CreateSlots = ({ slots, setSelected }) => {
  const [state, formAction, isPending] = useActionState(createMultiSlots, null);
  useEffect(() => {
    if (state?.success) {
      setSelected([]);
    }
    if (state?.error) {
      setSelected([]);
    }
  }, [state]);
  return (
    <div className="div" style={{ marginTop: '10px', textAlign: 'right', width: '100%' }}>
      {state?.error && <p style={{ margin: '0px 0', color: 'red' }}>{state?.error}</p>}{' '}
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          startTransition(() => {
            formAction(formData);
          });
        }}
      >
        {' '}
        <input type="hidden" name="slots" value={JSON.stringify(slots)} />
        <Box
          sx={{
            textAlign: 'right',
            margin: '0px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button type="submit" disabled={isPending} color="primary" variant="contained">
            Slot Oluştur
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateSlots;
