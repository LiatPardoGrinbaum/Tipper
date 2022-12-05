// import API from "../../api/user.api";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import API from "../../api/user.api";

export const UserManager = (props) => {
  const onHandleDelete = () => {
    confirmAlert({
      title: "Delete alert!",
      message: "Are you sure  you want to delete your acount?\nAll your tips will be deleted!",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await API.delete(`/users/me`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
            });
            localStorage.clear();
            props.history.push("/");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="user-manager">
      <Link to="/user/update">
        <button className="btn">Update my account</button>
      </Link>
      <button className="btn" style={{ color: "grey" }} onClick={onHandleDelete} disabled>
        Delete my account
      </button>
    </div>
  );
};
