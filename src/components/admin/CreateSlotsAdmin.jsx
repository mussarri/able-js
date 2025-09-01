import { Box, Button } from '@mui/material';
import { createMultiSlotsAdmin } from 'actions';
import React, { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CreateSlots = ({ slots, setSelected, expertId }) => {
  const [state, formAction, isPending] = useActionState(createMultiSlotsAdmin, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state?.message);
      setSelected([]);
    }
    if (state?.success) {
      toast.success(state?.message);
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
        <input type="hidden" name="expertId" value={expertId} />
        <Box
          sx={{
            textAlign: 'right',
            margin: '0px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button type="submit" disabled={slots?.length < 1 || isPending} color="primary" variant="contained">
            Slot Oluştur
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateSlots;
