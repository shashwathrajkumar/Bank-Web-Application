import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Withdraw = () => {
  const [accounts, setAccounts] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let customerID = searchParams.get('customerID');
  customerID = parseInt(customerID, 10);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/account');
      const json = await response.json();

      if (response.ok) {
        setAccounts(json);
      }
    };
    fetchAccounts();
  }, []);

  const handleDepositClick = () => {
    const inputElement = document.getElementById("accid");
    const inputval = parseInt(inputElement.value, 10);
    const amtElement = document.getElementById("amount");
    const amtval = parseFloat(amtElement.value);

    if (!inputval) {
      alert("Enter account ID");
    } else {
      const foundAccount = accounts.find(
        (account) => account.Account_ID === inputval && account.Customer_ID === customerID
      );
      if (!foundAccount) {
        alert("No matching account found");
      } else if (isNaN(amtval) || amtval <= 0) {
        alert("Enter a valid amount");
      } else {
        const updating = async() => {
            const newbal = foundAccount.Balance - amtval
            if((foundAccount.Account_type === "Savings" && newbal>=500) || (foundAccount.Account_type === "Current" && newbal>=1000)){
                const customer = {Customer_ID:foundAccount.Customer_ID,
                    Account_ID:foundAccount.Account_ID,
                    Account_type:foundAccount.Account_type,
                    Balance: newbal}
                const response = await fetch(`/account/${foundAccount._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(customer),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                console.log(response.json);
                alert(`Withdrew ${amtval} from account ${inputval}.`);
                navigate(`/main?customerID=${foundAccount.Customer_ID}`)
            } else {
                alert(`Insufficient balance. Balance:${foundAccount.Balance}`)
            }
        }
        updating()
      }
    }
  };


  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        width: '500px',
      }}
    >
      <h2>Withdraw</h2>
      <div style={{ marginTop: '20px' }}>
        <label>Enter account ID: </label>
        <input type="text" maxLength="4" id="accid" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Enter Amount: </label>
        <input type="text" id="amount" />
      </div>
      <div onClick={handleDepositClick} style={{ marginTop: '20px' }}>
        <button>Withdraw</button>
      </div>
    </div>
  );
};

export default Withdraw;
