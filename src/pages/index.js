import React from 'react';
import App from '../components/app/app';
import { ProvideSession } from '../hooks/useSession';

const IndexPage = () => {
  return (
    <ProvideSession>
      <App></App>
    </ProvideSession>
  );
};

export default IndexPage;
