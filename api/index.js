const app = require("./src/app");
const port = app.get("port");
app.listen(port, () => {
  console.log("server runing on port ", app.get("port"));
});