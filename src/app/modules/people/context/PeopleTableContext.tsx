import { useMemo, createContext, ReactNode, useState } from 'react';

import type { Person } from '..';

type Props = {
  children: ReactNode;
  data: Person[];
};

type PeopleContextProps = {
  people: Person[];
  batch: number;
  page: number;
  totalPages: number;
  sortOrder: number;
  filterText: string;
  incPage: VoidFunction;
  decPage: VoidFunction;
  jumpToFirstPage: VoidFunction;
  jumpToLastPage: VoidFunction;
  sortPeople: VoidFunction;
  changeBatchSize: (_size: number) => void;
  filterPeople: (_text: string) => void;
};

export const PeopleTableContext = createContext<PeopleContextProps>(
  {} as PeopleContextProps,
);

export default function PeopleTableProvider({ children, data }: Props) {
  const [batch, setBatch] = useState(10);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<1 | -1>(1);
  const [filterText, setFilterText] = useState('');
  const totalPages = Math.ceil(data.length / batch);

  const people = useMemo(
    () =>
      [...data]
        .filter((p) => p.name.toLowerCase().includes(filterText.toLowerCase()))
        .sort(
          (a: Person, b: Person) => sortOrder * a.name.localeCompare(b.name),
        )
        .slice((page - 1) * batch, page * batch),
    [data, sortOrder, batch, page, filterText],
  );

  const incPage = () => setPage((p) => p + 1);

  const decPage = () => setPage((p) => (p === 1 ? 1 : p - 1));

  const jumpToFirstPage = () => setPage(1);

  const jumpToLastPage = () => setPage(totalPages);

  const changeBatchSize = (size: number) => setBatch(size);

  const sortPeople = () => setSortOrder((s) => (s === 1 ? -1 : 1));

  const filterPeople = (text: string) => setFilterText(text);

  const value = useMemo(
    () => ({
      people,
      batch,
      page,
      totalPages,
      sortOrder,
      filterText,
      incPage,
      decPage,
      sortPeople,
      jumpToFirstPage,
      jumpToLastPage,
      changeBatchSize,
      filterPeople,
    }),
    [sortOrder, batch, page, filterText, people],
  );

  return (
    <PeopleTableContext.Provider value={value}>
      {children}
    </PeopleTableContext.Provider>
  );
}
