import React from "react";
import { mixologistsReducer } from "../reducers/mixologistsReducer";

const MixologistsStateContext = React.createContext();
const MixologistsDispatchContext = React.createContext();

function MixologistsProvider({ children }) {
  const [state, dispatch] = React.useReducer(mixologistsReducer, { mixologists: [] });
  return (
    <MixologistsStateContext.Provider value={state}>
      <MixologistsDispatchContext.Provider value={dispatch}>
        {children}
      </MixologistsDispatchContext.Provider>
    </MixologistsStateContext.Provider>
  );
}
function useMixologistsState() {
  const context = React.useContext(MixologistsStateContext);
  if (context === undefined) {
    throw new Error(
      "useMixologistsState must be used within a MixologistsProvider"
    );
  }
  return context;
}
function useMixologistsDispatch() {
  const context = React.useContext(MixologistsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useMixologistsDispatch must be used within a MixologistsProvider"
    );
  }
  return context;
}
export { MixologistsProvider, useMixologistsState, useMixologistsDispatch };
