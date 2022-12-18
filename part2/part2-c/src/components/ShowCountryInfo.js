import { useState } from "react";

const ShowCountryInfo = ({ display, index }) => {
  const [show, setShow] = useState(false);
  if (show){
    return (
      <div>
        {display(index)}
        <button onClick={() => setShow(false)}>hide</button>
      </div>
      );
  }

  return (
    <button onClick={() => setShow(true)}>show</button>
  )
}

export default ShowCountryInfo;