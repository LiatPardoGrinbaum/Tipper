// import API from "../../api/user.api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { confirmAlert } from "react-confirm-alert";
import API from "../../api/user.api";

export const UserManager = (props) => {
  const { setUpdatedMode } = useContext(MyContext);

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
        <button className="btn" onClick={() => setUpdatedMode(true)}>
          Update my account
        </button>
      </Link>
      <button className="btn" style={{ color: "rgb(223, 82, 82)" }} onClick={onHandleDelete}>
        Delete my account
      </button>
    </div>
  );
};
