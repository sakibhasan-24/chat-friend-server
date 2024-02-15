import Chat from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    // need message,receiver id and sender id
    const { message } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    let conversation = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    // if conversation is not available
    if (!conversation) {
      // create a conversation
      conversation = await Chat.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      message,
      senderId,
      receiverId,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: betweenTwoUserChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Chat.findOne({
      participants: { $all: [senderId, betweenTwoUserChatId] },
    }).populate("message");
    if (!conversation) {
      return res.status(200).json({});
    }
    const message = conversation.message;
    return res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};
