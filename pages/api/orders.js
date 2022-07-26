const { connectToDatabase } = require('../../lib/mongodb')
import { v4 } from 'uuid'

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getOrders(req, res)
    }

    case 'POST': {
      return addOrder(req, res)
    }

    case 'PATCH': {
      return updateOrder(req, res)
    }

    case 'DELETE': {
      return deleteOrder(req, res)
    }

    case 'some': {
      return console.log('------------------------SOME------------------------')
    }
  }
}

async function addOrder(req, res) {
  try {
    // connect to the database
    let { db, client } = await connectToDatabase()
    // add the Order
    //state : 1 => ready , 2 => in progress , 3 => delivered
    await db
      .collection('orders')
      .insertOne({ id: v4().toString(), ...JSON.parse(req.body), state: 1 })

    //reduce the quantity of the products in the database
    const { products } = JSON.parse(req.body)
    products.forEach(async (product) => {
      await db
        .collection('products')
        .updateOne(
          { id: product.id },
          { $set: { units: product.units - product.quantity } }
        )
    })

    // return a message
    // client.close()
    return res.json({
      message: 'Order added successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function getOrders(req, res) {
  try {
    // connect to the database
    let { db, client } = await connectToDatabase()
    // fetch the Orders
    let Orders = await db
      .collection('orders')
      .find({})
      .sort({ published: -1 })
      .toArray()
    // return the Orders
    //client.close()
    return res.json({
      message: JSON.parse(JSON.stringify(Orders)),
      success: true,
    })
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function updateOrder(req, res) {
  try {
    const { id, clientId, riderId, riderName, orderState, products } =
      JSON.parse(req.body)

    // connect to the database
    let { db, client } = await connectToDatabase()

    // update the state of the Order
    //state : 1 => ready , 2 => in progress , 3 => delivered
    await db.collection('orders').updateOne(
      {
        id: id,
      },
      { $set: { state: orderState } }
    )

    //notify the client (switch case)
    switch (orderState) {
      //2nd case : the order is accepted(state : 2)
      case 2: {
        await db.collection('notifications').insertOne({
          id: v4().toString(),
          clientId: clientId,
          riderId: riderId,
          riderName: riderName,
          message: 'Votre commande a été acceptée par ' + riderName,
          date: new Date(),
          products: products,
        })
        break
      }

      //3rd case : the order is delivered(state : 3)
      case 3: {
        await db.collection('notifications').insertOne({
          id: v4().toString(),
          clientId: clientId,
          riderId: riderId,
          riderName: riderName,
          message: 'Votre commande a été livrée par ' + riderName,
          date: new Date(),
          products: products,
        })
        break
      }
    }

    // return a message
    //client.close()
    return res.json({
      message: 'Order updated successfully',
      success: true,
    })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = JSON.parse(req.body)

    // Connecting to the database
    let { db, client } = await connectToDatabase()

    // Deleting the Order
    await db.collection('orders').deleteOne({
      id: id,
    })

    // returning a message
    // client.close()
    return res.json({
      message: 'Order deleted successfully',
      success: true,
    })
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
