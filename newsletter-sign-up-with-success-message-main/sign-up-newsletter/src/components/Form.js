import ListItem from "./ListItem";
import validator from "validator";
import { useState } from "react";

export default function Form({ email, setEmail, setIsSuccess }) {
  const [error, setError] = useState(false);
  const submitEmail = () => {
    if (validator.isEmail(email)) {
      setIsSuccess(true);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <div className="container">
      <div className="mobile-image"></div>
      <div className="inner-container">
        {/* <!-- Sign-up form start --> */}
        <div className="text-container">
          <div className="heading">Stay updated!</div>
          <div className="sub-text">
            Join 60,000+ product managers receiving monthly updates on:
          </div>
          <div className="list">
            <ListItem text={"Product discovery and building what matters"} />
            <ListItem text={"Measuring to ensure updates are a success"} />
            <ListItem text={"And much more!"} />
          </div>
          <div className="sign-up">
            <div>
              <div className="formheading">
                <div className="email-heading">Email address</div>
                {error ? (
                  <div className="error">Valid email required</div>
                ) : (
                  <></>
                )}
              </div>
              <input
                type="text"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "input2" : "input"}
              />
              <div className="button" onClick={() => submitEmail()}>
                Subscribe to monthly newsletter
              </div>
            </div>
          </div>
          {/*<!-- Sign-up form end --> */}
        </div>
        <div className="sign-up-image">{/*<img src={logo}></img>*/}</div>
      </div>
    </div>
  );
}
