import { useState } from "react";
import "../styles/SetupPharmacy.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
function SetupPharmacy() {

  const [pharmacyName, setPharmacyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function handleContinue() {

    const pharmacyData = {

        pharmacyName,
        ownerName,
        phone,
        email,
        location

    };

    localStorage.setItem(
        "pharmacyData",
        JSON.stringify(pharmacyData)
    );

    navigate("/dashboard");

}

  return(
   

<div className="setup-container">

<div className="setup-card">
<img
src={logo}
alt="logo"
className="setup-logo"
/>
<h1>Let's Set Up Your Pharmacy</h1>


<input
placeholder="Pharmacy Name"
value={pharmacyName}
onChange={(e)=>setPharmacyName(e.target.value)}
/>

<input
placeholder="Owner Name"
value={ownerName}
onChange={(e)=>setOwnerName(e.target.value)}
/>

<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

<button onClick={handleContinue}>
Continue
</button>

</div>

</div>

);

}

export default SetupPharmacy;