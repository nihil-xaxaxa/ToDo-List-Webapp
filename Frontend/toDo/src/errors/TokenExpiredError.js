export class TokenExpiredError extends Error {
  constructor(message="Token Expired ! log back again"){
    super(message)
  }

}