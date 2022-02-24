const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const connectDB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.URI_PASSWORD,
);

mongoose.connect(connectDB).then(() => console.log('DB connection successful!!'));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
