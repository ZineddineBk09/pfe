const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { db, client } = await connectToDatabase()
      //get the category key from the request body
      const { riderId, image } = JSON.parse(req.body)

      const result = await db
        .collection('images')
        .updateOne({ id: riderId }, { $set: { image: image } })

      //return the orders as json
      res.status(200).json('image updated successfuly')
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
