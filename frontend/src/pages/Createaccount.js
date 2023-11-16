import { useState,useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const generateUniqueAccountID = async (existingAccounts) => {
  let randomAccountID;
  do {
    randomAccountID = Math.floor(Math.random() * 9000) + 1000;
  } while (existingAccounts.some((account) => account.Account_ID === randomAccountID));
  return randomAccountID;
};

const Openacc = () => {
  const [randomAccountID, setRandomAccountID] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let customerID = searchParams.get('customerID');
  customerID = parseInt(customerID, 10);
  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/account');
      if (response.ok) {
        const json = await response.json();
        const generatedID = await generateUniqueAccountID(json);
        setRandomAccountID(generatedID);
      }
    };
    fetchAccounts();
  }, []);
  

  const Open = async() => {
    const type = document.getElementById("acctype").value
    const bal = document.getElementById("bal")
    const balval = parseFloat(bal.value)
    if((type==="Savings" && balval>=500) || (type==="Current" && balval>=1000)) {
        const account = {Customer_ID:customerID,Account_ID:randomAccountID,Account_type:type,Balance:balval}
        const response = await fetch('/account', {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        if(response.ok) {
            alert(`New account created with id: ${randomAccountID}`)
            navigate(`/main?customerID=${customerID}`)
        } else {
            alert("An error occured")
        }
        const json = await response.json()
        console.log(json);
    } else {
        alert("Min. Balance for Savings account = 500. Min. Balance for Current account = 1000")
    } 
  }

  return (
    <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        width: '500px'
      }}>
        <h2>Open a new account</h2>
        <label>Select an account type:</label>
        <select id="acctype">
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
        </select>
        <div style={{ marginTop: '20px' }}>
          <label>Enter opening balance: </label>
          <input type="text" id="bal" />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={Open}>Open</button>
        </div>
      </div>
);
}

  

export default Openacc;
