import { useRef, useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function UpdatePassPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(true);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { updatePassword, auth } = useAuth();
  const navigate = useHistory();

  useEffect(() => {
    if (!auth) {
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
    if (
      !passwordRef.current.value.length ||
      !passwordConfirmRef.current.value
    ) {
      return setError("Please fill in the fields");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      setError("");
      const { error } = await updatePassword(passwordRef.current.value);
      if (!error) {
        setMsg("Password updated successfully, redirecting... to home page");
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        setTimeout(() => {
          navigate.push("/");
        }, 2000);
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
                <h3 className="logTitle">Welcome back👋</h3>
                <p className="logText">Update your password</p>
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

              <form onSubmit={handleSubmit} action="" className="input-group">
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control"
                  placeholder="New password"
                />
                <input
                  ref={passwordConfirmRef}
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
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
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdatePassPage;
