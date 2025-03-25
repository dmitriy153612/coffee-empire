export interface User {
  id: string
  name: string
  surname: string
  credentials: UserCredentials
  active: boolean
  created: string
  _comment: string
}

export interface UserCredentials {
  username: string
  passphrase: string
}

export interface TokenData {
  userId: string
  active: boolean
  name: string
  surname: string
}
