import React, { ReactNode } from "react";

import store from "../index";
import { Provider } from "react-redux";

//^ types
export type ReduxProviderProps = {
  children?: ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
