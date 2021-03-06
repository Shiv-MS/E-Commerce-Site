import React, { useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Store } from "../../store";
import { loginUser, setErrors } from "../../store/actions/authActions";
import classnames from "classnames";
import "./Login.css";

const Login = (props) => {
  const { state, dispatch } = useContext(Store);
  const errors = state.error;
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (state.auth.isAuthenticated) props.history.push("/ShoppingCart");
  }, [state, props]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(setErrors({ response: { data: {} } }));
console.log(errors)
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(userData, props.history)(dispatch);
  };

  // const register = (e) => {
  //   e.preventDefault();
  //   history.push('/register')
  // };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://trufit-assets.s3.amazonaws.com/003Project/images/images.png"
          alt=""
          className="login_logo"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form onSubmit={onSubmit}>
          <h5>E-mail</h5>
          <input
            ref={emailRef}
            error={errors.incorrect}
            name="email"
            type="email"
          />
          <h5>Password</h5>
          <input
            ref={passwordRef}
            error={errors.incorrect}
            name="password"
            type="password"
            className={classnames("", { invalid: errors.incorrect })}
          />
          {errors? <p className="error">{errors.message}</p> : ""}
          <button className="login_signInButton" type="submit">
            Sign-in
          </button>
        </form>
        <button className="login_registerButton" type="submit">
          Don't have an account? <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
