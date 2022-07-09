import spinner from "../../assets/Rolling-spinner.svg";

export const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading" />
    </div>
  );
};
