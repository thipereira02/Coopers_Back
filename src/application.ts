import express from "express";
import cors from "cors";

import usersRoutes from "./routers/usersRoutes";

const application = express();
application.use(cors());
application.use(express.json());

const port = 8080;

application.use(usersRoutes);

application.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
