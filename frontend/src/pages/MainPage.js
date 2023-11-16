import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    let customerID = searchParams.get('customerID');
    customerID = parseInt(customerID,10)
    const [customers, setCustomer] = useState(null)
    let foundCustomer 
    useEffect(() => {
        const fetchcustomers = async() => {
            const response = await fetch('/bank')
            const json = await response.json()

            if(response.ok) {
                setCustomer(json)
            }
        }
        fetchcustomers()
    }, [])

    if(customers!==null) {
        foundCustomer = customers.find((customer) => customer.Customer_ID === customerID);

        const deposit = () => {
            navigate(`/deposit?customerID=${foundCustomer.Customer_ID}`);
        }
        const withdraw = () => {
            navigate(`/withdraw?customerID=${foundCustomer.Customer_ID}`);
        }
        const transfer = () => {
            navigate(`/transfer?customerID=${foundCustomer.Customer_ID}`);
        }
        const create = () => {
            navigate(`/create?customerID=${foundCustomer.Customer_ID}`);
        }
        const summ = () => {
            navigate(`/summary?customerID=${foundCustomer.Customer_ID}`);
        }
        const close = () => {
            navigate(`/close?customerID=${foundCustomer.Customer_ID}`);
        }
        return (
          <div style={{
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
                    }}>
                        <h2>Welcome {foundCustomer.Customer_name}!</h2>
                        <div>
                        <div className="button-container">
                            <div className="left-buttons">
                            <button onClick={deposit}>Deposit</button>
                            <button onClick={withdraw}>Withdraw</button>
                            <button onClick={transfer}>Transfer</button>
                            </div>
                            <div className="right-buttons">
                            <button onClick={create}>Create account</button>
                            <button onClick={summ}>Account summary</button>
                            <button onClick={close}>Close account</button>
                            </div>
                        </div>
                        </div>
                    </div>
        );
    }
};

export default MainPage;