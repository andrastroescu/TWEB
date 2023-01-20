import { useState, useEffect } from 'react'
import TravelPlanAddForm from "./TravelPlanAddForm"
import TravelPlan from "../src/TravelPlan"
import travelplans from "./TravelPlansInventory"

function TravelPlansList(){
    const [dat, setTravelPlans] = useState([]);

    useEffect(() => {
        travelplans.getTravelPlans()
        travelplans.emitter.addListener('GET_TRAVEL_PLANS_SUCCESS', () => {
            setTravelPlans(travelplans.data)
        })
    }, [])

    const addTravelPlan = (travelplan) => {
        travelplans.addTravelPlan(travelplan)
    }

    const saveTravelPlan = (id, travelplan) => {
        travelplans.updateTravelPlan(id, travelplan)
    }

    const deleteTravelPlan = (id) => {
        travelplans.deleteTravelPlan(id)
    }

    return (
        <div>
            <h4> List of travel plans: </h4>
            {
                // travelplans.map(e => <div key={e.id}>{e.destination}</div>)
                dat.map(e => <TravelPlan key={e.id} item={e} onDelete={deleteTravelPlan} onSave={saveTravelPlan}/> )
            }
            <TravelPlanAddForm onAdd={addTravelPlan} />
        </div>
    )
}

export default TravelPlansList