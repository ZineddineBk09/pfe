import { connectToDatabase } from '../../../../lib/mongodb'
//handler
export default async function handler(req, res) {
  // switch the methods
  if (req.method == 'GET') {
    activateClient(req, res)
  }
}

export async function activateClient(req, res) {
  const clientId = req.query.clientId
  console.log('_____________________________')
  if (!clientId) {
    return res.status(401).json({ message: 'Cannot Validate a Client!' })
  } else {
    //Megrate the client from pending clients collection to active clients collection
    const { db } = await connectToDatabase()
    const pendingClient = await db
      .collection('pendingClients')
      .findOne({ id: clientId })

    if (!pendingClient) {
      return res.status(401).json({ message: 'Cannot Validate a Client! 1' })
    }
    const activeClient = await db.collection('clients').insertOne(pendingClient)

    if (!activeClient) {
      return res.status(401).json({ message: 'Cannot Validate a Client! 2' })
    }
    //Delete the client from pending clients collection
    const deletedClient = await db
      .collection('pendingClients')
      .deleteOne({ id: clientId })
    if (!deletedClient) {
      return res.status(401).json({ message: 'Cannot Validate a Client! 3' })
    }
    //return HTML page with a message that the client has been validated

    return res.status(200).send(`
      <h1>Vous etes inscrit avec succes ${pendingClient.username}</h1>
      <br/>
      <h2>
      <a href="/client/auth/signin">Inscrire ?</a>
      </h2>
      `)
  }

  res.end()
}
