import Signup from "../signup/Signup";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";

const UpdateUser = () => {
  const { setUpdatedMode } = useContext(MyContext);
  useEffect(() => {
    setUpdatedMode(true);
  }, [setUpdatedMode]);

  return (
    <div className="updateAccount-container">
      <Signup />
    </div>
  );
};

export default UpdateUser;
