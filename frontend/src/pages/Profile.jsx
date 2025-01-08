import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();  // Get the dynamic 'id' param from the URL

  // Your component logic
  console.log(id);
  
  return <div>Profile Page for User {id}</div>;
};
export default Profile;