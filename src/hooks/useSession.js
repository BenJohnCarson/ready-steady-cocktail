import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocation, navigate } from "@reach/router";
import queryString from "query-string";
import firebase from "../services/firebase";

const sessionContext = createContext();

export function ProvideSession({ children }) {
  const session = useProvideSession();

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>;
};

export const useSession = () => {
  return useContext(sessionContext);
};

function useProvideSession() {
  const [session, setSession] = useState("");
  const { search } = useLocation();

  const newSession = (mixologistsCount) => {
    const newSessionKey = firebase.db.ref("/sessions").push().key;
    const sessionData = {};

    for (let i = 0; i < mixologistsCount; i++) {
      const newMixologistKey = firebase.db.ref("/mixologists").push().key;

      firebase.db.ref(`/mixologists/${newMixologistKey}`).set({ name: "" });
      sessionData[`/mixologists/${newMixologistKey}`] = true;
    }
    firebase.db.ref(`/sessions/${newSessionKey}`).update(sessionData);
    navigate(`?${queryString.stringify({ session: newSessionKey })}`);
  }

  useEffect(() => {
    const urlSession = queryString.parse(search).session;

    if (urlSession) {
      setSession(urlSession);
    }
  }, [search]);

  return {
    session,
    newSession
  }
}