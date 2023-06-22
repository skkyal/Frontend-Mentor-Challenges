import tick from "../assets/images/icon-success.svg";

export default function Success({ email, setIsSuccess }) {
  return (
    <div className="c2">
      <div>
        <div className="tick">
          <img alt="" src={tick} />
        </div>
        <div className="heading">Thanks for subscribing!</div>
        <div className="sb">
          A confirmation email has been sent to{" "}
          <div className="mb">{email}</div>. Please open it and click the button
          inside to confirm your subscription.
        </div>
        <div className="b2" onClick={() => setIsSuccess(false)}>
          Dismiss message
        </div>
      </div>
    </div>
  );
}
