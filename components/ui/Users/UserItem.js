import Link from 'next/link'
import userStyles from './User.module.css'

const UserItem = ({ user }) => {
  return (
    <Link href="/user/[id]" as={`/user/${user.id}`} className={userStyles.card}>
      <h3>{user.name}&rarr;</h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.address}</p>
    </Link>
  )
}

export default UserItem
