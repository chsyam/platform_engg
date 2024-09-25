import * as React from 'react';
import { Pagination } from '@mui/material';

export default function PaginationRounded(props) {

    return (
        <Pagination
            count={props.totalPages}
            color='primary'
            defaultPage={1}
            size='medium'
            onChange={(event, page) => {
                props.setCurrentPage(page);
                props.setStartingItem((page - 1) * props.itemsPerPage);
            }}
            shape='rounded'
        />
    );
}