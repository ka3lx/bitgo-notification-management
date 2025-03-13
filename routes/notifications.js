import express from "express";
import { notifications } from "../store.js";
import { NOTIFICATION_STATES } from "../utils.js";
import crypto from "node:crypto";

const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res) => {
  try {
    const properties = req.query;
    const id = crypto.randomUUID();
    const notification = { id, ...properties };
    notifications.push(notification);
    return res.status(200).send(notification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/send", (req, res) => {
  try {
    const { emails } = req.body;
    console.log(emails);
    // send notifications to the emails mentioned
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/list", (req, res) => {
  try {
    const { status } = req.query;
    if (status) {
      if (NOTIFICATION_STATES.includes(status)) {
        const notificationsList = notifications.filter(
          (n) => n.status === status
        );
        return res.status(200).json({ notifications: notificationsList });
      } else {
        return res.status(400).send({ message: "Invalid status" });
      }
    } else {
      return res.status(200).json({ notifications });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      const { id } = notifications[index];
      const updatedNotification = { id, ...req.body };
      notifications[index] = updatedNotification;
      return res.status(200).send(notifications[index]);
    } else {
      return res.status(204);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = notifications.findIndex((n) => n.id === id);
    const deletedNotification = notifications[index];
    notifications.splice(index, 1);
    return res.status(200).send(deletedNotification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
