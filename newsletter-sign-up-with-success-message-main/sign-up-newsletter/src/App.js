import Form from "./components/Form";
import Success from "./components/Success";
import { useState } from "react";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      {isSuccess ? (
        <Success email={email} setIsSuccess={setIsSuccess} />
      ) : (
        <Form email={email} setEmail={setEmail} setIsSuccess={setIsSuccess} />
      )}
    </>
  );
}

export default App;
