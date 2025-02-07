import React, { useMemo, useCallback, createContext, ReactNode } from 'react';
import { AxiosError } from 'axios';

import type { Person } from '..';
import { usePeopleQuery } from '../query';

const ITEM_BATCH = 10;

type Props = {
  children: ReactNode;
  data: Person[];
};

type PeopleContextProps = {
  people: Person[];
};

export const PeopleTableContext = createContext<PeopleContextProps>({
  people: [],
});

export default function PeopleTableProvider({ children, data }: Props) {
  const value = useMemo(
    () => ({
      people: data.slice(0, ITEM_BATCH),
    }),
    [],
  );

  return (
    <PeopleTableContext.Provider value={value}>
      {children}
    </PeopleTableContext.Provider>
  );
}
