import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


//ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(
    <Auth0Provider
      domain="dev-42rxsn3pmga1mdf1.us.auth0.com"
      clientId="CbFVyeMCAWaBWvQvUasSu8e6n4iwfxDo"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );