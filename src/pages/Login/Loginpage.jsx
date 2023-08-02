import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/api";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


function Loginpage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useHistory();
  const { auth, googleLogin } = useAuth();
 
  useEffect(() => {
    if (auth) {
      navigate.push("/");
    }
  }, [auth]);

  const closeAlert = () => {
    setShow(false);
    setError("");
    setMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordRef.current?.value || !emailRef.current?.value) {
      setError("Please fill in the fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (error) setError(error.message);
      if (user) {
        setMsg("Login successful");
        navigate.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) setError(error.message);
    } catch (error) {
      setError(error.message);
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
                <h3 className="logTitle">Welcome back👋</h3>
                <p className="logText">Sign In to your Account</p>
              </div>

              {error && (
                <Alert
                  variant="danger"
                  onClose={() => closeAlert()}
                  dismissible
                >
                  <Alert.Heading>Oh Error!</Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}

              <form onSubmit={handleLogin} action="" className="input-group">
                <input
                  ref={emailRef}
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="forgotPass">
                  <Link to="/reset-password">Forgot Password?</Link>
                </div>
                <div className="loginBtn">
                  <button className="cta" type="submit">
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
                      "Log in"
                    )}
                  </button>
                </div>
              </form>
              <div className="connectBtns">
                <button onClick={handleGoogleLogin} className="abtn google">
                  <img
                    src="./img/google.webp"
                    className="img-fluid"
                    alt="googlelogo"
                  />
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
                      ): <>Continue With Google</>}
                  
                </button>
                <a href="#link" className="abtn apple">
                  <img
                    src="./img/path4.png"
                    className="img-fluid"
                    alt="applelogo"
                  />
                  Continue With Apple
                </a>
              </div>
              <div>
                Don't have an account? <Link to="/signup" className="signupLink">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loginpage;
