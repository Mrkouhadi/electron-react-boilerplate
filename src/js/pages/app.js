import React from "react";

const app = () => {

  const Notify = ()=>{
    electron.notificationApi.sendNotification('My message notification ! ')
  }
  return (
    <div className="app">
      App 
      <button onClick={Notify}>Send Notification</button>
    </div>
  )
}

export default app