import { useState,useEffect } from "react"

const generateUniqueCustomerID = async (existingCustomers) => {
  let randomCustomerID;
  do {
    randomCustomerID = Math.floor(Math.random() * 900000) + 100000;
  } while (existingCustomers.some((customer) => customer.Customer_ID === randomCustomerID));
  return randomCustomerID;
};

const Register = () => {
  const [name,setName] = useState('')
  const [phnum,setNum] = useState('')
  const [address,setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [randomCustomerID, setRandomCustomerID] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('/bank');
      if (response.ok) {
        const json = await response.json();
        const generatedID = await generateUniqueCustomerID(json);
        setRandomCustomerID(generatedID);
      }
    };
    fetchCustomers();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(name!=='' && phnum!=='' && address!=='' && password!=='') {
      if(phnum.length === 10) {
        const customer = {Customer_ID:randomCustomerID,Customer_name:name,Contact_no:phnum,Address:address,Password:password}
        const response = await fetch('/bank', {
          method: 'POST',
          body: JSON.stringify(customer),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
        if(!response.ok) {
          setError(json.error)
        }
        if(response.ok) {
          setName('')
          setAddress('')
          setNum('')
          setPassword('')
          setError(null)
          console.log(json)
          alert("Your Customer ID for login purposes is: " + randomCustomerID)
          window.location.href = '/'
        }
      } else {
        alert("Enter a valid phone number")
      }
    } else {
      alert("Please enter all fields")
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
      <form className="create" onSubmit={handleSubmit}>
        <h3>Register new customer</h3>

        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <label>Enter full name: </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{ width: '80%' }}
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <label>Enter phone number: </label>
          <input
            type="number"
            maxLength="10"
            onChange={(e) => setNum(e.target.value)}
            value={phnum}
            style={{ width: '80%' }}
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <label>Enter Address: </label>
          <textarea
            rows="4"
            cols="40"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            style={{ width: '80%', resize: 'none' }}
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <label>Enter a password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ width: '80%' }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button>Register</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
}

  

export default Register;
