import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocation, navigate } from '@reach/router';
import queryString from 'query-string';
import { postSession } from '../services/database';

const sessionContext = createContext();

export function ProvideSession({ children }) {
  const session = useProvideSession();

  return (
    <sessionContext.Provider value={session}>
      {children}
    </sessionContext.Provider>
  );
}

export const useSession = () => {
  return useContext(sessionContext);
};

function useProvideSession() {
  const [session, setSession] = useState('');
  const { search } = useLocation();

  const newSession = mixologistsCount => {
    const newSessionKey = postSession(mixologistsCount);

    navigate(`?${queryString.stringify({ session: newSessionKey })}`);
  };

  useEffect(() => {
    const urlSession = queryString.parse(search).session;

    if (urlSession) {
      setSession(urlSession);
    }
  }, [search]);

  return {
    session,
    newSession,
  };
}
