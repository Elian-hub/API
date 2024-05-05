const mongoose = require('mongoose');
const app = require('./index');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
DB = process.env.LOCAL_DB;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB);
  console.log('Database connected succesfully');
}

const port = 3001;
app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});

