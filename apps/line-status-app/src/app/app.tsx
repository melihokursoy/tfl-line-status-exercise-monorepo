import { Layout, LineStatusList } from '@tfl-line-status-excersise-monorepo/ui';
import { LineStatus } from './components/lineStatus';
import { QueryClientWrapper } from './components/queryClientWrapper';

export function App() {
  return (
    <QueryClientWrapper>
      <Layout>
        <LineStatus />
      </Layout>
    </QueryClientWrapper>
  );
}

export default App;
