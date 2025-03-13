import express from "express";
import crypto from "node:crypto";
import fs from "node:fs";
import { NOTIFICATION_STATES } from "./utils.js";
import notificationsHandler from "./routes/notifications.js";

const app = express();
const port = 8000;

export const notifications = [];

app.use(express.json());
app.use(express.urlencoded({}));

app.use("/", notificationsHandler);

// app.post("/create", async (req, res) => {
//   try {
//     const properties = req.query;
//     const id = crypto.randomUUID();
//     const notification = { id, ...properties };
//     notifications.push(notification);
//     fs.appendFile(
//       "notifications.txt",
//       JSON.stringify(notification) + "\n",
//       (err) => {
//         if (err) {
//           return res.status(500).send(err);
//         } else {
//           return res.status(200).json({ notification });
//         }
//       }
//     );
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.get("/send", (req, res) => {
//   try {
//     const { emails } = req.body;
//     console.log(emails);
//     // send notifications to the emails mentioned
//     return res.status(200).json({ message: "Success" });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.get("/list", (req, res) => {
//   try {
//     const { status } = req.query;
//     if (status) {
//       if (NOTIFICATION_STATES.includes(status)) {
//         const notificationsList = notifications.filter(
//           (n) => n.status === status
//         );
//         return res.status(200).json({ notifications: notificationsList });
//       } else {
//         return res.status(400);
//       }
//     } else {
//       return res.status(402).json({ notifications });
//     }
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// app.put("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const index = notifications.findIndex((n) => n.id === id);
//     if (index !== -1) {
//       const { id } = notifications[index];
//       const updatedNotification = { id, ...req.body };
//       notifications[index] = updatedNotification;
//       return res.status(200).send(notifications[index]);
//     } else {
//       return res.status(204);
//     }
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

// // implement a patch endpoint to perform partial updates

// app.delete("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const index = notifications.findIndex((n) => n.id === id);
//     const deletedNotification = notifications[index];
//     notifications.splice(index, 1);
//     return res.status(200).send(deletedNotification);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));
