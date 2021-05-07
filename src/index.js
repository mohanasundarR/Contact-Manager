import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducers/index";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
const store = createStore(rootReducer);

const errorLink = onError((response) => {
  const { networkError } = response;
  if (networkError) {
    if (networkError.statusCode === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
});
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphQL",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      "X-Auth-Token": token ? token : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
