import { useParams } from "react-router-dom";
import { getSetById } from "../services/sets";
import { useEffect, useState } from "react";

const SetDetail = () => {
    const { id } = useParams();
    const [setData, setSetData] = useState({})

    const fetchSet = async (id) => {
        try {
            const set = await getSetById(id);

            console.log(set);

            setSetData(set);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchSet(id);
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4 flex flex-col md:flex-row items-center gap-4">
            {/* Logo */}
            {setData ? (
                <>
                    <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-gray-50 rounded-lg">
                        <img
                            src={`${setData.logo}.png`}
                            alt={`${setData.name} logo`}
                            className="w-24 h-auto object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-between text-center md:text-left w-full">
                        <h2 className="text-2xl font-bold text-gray-800">{setData.name}</h2>
                        {setData.serie && (
                            <>
                                <p className="text-gray-600">Series: <span className="font-medium">{setData.serie.name}</span></p>
                                <p className="text-gray-600">Release Date: <span className="font-medium">{setData.releaseDate}</span></p>
                                <p className="text-gray-600">Abbreviation: <span className="font-medium">{setData.abbreviation.official}</span></p>
                            </>
                        )}

                        {setData.cardCount && (
                            <>
                                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">Total: {setData.cardCount.official}</span>
                                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">Normal: {setData.cardCount.normal}</span>
                                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">Holo: {setData.cardCount.holo}</span>
                                </div>
                            </>)}
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500 py-6">Loading set details...</div>
            )}

        </div>
    );
}

export default SetDetail;