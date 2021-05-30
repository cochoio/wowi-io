import { FastifyPluginAsync } from "fastify";
import { isAction } from "../lib/websocket/receiver";
import Session from "../session/Session";

const websocket: FastifyPluginAsync = async (fastify) => {
  fastify.get(`/ws`, { websocket: true }, (connection, req) => {
    console.debug("Server Connect Session => ", req.ip);
    const session = new Session(connection.socket);
    console.debug("Server Connect Session: Success => ", req.ip);

    connection.socket.on("message", (message) => {
      console.log("message", message);
      try {
        const data = JSON.parse(message.toString());
        if (!isAction(data)) {
          console.debug(data);
          return;
        }
        session.handleMessage(data);
      } catch (e) {
        console.error(e);
      }
    });

    connection.socket.on("close", (code, reason) => {
      session.handleMessage({
        type: "UnSubscribe",
      });
    });
  });
};

export default websocket;
