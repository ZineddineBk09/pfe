import { connectToDatabase } from '../../../../lib/mongodb'
//handler
export default async function handler(req, res) {
  // switch the methods
  if (req.method == 'GET') {
    activateRider(req, res)
  }
}

export async function activateRider(req, res) {
  const riderId = req.query.riderId
  console.log('_____________________________')
  console.log('riderId : ', riderId)
  if (!riderId) {
    return res.status(401).json({ message: 'Cannot Validate a Rider!' })
  } else {
    //Megrate the client from pending clients collection to active clients collection
    const { db } = await connectToDatabase()
    const pendingRider = await db
      .collection('pendingRiders')
      .findOne({ id: riderId })
    console.log('pendingRider : ', pendingRider)

    if (!pendingRider) {
      return res.status(401).json({ message: 'Cannot Validate a Rider! 1' })
    }
    const activeRider = await db.collection('riders').insertOne(pendingRider)
    console.log('activeRider : ', activeRider)

    if (!activeRider) {
      return res.status(401).json({ message: 'Cannot Validate a Rider! 2' })
    }
    //Delete the client from pending clients collection
    const deletedRider = await db
      .collection('pendingRiders')
      .deleteOne({ id: riderId })
    if (!deletedRider) {
      return res.status(401).json({ message: 'Cannot Validate a Rider! 3' })
    }
    //return HTML page with a message that the client has been validated

    return res.status(200).send(`
      <h1>Vous etes inscrit avec succes ${pendingRider.username}</h1>
      <br/>
      <h2>
      <a href="/rider/auth/signin">Inscrire ?</a>
      </h2>
      `)
  }

  res.end()
}
