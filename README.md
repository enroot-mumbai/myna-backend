## For error - models_t.function is not a function 
Change this
const { user } = await dbConn();
To this
const User = dbConn.User;