import { useContext } from 'react';

import { PeopleTableContext } from '../context/PeopleTableContext';

export const usePeopleTable = () => useContext(PeopleTableContext);
