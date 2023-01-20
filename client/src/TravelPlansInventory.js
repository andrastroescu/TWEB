import { EventEmitter } from 'fbemitter'

// const SERVER = 'http://localhost:8080'

class TravelPlansInventory {
    constructor() {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getTravelPlans(){
        try{
            const response = await fetch(`/travelplans`)
            if (!response.ok){
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_TRAVEL_PLANS_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_TRAVEL_PLANS_ERROR')
        }
    }

    async addTravelPlan(travelplan){
        try{
            const response = await fetch(`/travelplans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(travelplan)
            })
            if (!response.ok){
                throw response
            }
            this.getTravelPlans()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_TRAVEL_PLAN_ERROR')
        }
    }

    async updateTravelPlan(id, travelplan){
        console.log("inupdate" + id)
        try{
            const response = await fetch(`/travelplans/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(travelplan)
            })
            if (!response.ok){
                throw response
            }
            this.getTravelPlans()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('UPDATE_TRAVEL_PLAN_ERROR')
        }
    }

    async deleteTravelPlan(id){
        try{
            const response = await fetch(`/travelplans/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok){
                throw response
            }
            this.getTravelPlans()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('DELETE_TRAVEL_PLAN_ERROR')
        } 
    }
}

const travelplan = new TravelPlansInventory();

export default travelplan;