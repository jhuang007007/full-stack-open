const Notification = ( { message, status }) => {
  if (message === null) return null
  const classes = `message ${status}`

  return (
    <div className={classes} >
      {message}
    </div>
  )
}

export default Notification