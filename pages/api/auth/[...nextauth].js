import { verifyPassword } from '../../../lib/passwordHandler'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/mongodb'

export default NextAuth({
  //adapter: MongoDBAdapter(clientPromise),
  //Configure JWT
  session: {
    jwt: true,
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        //   console.log('Session : ', session)
        // console.log('Token : ', token)
        session.user = token.user
        session.user.provider = token.provider
        // console.log('Session after change: ', session)
      }
      return session
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        //console.log('Token : ', token)

        token.user = user
        token.provider = account.provider
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ['/rider/auth/signin', '/client/auth/signin'],
    signOut: '/',
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      id: 'rider-provider',
      name: 'rider-credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'e-mail' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //console.log('Credentials : ', credentials)

        //Connect to DB
        let { db, client } = await connectToDatabase()

        //Find rider with the email
        const result = await db.collection('riders').findOne({
          email: credentials.email,
        })
        //Not found - send error res
        if (!result) {
          console.log('User not found !!!!!!!!!!')
          throw new Error("Aucun livreur trouvé avec l'e-mail")
        }
        //Check hashed password with DB password
        const checkPassword = await verifyPassword(
          credentials.password,
          result.password
        )
        //Incorrect password - send response
        if (!checkPassword) {
          console.log("Password doesn't match")
          throw new Error("Le mot de passe ou l'e-mail ne correspond pas")
        }
        //Else send success response
        //client.close()
        return {
          id: result.id,
          name: result.email.split('@')[0],
          email: result.email,
          date: result.date,
        }
      },
    }),

    CredentialsProvider({
      id: 'client-provider',
      name: 'client-credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'e-mail' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //console.log('Credentials : ', credentials)

        //Connect to DB
        let { db, client } = await connectToDatabase()

        //Find rider with the email
        const result = await db.collection('clients').findOne({
          email: credentials.email,
        })
        //Not found - send error res
        if (!result) {
          console.log('Client not found !!!!!!!!!!')
          throw new Error("Aucun client trouvé avec l'e-mail")
        }
        //Check hased password with DB password
        const checkPassword = await verifyPassword(
          credentials.password,
          result.password
        )
        //Incorrect password - send response
        if (!checkPassword) {
          console.log('Password doesnt match')
          throw new Error("Le mot de passe ou l'e-mail ne correspond pas")
        }
        //Else send success response

        return {
          id: result.id,
          name: result.username,
          email: result.email,
          date: result.date,
        }
      },
    }),
  ],
})
