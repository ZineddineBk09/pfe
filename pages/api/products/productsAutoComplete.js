
const { connectToDatabase } = require('../../../lib/mongodb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db, client } = await connectToDatabase()

    //get the search term entered from the user
    const { query } = JSON.parse(req.body)

    //pipelined search query
    let pipeline = [
      {
        $search: {
          index: 'products_autocomplete_index',
          autocomplete: {
            query: query,
            path: 'name',
            tokenOrder: 'sequential',
          },
        },
      },
      {
        $limit: 7, //limit the number of results to 7
      },
      {
        $project: {
          //get only the name, id and img of the product
          _id: 0,
          id: 1,
          name: 1,
          img: 1,
        },
      },
    ]

    const products = await db
      .collection('products')
      .aggregate(pipeline)
      .toArray()

    //return the products as json
    res.status(200).json(products)
  } else {
    res.status(404).json({
      error: 'not found',
    })
  }
}
