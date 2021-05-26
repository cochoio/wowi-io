import _ from "lodash";

export interface Option {
  page?: string;
  type?: "SetPage" | "GetUsers";
  onChange: (snapshot: any) => void;
}

class Wowi {
  private $ws: WebSocket;
  private $option: Option;

  constructor(option: Option) {
    this.$option = option;

    this.$ws = new WebSocket("ws://localhost:3001/ws");

    this.$ws.onopen = (event) => {
      this.setPage(window.location.href);
    };

    this.$ws.onmessage = (message) => {
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

export default Wowi;
