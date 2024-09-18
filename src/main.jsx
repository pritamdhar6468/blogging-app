import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import "./instrument";
import './index.css'
import * as Sentry from "@sentry/react";
import { ErrorBoundary } from '@sentry/react';


Sentry.init({
  dsn: "https://4386472deb0d04d2e19768984c58d156@o4507967709380608.ingest.de.sentry.io/4507967785926736",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ErrorBoundary fallback={"an error occured"}>
    <App />
    </ErrorBoundary>,

  {/* // </StrictMode>, */}
)
