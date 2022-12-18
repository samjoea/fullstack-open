
const Notification = ({ message, error, setNotify }) => {
  const notificationStyle = {
   border: `3px solid ${error ? 'red' : 'green'}`,
   borderRadius: '10px',
   height: '50px',
   color: `${error ? 'red' : 'green'}`,
   display: 'flex',
   alignItems: 'center',
   paddingLeft: '20px',
   backgroundColor: 'lightgray'
}
  setTimeout(() => {
   setNotify(false);
  }, 2000);

  return (
    <div style={notificationStyle}>{ message }</div>
  )
}

export default Notification;