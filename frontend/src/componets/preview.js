import React from "react";

function Preview({ link }) {

  return (
    <div className="preview-container">
        <iframe width="700" height="505" src={`https://www.youtube.com/embed/${link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
}

export default Preview;
