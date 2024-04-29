import React from "react";

const Navbar = ({ store, idx }) => {
  return (
    <div>
      {store.map((idx) => {
        return <div>{idx + 1}</div>;
      })}
    </div>
  );
};

export default Navbar;
