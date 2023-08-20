import React from "react";

const NotificationBadge = ({ count }) => {
  return (
    <div
      style={{
        fontSize: "10px",
        fontWeight: "bold",
        position: "absolute",
        width: 15,
        height: 15,
        borderRadius: "50%",
        backgroundColor: count ? "red" : "",
        color: "black",
      }}
    >
      {count === 0 ? <></> : count}
    </div>
  );
};

export default NotificationBadge;
