const ErrorHandler = {
  handleApiError: (responseData) => {
    if (responseData.friendly_message) {
      console.log(responseData.friendly_message)
    } else if (responseData.backtrace) {
      console.log("Server error with backtrace:", responseData.backtrace)
    } else {
      console.log("Oops, server error!!!!")
    }
  }
}

export default ErrorHandler;
