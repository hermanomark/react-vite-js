import { Link } from "react-router-dom"
import Header from "../components/Header";

const NotFound = ({header}) => {
    return (
        <>
            <Header header={header} />
            <Link to="/" className="underline">Go back to home page</Link>
        </>
    )
}

export default NotFound;