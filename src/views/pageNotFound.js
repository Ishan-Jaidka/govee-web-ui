import React from "react";

export default function PageNotFound() {
  return (
    <>
      <div className="page-title">This page was not found!</div>
      <div className="page-description">
        It may be in development. Please try again later.
      </div>
      <a className="page-description" href="/">
        Click here to return home.
      </a>
    </>
  );
}
