import User from "../../../entities/User"
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resovlers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args

      try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
          return {
            ok: false,
            error: "You already has account!",
            token: null
          }
        } else {
          const newUser = await User.create({ ...args }).save()
          return {
            ok: true,
            error: null,
            token: createJWT(newUser.id)
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resovlers
