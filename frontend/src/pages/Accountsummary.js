import { useState,useEffect } from "react"
import { useLocation } from 'react-router-dom';
const Summary = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let customerID = searchParams.get('customerID');
    customerID = parseInt(customerID,10)
    const [accounts, setAccount] = useState(null)
    useEffect(() => {
        const fetchAccounts = async () => {
          const response = await fetch('/account');
          const json = await response.json()
          if (response.ok) {
            setAccount(json)
          }
        };
        fetchAccounts();
      }, []);

      if(accounts!==null) {
        const foundAccounts = accounts.filter((account) => account.Customer_ID === customerID);
        return (
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                border: '2px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                width: '500px'
              }}
            >
              <h2>Accounts for Customer ID {customerID}</h2>
              <table
                style={{
                  margin: '0 auto',
                  border: '1px solid #ccc', // Add border style
                  borderCollapse: 'collapse', // Add border collapse style
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Account ID</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Account Type</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {foundAccounts.map((account, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.Account_ID}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.Account_type}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.Balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          
          
      }    
}

export default Summary;