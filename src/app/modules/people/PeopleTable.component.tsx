import { useState } from 'react';

import type { Person } from './model';

import './people.css';
import { usePeopleTable } from './hooks/usePeopleTable';

function TableRow({ name, show, actor, movies, dob }: Person) {
  return (
    <tr>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td>{movies.map(({ title }) => title).join(', ')}</td>
    </tr>
  );
}

export default function PeopleTable() {
  const {
    people,
    page,
    batch,
    sortOrder,
    totalPages,
    filterText,
    incPage,
    decPage,
    sortPeople,
    jumpToFirstPage,
    jumpToLastPage,
    changeBatchSize,
    filterPeople,
  } = usePeopleTable();

  return (
    <div>
      <input
        type='text'
        role='textbox'
        aria-label='Search'
        value={filterText}
        onChange={e => filterPeople(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th
              aria-sort={sortOrder === 1 ? 'ascending' : 'descending'}
              onClick={sortPeople}>
              Name
            </th>
            <th>Show</th>
            <th>Actor/Actress</th>
            <th>Date of birth</th>
            <th>Movies</th>
          </tr>
        </thead>

        <tbody>
          {people.map((people, index) => (
            <TableRow key={index} {...people} />
          ))}
        </tbody>
      </table>
      <div>
        <select
          name='combobox'
          value={batch}
          onChange={e => changeBatchSize(+e.target.value)}>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
        <p>
          Showing {(page - 1) * batch + 1}-{page * batch} of 100
        </p>
        <div>
          <button onClick={() => jumpToFirstPage()} disabled={page === 1}>
            First
          </button>
          <button onClick={() => decPage()} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => incPage()} disabled={page === totalPages}>
            Next
          </button>
          <button
            onClick={() => jumpToLastPage()}
            disabled={page === totalPages}>
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
