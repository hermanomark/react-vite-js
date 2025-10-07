import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/cards";
import MainLayout from "../layouts/MainLayout";
import InnerLayout from "../layouts/InnerLayout";

const CardDetail = () => {
    const { id } = useParams();

    const [pokemonData, setPokemonData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchCardDetail = async (id) => {
        setIsLoading(true);
        setErrorMessage('');
        setPokemonData({});

        try {
            const pokemonData = await getCardById(id);

            console.log(pokemonData);

            setPokemonData(pokemonData);
        } catch (error) {
            setErrorMessage(error.message || 'Error fetching card details!')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCardDetail(id);
    }, []);

    return (<MainLayout>
        <InnerLayout>
            {isLoading ? (<div>Loading...</div>) :
                (errorMessage ? (<p className="text-red-700">{errorMessage}</p>) :
                    (
                        <>
                            {/* Header Section */}
                            <div className={`p-6 text-black`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2">{pokemonData.name}</h1>
                                        <div className="flex items-center space-x-4">
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                                {pokemonData.stage}
                                            </span>
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                                HP {pokemonData.hp}
                                            </span>
                                            {pokemonData.types?.map((type, index) => (
                                                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold">#{pokemonData.localId}</div>
                                        <div className="text-sm opacity-90">{pokemonData.id}</div>
                                        {pokemonData.dexId && (
                                            <div className="text-sm opacity-90">
                                                Dex #{pokemonData.dexId.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                {/* Card Image Section */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 h-full">
                                        <img
                                            src={`${pokemonData.image}/high.png`}
                                            alt={pokemonData.name}
                                            className="w-full h-auto rounded-lg shadow-lg"
                                            onError={(e) => {
                                                e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQwTDEyMCAxMjBMMTAwIDEwMEw4MCAxMjBMMTAwIDE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRLEHQGEHN0eWxlPSJmb250LWZhbWlseTpzeXN0ZW0tdWksLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsU2Vnb2UgVUksUm9ib3RvLE94eWdlbixVYnVudHUsQ2FudGFyZWxsLEZpcmEgU2FucyxEcm9pZCBTYW5zLEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwO2ZpbGw6IzZCNzI4MCIgeD0iMTAwIiB5PSIxNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPiR7cG9rZW1vbkRhdGEubmFtZX08L3RleHQ+Cjwvc3ZnPgo=`;
                                            }}
                                        />
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Rarity:</span>
                                                <span className="font-medium text-yellow-600">{pokemonData.rarity}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Illustrator:</span>
                                                <span className="font-medium">{pokemonData.illustrator}</span>
                                            </div>
                                            {pokemonData.regulationMark && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Regulation:</span>
                                                    <span className="font-medium">Mark {pokemonData.regulationMark}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>
                    ))}
        </InnerLayout>
    </MainLayout>);
}

export default CardDetail;