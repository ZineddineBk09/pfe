import { hashPassword, verifyPassword } from '../../lib/passwordHandler'
import { getSession } from 'next-auth/react'
const { connectToDatabase } = require('../../lib/mongodb')
import { v4 } from 'uuid'
import { sendClientConfirmationEmail } from '../../lib/mailer'

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getClients(req, res)
    }

    case 'POST': {
      return addClient(req, res)
    }
    //PUT is a method of modifying resource where the client sends data that updates the entire resource . PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data
    //case 'PUT': {
    //  return updateRider(req, res)
    //}

    case 'PATCH': {
      return updateClient(req, res)
    }
    case 'DELETE': {
      return deleteClient(req, res)
    }
  }
}

async function addClient(req, res) {
  try {
    //Getting the body fields
    const { date, username, email, password } = JSON.parse(req.body)
    // connect to the database
    let { db, client } = await connectToDatabase()

    //check for existing email in clients collection
    const checkExistingMail1 = await db
      .collection('clients')
      .find({ email: email })
      .toArray()

    //check for existing email in pending clients collection
    const checkExistingMail2 = await db
      .collection('pendingClients')
      .find({ email: email })
      .toArray()

    if (checkExistingMail1?.length > 0 || checkExistingMail2?.length > 0) {
      res.status(422).send({
        message: "E-mail de l'utilisateur existe déjà",
        success: false,
      })
      //client.close()
      return
    }

    //check for existing username in clients collection
    const checkExistingUsername1 = await db
      .collection('clients')
      .find({ username: username })
      .toArray()

    //check for existing username in pending clients collection
    const checkExistingUsername2 = await db
      .collection('pendingClients')
      .find({ username: username })
      .toArray()

    if (
      checkExistingUsername1?.length > 0 ||
      checkExistingUsername2?.length > 0
    ) {
      res.status(422).send({
        message: "Username de l'utilisateur existe déjà",
        success: false,
      })
      //client.close()
      return
    }

    const hashedPass = await hashPassword(password)
    const id = v4().toString()
    //send confirmation email
    await sendClientConfirmationEmail({
      toUser: {
        email,
        username,
      },
      clientId: id,
    })
    // add the Rider and hashing the password
    //JSON.parse() takes a JSON string and transforms it into a JavaScript object.

    await db.collection('pendingClients').insertOne({
      id,
      date,
      username,
      email,
      password: hashedPass,
    })

    //add the client image to images collection
    await db.collection('images').insertOne({
      id,
      image: '',
    })

    // return a message
    return res.status(200).send({
      message: 'Client added successfully',
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

async function getClients(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase()
    // fetch the Riders
    let Clients = await db
      .collection('clients')
      .find({ name: 'rider 1' })
      .toArray()
    // return the Clients
    return res.json({
      message: Clients,
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

async function updateClient(req, res) {
  try {
    const session = await getSession({ req: req })

    if (!session) {
      res.status(401).json({ message: 'Not authenticated!' })
      return
    }

    const userEmail = session.user.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    // connect to the database
    let { db, client } = await connectToDatabase()

    const rider = await db.collection('clients').findOne({ email: userEmail })
    if (!rider) {
      res.status(404).json({ message: 'User not found.' })
      //client.close()
      return
    }

    //Check if the old password is correct
    const currentPassword = rider.password
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
      res.status(403).json({ message: 'Invalid password.' })
      //client.close()
      return
    }

    // update the published status of the Rider
    const hashedPassword = await hashPassword(newPassword)

    const result = await db
      .collection('clients')
      .updateOne({ email: userEmail }, { $set: { password: hashedPassword } })

    //client.close()
    res.status(200).json({ message: 'Password updated!' })
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    })
  }
}

async function deleteClient(req, res) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase()

    // Deleting the Rider
    await db.collection('clients').deleteOne({})

    // returning a message
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
