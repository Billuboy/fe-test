import { usePeopleQuery } from './query';
import PeopleTableProvider from './context/PeopleTableContext';
import PeopleTable from './components/PeopleTable.component';

export function People() {
  const { data: people, loading, error } = usePeopleQuery();

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (!people || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  if (!people.length) return <p>No People Available.</p>;

  return (
    <PeopleTableProvider
      data={people.toSorted((a, b) => a.name.localeCompare(b.name))}
    >
      <PeopleTable />
    </PeopleTableProvider>
  );
}
