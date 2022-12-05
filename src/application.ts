import express from "express";
import cors from "cors";

import usersRoutes from "./routers/usersRoutes";
import tasksRoutes from "./routers/tasksRoutes";
import contactRoutes from "./routers/contactRoutes";

const application = express();
application.use(cors());
application.use(express.json());

const port = 8080;

application.use(usersRoutes);
application.use(tasksRoutes);
application.use(contactRoutes);

application.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

export default application;