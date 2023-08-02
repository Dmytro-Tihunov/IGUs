import { useState, useRef, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { Link, useHistory } from "react-router-dom";

const RestorePassPage = () => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState("");
  const { passwordReset, auth } = useAuth();
  const navigate = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current?.value) {
      setError("Please fill in the fields");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await passwordReset(emailRef.current.value);
      if (error) setError(error.message);
      if (data) {
        setMsg("Check your email for further instructions");
        setEmail("");
      }
    } catch (error) {
      setError(error.message);
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
                <p className="logText">Restore your password</p>
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
              {msg && (
                <Alert
                  variant="success"
                  onClose={() => closeAlert()}
                  dismissible
                >
                  <Alert.Heading>Success!</Alert.Heading>
                  <p>{msg}</p>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="input-group">
                <input
                  ref={emailRef}
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                />
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
                      "Restore Password"
                    )}
                  </button>
                </div>
              </form>

              <div>
                Back to login? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestorePassPage;
