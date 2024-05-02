import { Layout, LineStatusList } from '@tfl-line-status-excersise-monorepo/ui';

export function App() {
  const items = [
    { lineId: 'bakerloo', name: 'Bakerloo', status: 'Good Service' },
    { lineId: 'central', name: 'Central', status: 'Good Service' },
    { lineId: 'circle', name: 'Circle', status: 'Good Service' },
    { lineId: 'district', name: 'District', status: 'Minor Delays' },
    {
      lineId: 'hammersmith-city',
      name: 'Hammersmith & City',
      status: 'Good Service',
    },
    { lineId: 'jubilee', name: 'Jubilee', status: 'Good Service' },
    { lineId: 'metropolitan', name: 'Metropolitan', status: 'Good Service' },
    { lineId: 'northern', name: 'Northern', status: 'Minor Delays' },
    { lineId: 'piccadilly', name: 'Piccadilly', status: 'Good Service' },
    { lineId: 'victoria', name: 'Victoria', status: 'Good Service' },
    {
      lineId: 'waterloo-city',
      name: 'Waterloo & City',
      status: 'Good Service',
    },
    {
      lineId: 'default',
      name: 'Default',
      status: 'Good Service',
    }
  ];

  return (
    <Layout>
      <LineStatusList items={items} />
    </Layout>
  );
}

export default App;
