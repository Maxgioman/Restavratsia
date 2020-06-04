import React from "react";
import ReactDOM from "react-dom";
import { create } from "react-test-renderer";
import App from "./App";
import request from "./components/Utils/RequestWrapper";
import RoutesAuthorized from "./components/RoutesAuthorized";

it("renders App component without problems", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("connection to server", async () => {
  const result = await request({
    method: "post",
    url: "account/login/",
    data: { Login: "user_customer", Password: "Pass1234" },
  });
  expect(result.data.value).toBeTruthy();
});

it("not renders routes for authorized users without prop 'authorized'", () => {
  let elem = create(<RoutesAuthorized />);
  expect(elem.toJSON()).toBeNull();
});
