import styled from 'styled-components';

import NxWelcome from './nx-welcome';
import {Ui} from '@tfl-line-status-excersise-monorepo/ui'

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Ui/>
      <NxWelcome title="line-status-app" />
    </StyledApp>
  );
}

export default App;
