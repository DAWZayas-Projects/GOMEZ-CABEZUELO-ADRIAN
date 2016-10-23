// app and database for starting up the api
import app from '../app'
import {sequelizeMysql, conectDB} from '../config/sequelize'

const port = process.env.PORT || 3000;

(async() => {
  try {
    const info = await conectDB(sequelizeMysql);
    console.log(info);
  } catch (error) {
    console.error(`Unable to connect to database ${databaseURL}`)
    console.error(`Error: ${error}`)
  }

  await app.listen(port);
  console.log(`Server started on port ${port}`);

})();
