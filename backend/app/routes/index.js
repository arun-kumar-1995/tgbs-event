import express from "express";
import {
  getEventDetails,
  getEventsList,
} from "../controllers/event.controller.js";

const router = express.Router();

router.route("/events").get(getEventsList);
router.route("/events/:id").get(getEventDetails);

export default router;
