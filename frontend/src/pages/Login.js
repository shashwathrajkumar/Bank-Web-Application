import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
const LoginPage =() => {
    const [customers, setCustomer] = useState(null)
    const navigate = useNavigate();
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


    const Customerexists = () => {
        if (customers) {
            const inputElement = document.getElementById("custid");
            const inputval = parseInt(inputElement.value,10)
            if(inputval) {
                const foundCustomer = customers.find((customer) => customer.Customer_ID === inputval);
                if (foundCustomer) {
                    const pwd = document.getElementById("password")
                    if(pwd.value!=='') {
                        if(foundCustomer.Password === pwd.value) {
                            navigate(`/main?customerID=${foundCustomer.Customer_ID}`);
                        } else {
                            alert("Incorrect password")
                        }
                    } else {
                        alert("Enter password")
                    }
                } else {
                    alert("Customer ID is invalid")
                }
            } else {
                alert("Enter Customer ID")
            }
        } else {
            alert("Database error")
        }
    }

    const gotoregister = () => {
        window.location.href = '/register'
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
                <h1>Welcome to the bank management website</h1>
                <hr></hr>
                <h2>Login</h2>
                <div style={{ marginTop: '20px' }}>
                  <label>Enter customer ID: <br></br> </label>
                  <input type="text" maxLength="6" id="custid" />
                </div>
                <div style={{ marginTop: '20px' }}>
                  <label>Enter Password: <br></br> </label>
                  <input type="password" id="password" />
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button onClick={Customerexists}>Login</button>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button onClick={gotoregister}>Register</button>
                </div>
              </div>
        );
          
          
    }
    


export default LoginPage
