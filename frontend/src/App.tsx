import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api/home")
      .then(res => {
        console.log(res.data);
        setMessage(res.data);
      })
      .catch(err => console.error(err));
  });

  return (
    <>
      <div>홈 화면</div>
      <p>{message}</p>
    </>
  );
}

export default App;
