import { createHmac } from "crypto";
import _ from "lodash";
import * as uuid from "uuid";
import WebSocket from "ws";
import subscription from "../lib/redis/subscription";
import { IReceiver } from "../lib/websocket/receiver";

const { SESSION_SECRET_KEY } = process.env;

class Session {
  id: string;
  private token: string;
  private socket: WebSocket;
  private currentPage: string;

  constructor(socket: WebSocket) {
    this.id = uuid.v4();
    this.socket = socket;

    try {
      this.token = createHmac("sha256", SESSION_SECRET_KEY!)
        .update(this.id)
        .digest("hex");
    } catch (e) {
      console.error(e);
    }

    this.sendConnectInfo();
  }

  public sendConnectInfo() {
    this.send(this.responseSession);
  }

  public send(data: object) {
    try {
      console.debug("send message", JSON.stringify(data));
      this.socket.send(JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  handleMessage(action: IReceiver) {
    console.log("ActionType", action.type);
    switch (action.type) {
      case "SetPage":
        this.currentPage = action.page;
        subscription.subscribe(action.page, this);
        subscription.dispatch(action.page);
        break;
      case "GetUsers":
        const getPageSubcription = subscription.getPageSubscription(
          action.page
        );
        try {
          console.debug("getPageSubcription", Array.from(getPageSubcription));
        } catch (e) {
          console.error(e);
        }
        this.send({
          type: "GetUsers",
          subscription: Array.from(getPageSubcription).map(
            (session) => session.responseSession
          ),
        });
        break;
      case "UnSubscribe":
        subscription.unsubscribe(this.currentPage, this);
        subscription.dispatch(this.currentPage);
        break;
    }
  }

  public sendSubscriptionMessage(key: string, message: any) {
    this.send({
      ...message,
    });
  }

  public get responseSession() {
    return _.omit(this, ["socket"]);
  }
}

export default Session;
