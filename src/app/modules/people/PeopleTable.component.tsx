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
  const [input, setInput] = useState('');
  const { people } = usePeopleTable();

  return (
    <div>
      <input
        type='text'
        name='Search'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
    </div>
  );
}
