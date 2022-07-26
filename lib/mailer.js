const nodemailer = require('nodemailer')

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    })

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}

exports.sendClientConfirmationEmail = function ({ toUser, clientId }) {
  console.log('Sending confirmation email to: ', toUser.email)

  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email, // in production uncomment this
    //to: process.env.GOOGLE_USER,
    subject: 'Your App - Activate Account',
    html: `
      <h3> Hello ${toUser.username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/clients/activateClient/${clientId}">Activate account</a></p>
      <p>Cheers</p>
      <p>Algeria Developers.</p>
    `,
  }

  return sendEmail(message)
}

exports.sendResetPasswordEmail = ({ toUser, clientId }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: process.env.GOOGLE_USER,
    subject: 'Your App - Reset Password',
    html: `
      <h3>Hello ${toUser.username} </h3>
      <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/reset-password/${clientId}">Reset Password Link</a></p>
      <p>Cheers,</p>
      <p>Your Application Team</p>
    `,
  }

  return sendEmail(message)
}



exports.sendRiderConfirmationEmail = function ({ toUser, riderId }) {
  console.log('Sending confirmation email to: ', toUser.email)

  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email, // in production uncomment this
    //to: process.env.GOOGLE_USER,
    subject: 'Your App - Activate Account',
    html: `
      <h3> Hello ${toUser.username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/riders/activateRider/${riderId}">Activate account</a></p>
      <p>Cheers</p>
      <p>Algeria Developers.</p>
    `,
  }

  return sendEmail(message)
}