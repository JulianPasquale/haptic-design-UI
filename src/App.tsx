import React from 'react';
import Chart from './components/Chart';

const App: React.FC = (): React.ReactElement => (
  <div className='App'>
    <div style={{ width: '90%', height: '300px' }}>
      <Chart />
    </div>
  </div>
);

export default App;
