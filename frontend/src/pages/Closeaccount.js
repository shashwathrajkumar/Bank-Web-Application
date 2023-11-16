import { useState,useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Close = () => {
    const [accounts, setAccounts] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
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

    const Closeacc = () => {
        const acc = document.getElementById("accid")
        const accidval = parseInt(acc.value,10)
        if (!accidval) {
            alert("Enter valid account ID");
          } else {
            const foundAccount = accounts.find(
              (account) => account.Account_ID === accidval && account.Customer_ID === customerID
            );
            const accbal = foundAccount.Balance
            const accountid = foundAccount.Account_ID
            if (!foundAccount) {
              alert("No matching account found");
            } else {
                const deleting = async() => {
                  const response = await fetch(`/account/${foundAccount._id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  console.log(response.json);
                  alert(`Account ${accountid} had balance ${accbal}. Amount successfully withdrawn and account closed. Thank You!`);
                  navigate(`/main?customerID=${customerID}`)
                }
                deleting()
              }
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
            <h2>Account Closure</h2>
            <div style={{ marginTop: '20px' }}>
              <label>Enter account ID: </label>
              <input type="text" maxLength="4" id="accid" />
            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={Closeacc}>Close</button>
            </div>
          </div>
    );
}

export default Close;