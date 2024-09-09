import style from "../css/RegisterLoginLayout.module.css";

const RegisterLoginLayout = ({ children }) => {
  return (
    <div className="w-100  h-100 align-items-center  justify-content-center d-flex">
      <div className={`card ${style.customCard} `}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default RegisterLoginLayout;
