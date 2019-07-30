import jwt from "jsonwebtoken"

const createJWT = (userID: number): string => {
  const token = jwt.sign(
    {
      id: userID
    },
    process.env.JWT_SECRET || ""
  )
  return token
}

export default createJWT
