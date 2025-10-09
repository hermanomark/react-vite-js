import { useParams } from "react-router-dom";
import { getSetById } from "../services/sets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BackButton from "../components/BackButton";
import Card from "../components/Card";
import GridLayout from "../layouts/GridLayout";

const SetDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [setDetail, setSetDetail] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchSet = async (id) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const set = await getSetById(id);

            setSetDetail(set);
        } catch (error) {
            setErrorMessage(error.message || 'Error fetching set!');

            setTimeout(() => {
                navigate('/sets');
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSet(id);
    }, []);

    return (<MainLayout>
        <BackButton />
        {isLoading ? (<div>Loading... </div>) :
            errorMessage ? (<p className='text-red-700'>{errorMessage}, redirecting in 3, 2, 1...</p>) : (
                <>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4 flex flex-col md:flex-row items-center gap-4 mb-8">
                        <>
                            {setDetail.logo && (
                                <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-gray-50 rounded-lg">
                                    <img
                                        src={`${setDetail.logo}.png`}
                                        alt={`${setDetail.name || 'Set'} logo`}
                                        className="w-24 h-auto object-contain"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col justify-between text-center md:text-left w-full">
                                {setDetail.name && (
                                    <h2 className="text-2xl font-bold text-gray-800">{setDetail.name}</h2>
                                )}

                                {setDetail.serie?.name && (
                                    <p className="text-gray-600">
                                        Series: <span className="font-medium">{setDetail.serie.name}</span>
                                    </p>
                                )}

                                {setDetail.releaseDate && (
                                    <p className="text-gray-600">
                                        Release Date: <span className="font-medium">{setDetail.releaseDate}</span>
                                    </p>
                                )}

                                {setDetail.abbreviation?.official && (
                                    <p className="text-gray-600">
                                        Abbreviation: <span className="font-medium">{setDetail.abbreviation.official}</span>
                                    </p>
                                )}

                                {setDetail.cardCount && (
                                    <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                                        {setDetail.cardCount.official !== undefined && (
                                            <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                                                Total: {setDetail.cardCount.official}
                                            </span>
                                        )}
                                        {setDetail.cardCount.normal !== undefined && (
                                            <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                                                Normal: {setDetail.cardCount.normal}
                                            </span>
                                        )}
                                        {setDetail.cardCount.holo !== undefined && (
                                            <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                                                Holo: {setDetail.cardCount.holo}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                        </>
                    </div>

                    <GridLayout>
                        {setDetail.cards.map((card) => (
                            <Card key={card.id} card={card} type='cards' />
                        ))}
                    </GridLayout>
                </>
            )
        }
    </MainLayout>
    );

}

export default SetDetail;