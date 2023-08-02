import React, { useState, useRef, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { supabase } from "../../lib/api";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./Signup.css";

function Singuppage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate.push("/");
    }
  }, [auth]);

  const closeAlert = () => {
    setShow(false);
    setErrorMsg("");
    setMsg("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setErrorMsg("Passwords do not match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      if (!error && data) {
        setMsg("Registration Successful");
        navigate.push("/");
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) setErrorMsg(error.message);
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <section className="loginSection">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="loginWrapper">
              <div className="heading">
                <h3 className="logTitle">Welcome👋</h3>
                <p className="logText">Create Your Account</p>
              </div>

              {errorMsg && (
                <Alert
                  variant="danger"
                  onClose={() => closeAlert()}
                  dismissible
                >
                  <Alert.Heading>Oh Error!</Alert.Heading>
                  <p>{errorMsg}</p>
                </Alert>
              )}

              {msg && (
                <Alert
                  variant="success"
                  onClose={() => closeAlert()}
                  dismissible
                >
                  <Alert.Heading>Successful!</Alert.Heading>
                  <p>{msg}</p>
                </Alert>
              )}

              <form onSubmit={handleRegister} action="" className="input-group">
                <input
                  type="Email"
                  className="form-control"
                  ref={emailRef}
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="form-control"
                  ref={passwordRef}
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="form-control"
                  ref={confirmPasswordRef}
                  placeholder="Retype Password"
                />

                <div className="loginBtn">
                  <button className="cta signupBtn" type="submit">
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </>
                    ) : (
                      "sign up"
                    )}
                  </button>
                </div>
              </form>
              <div className="connectBtns">
                <button onClick={handleGoogleLogin} className="abtn google">
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="/img/google.webp"
                        className="img-fluid"
                        alt="googlelogo"
                      />
                      Continue With Google
                    </>
                  )}
                </button>
                <a href="#link" className="abtn apple">
                  <img
                    src="/img/path4.png"
                    className="img-fluid"
                    alt="applelogo"
                  />
                  Continue With Apple
                </a>
              </div>
              <div>
                Already have an account?{" "}
                <Link className="loginLink" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Singuppage;
