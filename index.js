import express from "express";
import notificationsHandler from "./routes/notifications.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({}));

app.use("/", notificationsHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
