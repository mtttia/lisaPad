import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./assets/index.css"
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from "./theme/theme"
import { Provider } from 'react-redux'
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
