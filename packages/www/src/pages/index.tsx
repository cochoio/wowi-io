import { NextPage } from "next";
import React from "react";
import wowi from "wowi";

const IndexPage: NextPage = () => {
  const [users, setUsers] = React.useState(0);
  React.useEffect(() => {
    new wowi({
      onChange: (snapshot) => {
        if (snapshot.subscribers) {
          setUsers(snapshot.subscribers.length);
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>hello world {users}</h1>
    </div>
  );
};

export default IndexPage;
