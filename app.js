const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use(express.static(path.join(__dirname, './resources')));
require('./middleware/view.mdw')(app);
require('./middleware/session.mdw')(app);
require('./middleware/local.mdw')(app);
require('./middleware/route.mdw')(app);
require('./middleware/error.mdw')(app);
//require('./middleware/other.mdw')


const PORT = 3000;
app.listen(PORT, _=> {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
