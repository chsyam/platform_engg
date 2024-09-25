import * as React from 'react';
import { Pagination } from '@mui/material';

export default function PaginationRounded(
  { selectedId, setCurrentPage, totalPages, itemsPerPage, setStartingItem }) {

  return (
    <>
      {selectedId.id !== 0 ? null : (
        <Pagination
          count={totalPages}
          color='primary'
          defaultPage={1}
          size='medium'
          onChange={(event, page) => {
            setCurrentPage(page);
            setStartingItem((page - 1) * itemsPerPage);
          }}
          shape='rounded'
        />
      )}
    </>
  );
}
