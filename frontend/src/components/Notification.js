import React from 'react'

const Notification = ({ message }) => {

  if (message) {
    return (
      <div className="error" style={{ border: '2px solid red', borderRadius:'5px', padding:5, color:'red', marginBottom:10 }}>
        {message}
      </div>
    )
  }

  return null
}

export default Notification
