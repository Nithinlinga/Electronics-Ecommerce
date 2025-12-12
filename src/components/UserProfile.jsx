import { useSelector } from "react-redux"

const UserProfile = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <div>{ user?JSON.stringify(user):<span>you are not Logged IN</span>}</div>
  )
}

export default UserProfile