function Notification({ message }) {
  if (message === null) {
    return null
  }

  return (
    <div className="notification error mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {message}
    </div>
  )
}

export default Notification
