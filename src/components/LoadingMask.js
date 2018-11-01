import React from 'react';

import './LoadingMask.css';

export default function (props) {
  return (
    <div className="fullScreenMask loadingMask">
        <div style={{margin: "auto", padding: "30px", display: "block", textAlign: "center", fontSize: "20px", color: "#fff", fontWeight: "bold"}}>
          ... LOADING ...
        </div>
        <div className='lmask'></div>
    </div>
  )
}
