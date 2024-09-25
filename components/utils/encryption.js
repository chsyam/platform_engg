import * as fernet from 'fernet'

export default function encrypt(data) {
    const secret = new fernet.Secret(process.env.FERNET_SECRET);
    var token = new fernet.Token({
        secret: secret,
        time: Date.parse(1)
      })
      let pass=token.encode(data)
      return pass
}