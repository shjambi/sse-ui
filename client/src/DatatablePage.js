import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Id',
        field: 'id',
        sort: 'asc',
        width: 100
      },
      {
        label: 'User',
        field: 'user',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Text',
        field: 'text',
        sort: 'asc',
        width: 220
      }
    ],
    rows: [
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      },
      {
        id: '111222',
        user: 'Sahar',
        text: 'hello'
      }
    ]
  };

  return (
    <MDBDataTable
      scrollX
      scrollY
      maxHeight="30vh"
      // maxWidth="100px"
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;