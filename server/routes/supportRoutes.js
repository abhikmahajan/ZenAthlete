// routes/supportRoutes.js
import express from "express";
import {
  userSendMessage,
  coachSendMessage,
  getUserChat,
  getAllSupportUsers
} from "../controllers/supportController.js";

const supportRouter = express.Router();

// USER sends message 
supportRouter.post("/user", userSendMessage);
supportRouter.post("/user/send", userSendMessage);

// COACH sends message 
supportRouter.post("/coach", coachSendMessage);
supportRouter.post("/coach/send", coachSendMessage);


supportRouter.get("/chat/:userId", getUserChat);


supportRouter.get("/users", getAllSupportUsers);

export default supportRouter;
