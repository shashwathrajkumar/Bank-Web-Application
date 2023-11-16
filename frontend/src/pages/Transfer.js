import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Transfer = () => {
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
    const inputElement = document.getElementById("accid1");
    const inputval = parseInt(inputElement.value, 10);
    const inputElement2 = document.getElementById("accid2");
    const inputval2 = parseInt(inputElement2.value, 10);
    const amtElement = document.getElementById("amount");
    const amtval = parseFloat(amtElement.value);

    if (!inputval || !inputval2) {
      alert("Enter account ID");
    } else {
      const foundAccount = accounts.find(
        (account) => account.Account_ID === inputval && account.Customer_ID === customerID
      );
      const foundAccount2 = accounts.find(
        (account) => account.Account_ID === inputval2
      );
      if (!foundAccount || !foundAccount2) {
        alert("No matching account found");
      } else if (isNaN(amtval) || amtval <= 0) {
        alert("Enter a valid amount");
      } else {
        const updating = async() => {
            const newbal = foundAccount.Balance - amtval
            if((foundAccount.Account_type === "Savings" && newbal>=500) || (foundAccount.Account_type === "Current" && newbal>=1000)){
                const newbal2 = foundAccount2.Balance + amtval
                const customer = {Customer_ID:foundAccount.Customer_ID,
                    Account_ID:foundAccount.Account_ID,
                    Account_type:foundAccount.Account_type,
                    Balance: newbal}
                const customer2 = {Customer_ID:foundAccount2.Customer_ID,
                    Account_ID:foundAccount2.Account_ID,
                    Account_type:foundAccount2.Account_type,
                    Balance: newbal2}
                const response = await fetch(`/account/${foundAccount._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(customer),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                const response2 = await fetch(`/account/${foundAccount2._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(customer2),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                console.log(response.json);
                console.log(response2.json);
                alert(`Withdrew ${amtval} from account ${inputval} and deposited to account ${inputval2}`);
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
      <h2>Transfer</h2>
      <div style={{ marginTop: '20px' }}>
        <label>Enter account ID from which funds will be withdrawn: </label>
        <input type="text" maxLength="4" id="accid1" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Enter account ID to which funds will be deposited: </label>
        <input type="text" maxLength="4" id="accid2" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Enter Amount: <br></br></label>
        <input type="text" id="amount" />
      </div>
      <div onClick={handleDepositClick} style={{ marginTop: '20px' }}>
        <button>Transfer</button>
      </div>
    </div>
  );
};

export default Transfer;
