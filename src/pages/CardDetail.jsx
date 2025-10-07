import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/cards";

const CardDetail = () => {
    const { id } = useParams();
    const [cardDetail, setCardDetail] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchCardDetail = async (id) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const cardData = await getCardById(id);

            console.log(cardData);

            setCardDetail(cardData);
        } catch (error) {
            setErrorMessage(error.message || 'Error fetching card details!')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCardDetail(id);
    }, []);

    return (isLoading ? (<div>Loading...</div>) :
        (errorMessage ? (<p className="text-red-700">{errorMessage}</p>) :
            (<>
                <h1>Card detail</h1>
                {id}
            </>)));
}

export default CardDetail;