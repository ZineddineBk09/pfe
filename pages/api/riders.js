import { hashPassword, verifyPassword } from '../../lib/passwordHandler'
const { connectToDatabase } = require('../../lib/mongodb')
import { v4 } from 'uuid'
import { sendRiderConfirmationEmail } from '../../lib/mailer'

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getRiders(req, res)
    }

    case 'POST': {
      return addRider(req, res)
    }
    //PUT is a method of modifying resource where the client sends data that updates the entire resource . PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data
    //case 'PUT': {
    //  return updateRider(req, res)
    //}

    case 'PATCH': {
      return updateRider(req, res)
    }
    case 'DELETE': {
      return deleteRider(req, res)
    }
  }
}

async function addRider(req, res) {
  try {
    //Getting the body fields
    const {
      date,
      username,
      email,
      phoneNumber,
      haveTransport,
      havePermis,
      militaryFree,
      region,
      startingDate,
      password,
    } = JSON.parse(req.body)

    // connect to the database
    let { db, client } = await connectToDatabase()

    //check for existing email in riders collection
    const checkExistingMail1 = await db
      .collection('riders')
      .find({ email: email })
      .toArray()

    //check for existing email in pending riders collection
    const checkExistingMail2 = await db
      .collection('pendingRiders')
      .find({ email: email })
      .toArray()

    //check for existing phone
    const checkExistingPhoneNumber1 = await db
      .collection('riders')
      .find({
        phoneNumber: phoneNumber,
      })
      .toArray()

    //check for existing phone in pending riders collection
    const checkExistingPhoneNumber2 = await db
      .collection('pendingRiders')
      .find({
        phoneNumber: phoneNumber,
      })
      .toArray()

    if (checkExistingMail1?.length > 0 || checkExistingMail2?.length > 0) {
      console.log(
        'Email already exists : ',
        checkExistingMail1[0]?.email || checkExistingMail2[0]?.email
      )
      res.status(422).send({
        message: "E-mail de l'utilisateur existe déjà",
        success: false,
      })
      //client.close()
      return
    }
    if (
      checkExistingPhoneNumber1?.length > 0 ||
      checkExistingPhoneNumber2?.length > 0
    ) {
      res.status(422).send({
        message: "Le numéro de téléphone de l'utilisateur existe déjà",
        success: false,
      })
      //client.close()
      return
    }

    const hashedPass = await hashPassword(password)
    const id = v4().toString()
    // add the Rider and hashing the password
    //JSON.parse() takes a JSON string and transforms it into a JavaScript object.

    //send confirmation email
    await sendRiderConfirmationEmail({
      toUser: {
        email,
        username,
      },
      riderId: id,
    })

    await db.collection('pendingRiders').insertOne({
      id,
      date,
      username,
      email,
      phoneNumber,
      haveTransport,
      havePermis,
      militaryFree,
      region,
      startingDate,
      orders: [], //delivered orders
      password: hashedPass,
    })

    //add the rider image to images collection
    await db.collection('images').insertOne({
      id,
      image: '',
    })


    // return a message
    return res.status(200).json({ message: 'Inscription avec succés !' })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function getRiders(req, res) {
  try {
    // connect to the database
    // fetch the Riders
    let { db, client } = await connectToDatabase()

    let riders = await db
      .collection('riders')
      .find({ name: 'rider 1' })
      .toArray()
    // return the Riders
    //client.close()
    return res.json({
      message: riders,
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

async function updateRider(req, res) {
  try {
    const delivery = JSON.parse(req.body)

    // connect to the database
    let { db, client } = await connectToDatabase()

    const rider = await db.collection('riders').findOne(
      {
        id: delivery.riderId,
      },
      { _id: false }
    )

    if (delivery.message == 'UPDATE ORDERS') {

      //Add to the orders array
      // update the Orders with the new Order a,d overwrite it's state
      await db.collection('riders').updateOne(
        {
          id: delivery.riderId,
        },
        { $addToSet: { orders: { ...delivery, state: 2 } } }
      )
    } else if (delivery.message == 'DELETE ORDER') {

      //Delete from the orders array
      await db.collection('riders').updateOne(
        {
          id: delivery.riderId,
        },
        { $pull: { orders: { id: delivery?.orderId } } }
      )
    } else if (delivery.message == 'UPDATE STATE') {

      //Delete from the orders array
      await db.collection('riders').updateOne(
        {
          id: delivery.riderId,
          'orders.id': delivery.orderId,
        },
        { $set: { 'orders.$.state': delivery?.orderState } }
      )
    }

    //client.close()
    res.status(200).json({ message: 'Rider Orders updated!' })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function deleteRider(req, res) {
  try {
    // Connecting to the database
    let { db, client } = await connectToDatabase()

    // Deleting the Rider
    await db.collection('riders').deleteOne({})

    // returning a message
    //client.close()
    return res.json({
      message: 'Rider deleted successfully',
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
