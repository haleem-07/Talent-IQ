import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

export const chatClient = apiKey && apiSecret ? StreamChat.getInstance(apiKey, apiSecret) : null;
export const streamClient = apiKey && apiSecret ? new StreamClient(apiKey, apiSecret) : null;

export const upsertStreamUser = async (userData) => {
  try {
    if (!chatClient) return;
    await chatClient.upsertUser(userData);
  } catch (error) {}
};

export const deleteStreamUser = async (userId) => {
  try {
    if (!chatClient) return;
    await chatClient.deleteUser(userId);
  } catch (error) {}
};
