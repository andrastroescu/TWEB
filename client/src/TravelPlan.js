// const TravelPlan = require("../../general/TravelPlan")
import { useState } from 'react'
import TravelPlanAddForm from './TravelPlanAddForm'

function TravelPlan(props){
    const { item, onDelete, onSave } = props
    const [isEditing, setIsEditing] = useState(false)
    const [destination, setDestination] = useState(item.destination)
    const [origin, setOrigin] = useState(item.origin)
    const [departure_date, setDapartureDate] =  useState(item.departure_date)
    const [arrival_date, setArrivalDate] = useState(item.arrival_date)


    const deleteTravelPlan = (evt) => {
        onDelete(item.id)
    }

    const saveTravelPlan = (evt) => {
        console.log(destination)
        onSave(item.id, {
            destination,
            origin,
            departure_date,
            arrival_date
        })
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }
    

    return (
        <>
        {
            isEditing 
            ? 
            (
                <div>
                   Travel plan destination: <input type="text" value={destination} onChange={(evt => setDestination(evt.target.value))}></input> | origin: <input type="text" value={origin} onChange={(evt => setOrigin(evt.target.value))}></input> | departure date: <input type="text" value={departure_date} onChange={(evt => setDapartureDate(evt.target.value))}></input> | arrival date: <input type="text" value={arrival_date} onChange={(evt => setArrivalDate(evt.target.value))}></input> 
                    <input type="button" value="save" onClick={saveTravelPlan}/>
                    <input type="button" value="cancel" onClick={cancel}/>
                </div>
            ) 
            :
            (
            <div>
                Travel plan destination: {item.destination} | origin: {item.origin} | departure date: {item.departure_date} | arrival date: {item.arrival_date}
                <input type="button" value="delete" onClick={deleteTravelPlan}/>
                <input type="button" value="edit" onClick={edit}/>               
            </div>
            )
        }
    </>
    )
}

export default TravelPlan
