import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

function Input({ props }) {
  const [inputType, setInputType] = useState("password");

  const inputTextType = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <div className="mb-md-3 mb-4">
      <label htmlFor={props.name} className="form-label fw-bold ">
        {props.label}
      </label>
      {props.name == "password" || props.name == "confirm_password" ? (
        <div className="input-group">
          <input
            type={inputType}
            className="form-control border-end-0"
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.disabled}
            value={props.value}
          />
          <span
            className="input-group-text bg-transparent fs-4 pe-3"
            onClick={() => inputTextType()}
          >
            {inputType == "password" ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </span>
        </div>
      ) : (
        <input
          type={props.type}
          className="form-control"
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          disabled={props.disabled}
          value={props.value}
          required
        />
      )}
      <small className="form-text text-danger ">
        {props.errMsg ? props.errMsg : " "}
      </small>
    </div>
  );
}

export default Input;
