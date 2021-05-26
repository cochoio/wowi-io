import Session from "../../session/Session";
import { subscriber } from "./redisClient";

class Subscription {
  subscriptionMap = new Map<string, Set<Session>>();

  subscribe(key: string, session: Session) {
    const registered = this.subscriptionMap.has(key);
    if (!registered) {
      //   subscriber.subscribe(key);
      this.subscriptionMap.set(key, new Set());
    }

    const sessionSet = this.subscriptionMap.get(key)!;
    sessionSet.add(session);
  }

  unsubscribe(page: string, session: Session) {
    const sessionSet = this.subscriptionMap.get(page);
    if (!sessionSet) return;
    sessionSet.delete(session);
  }

  dispatch(page: string) {
    console.debug("dispatch", page);
    const sessionSet = this.subscriptionMap.get(page);
    if (!sessionSet) return;
    sessionSet.forEach((value) => {
      value.sendSubscriptionMessage(page, {
        type: "Dispatch",
        subscribers: Array.from(sessionSet).map(
          (session) => session.responseSession
        ),
      });
    });
  }

  getPageSubscription(page: string) {
    const getPage = this.subscriptionMap.get(page);
    console.debug("getPage", getPage, !getPage);
    if (!getPage) return new Set<Session>();
    return getPage;
  }
}

const subscription = new Subscription();

export default subscription;
