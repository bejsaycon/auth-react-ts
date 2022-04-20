import "../styles/register.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//must start with a letter lowercase/uppercase letters/dash/underscore, 3 to 23 characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//must have lowercase uppercase number and a special character 8 to 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register: React.FC = () => {
  
  const userRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (userRef.current as HTMLInputElement).focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //when the user is typing, clear error message because that means the user is adjusting to error by making changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    e
  ) => {
    e.preventDefault();
    const userRegistrationData = {
      usrnm: user,
      pwd: pwd,
    };
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userRegistrationData),
    })
      .then((response) => {
        if (!response.ok) {
          setErrMsg(
            response.status === 409 ? "Username Taken" : response.statusText
          ); //status code 409 indicates conflict therefore username taken
        } else {
          setSuccess(true);
        }
      })
      .catch(() => setErrMsg("No Server Response"));
  };
  return (
    <>
      {success ? (
        <section className="register-section">
          <div className="register-div">
            <h1>Success!</h1>
            <br />
            <Link to='/login'>Sign In</Link>
          </div>
        </section>
      ) : (
        <section className="register-section">
          <div className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Register</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                ref={userRef}
                name="username"
                id="username"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <div
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "register-instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <div
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? "register-instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters: !@#$%
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="matchPassword">Confirm Password</label>
              <input
                type="password"
                name="matchPassword"
                id="matchPassword"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <div
                id="confirmnote"
                className={
                   matchFocus && !validMatch
                    ? "register-instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </div>
            </div>
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign up
            </button>
          </form>
          <div className="register-div">
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to='/login'>Sign In</Link>
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export { Register };
