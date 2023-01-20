import { useState, useEffect } from 'react'

function TravelPlanAddForm(props){
    const { onAdd } = props
    const [destination, setDestination] = useState('')
    const [origin, setOrigin] = useState('')
    const [departure_date, setDapartureDate] =  useState('')
    const [arrival_date, setArrivalDate] = useState('')
    const [customerId, setCustomerId] = useState('')

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/customers").then(
        response => response.json()
        ).then(
        data => {
            console.log("data");
            setBackendData(data);
            setCustomerId(data[0].id)
            console.log(data);
            console.log(backendData.length)
            
        }
        )
    }, [])

    const add = ( (evt) => {
        onAdd({
            destination,
            origin,
            departure_date,
            arrival_date,
            customerId
        })
    })

    const getCustomers = (() => {
        return(
            (backendData.length <= 1) ? 
              null :(
              backendData.map((user) => (
                <option value={user.id} key={user.id}> {user.name} </option>
              ))
        )
        )
    })

    const handleChange = ( (evt)=> {
       setCustomerId(evt.target.value)
    })

    return (
        <div>
            <h6> Add a travel plan </h6>
            <div>
            <select
                className="form-control"
                onChange={handleChange}
                >
                {/* <option value="choose" disabled selected="selected">
                    -- Select user --
                </option> */}
                {getCustomers()}
            </select>
            </div>       
            <div> 
                <input type="text" placeholder='destination' onChange={(evt) => setDestination(evt.target.value)} />
            </div>
            <div> 
                <input type="text" placeholder='origin' onChange={(evt) => setOrigin(evt.target.value)} />
            </div>
            <div> 
                <input type="text" placeholder='departure date' onChange={(evt) => setDapartureDate(evt.target.value)}/>
            </div>
            <div> 
                <input type="text" placeholder='arrival date'  onChange={(evt) => setArrivalDate(evt.target.value)}/>
            </div>
            {/* <div> 
                <input type="text" placeholder='customer'  onChange={(evt) => setCustomerId(evt.target.value)}/>
            </div> */}
            <div> 
                <input type="button" value="Add" onClick={add} />
            </div>
        </div> 
    )
}

export default TravelPlanAddForm