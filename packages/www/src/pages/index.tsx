import { NextPage } from "next";
import React from "react";
import wowi from "wowi";

const IndexPage: NextPage = () => {
  React.useEffect(() => {
    new wowi({
      onChange: (snapshot) => {
        console.log(snapshot);
      },
    });
  }, []);
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default IndexPage;
