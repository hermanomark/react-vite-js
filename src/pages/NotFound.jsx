import { Link } from "react-router-dom"
import Header from "../components/Header";

const NotFound = () => {
    return (
        <>
            <Header header="Page Not Found" />
            <Link to="/" className="underline">Go back to home page</Link>
        </>
    )
}

export default NotFound;