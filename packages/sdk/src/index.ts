import _ from "lodash";

export interface Option {
  page?: string;
  type?: "SetPage" | "GetUsers";
  onChange: (snapshot: any) => void;
}

let LIVE_SERVER = "ws://live.alleyverd.com/ws";
// LIVE_SERVER = `ws://localhost:5000/ws`;

class wowi {
  private $ws: WebSocket;
  private $option: Option;

  constructor(option: Option) {
    this.$option = option;

    console.log("Socket Connect => ");
    this.$ws = new WebSocket(LIVE_SERVER);

    this.$ws.onopen = (event) => {
      console.log("Logging event", event);
      this.setPage(window.location.href);
    };

    this.$ws.onerror = (err) => console.log(err);

    this.$ws.onmessage = (message) => {
      console.log("messaeg", message);
      this.$option.onChange(JSON.parse(message.data));
    };
  }

  public setPage(page: string) {
    this.setOption({
      ...this.$option,
      type: "SetPage",
      page,
    });
  }

  public setOption(option: Option) {
    this.$option = option;

    const json = JSON.stringify({
      page: window.location,
      ...option,
      appVersion: window.navigator.appVersion,
      platform: window.navigator.platform,
    });

    this.$ws.send(json);
  }

  public get count() {
    this.$ws.send(
      JSON.stringify({
        type: "GetUsers",
        page: this.$option.page,
      })
    );
    return;
  }
}

export default wowi;
