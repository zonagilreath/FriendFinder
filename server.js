const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded( { extended:true } ));

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.listen(port, () => console.log(`Server running on port ${port}`));