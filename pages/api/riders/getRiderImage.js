const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { db, client } = await connectToDatabase()
      //get the category key from the request body
      const { riderId } = JSON.parse(req.body)

      const product = await db
        .collection('images')
        .findOne({ id: riderId }, { _id: false })

      //return the product as json
      res.status(200).json(product)
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
