const Input = ({ type, id, label, onChange, value, placeholder }) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
