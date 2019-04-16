import React from "react";

const Header = props => {
  let Greeting;
  if (props.user === null) {
    Greeting = <p>Welcome Guest</p>;
  } else if (props.user.user) {
    Greeting = (
      <p>
        Welcome <strong>{props.user.user}</strong>
      </p>
    );
  } else if (props.user.firstName) {
    Greeting = (
      <p>
        {" "}
        Welcome <stong>{props.user.firstName}</stong>
      </p>
    );
  }

  return (
    <div className="header">
      <div className="greeting">{Greeting}</div>
    </div>
  );
};

export default Header;
