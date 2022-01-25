const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const http = require("http");

const PORT = process.env.PORT || 3001;
const app = express();

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

Sentry.init({
  dsn: "https://a17cbb13af534b3d9f846176f8fe8c57@o1120953.ingest.sentry.io/6157079",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
// enable Express.js middleware tracing
new Tracing.Integrations.Express({ app }),

  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "transaction",
  name: "My Transaction",
});

// Note that we set the transaction as the span on the scope.
// This step makes sure that if an error happens during the lifetime of the transaction
// the transaction context will be attached to the error event
Sentry.configureScope(scope => {
  scope.setSpan(transaction);
});

// db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Api server listening on http://localhost:${PORT}`);
  });