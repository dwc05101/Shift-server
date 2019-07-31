import jwt from "jsonwebtoken"
import Organization from "../entities/Organization"

const decodeJWT = async (token: string): Promise<Organization | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "")
    const { id } = decoded
    const user = await Organization.findOne({ id })
    return user
  } catch (error) {
    return undefined
  }
}

export default decodeJWT
