const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const proposalRouter = require("./src/router/Proposal");

require("./src/db/conn");

app.use(express.json());

app.use("/api/proposal", proposalRouter);

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
