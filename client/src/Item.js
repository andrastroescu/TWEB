import { useParams } from "react-router-dom"

function Item(props){
    const params = useParams()

    return (
        <>
        <div>
            I am the item for {params.item} component
        </div>
        </>
    )
}

export default Item