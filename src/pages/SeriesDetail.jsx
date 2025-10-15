import { Link, useParams } from "react-router-dom";
import { getSeriesById } from "../services/series";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import BackButton from "../components/BackButton";
import noImage from '../assets/no-image.png';
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const SeriesDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [seriesDetail, setSeriesDetail] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchSeriesDetail = async (id) => {
    setSeriesDetail({});
    setErrorMessage('');
    setIsLoading(true);

    try {
      const seriesData = await getSeriesById(id);

      setSeriesDetail(seriesData);
    } catch (error) {
      console.log('Error fetching series detail', error);

      setErrorMessage(error.message || 'Error fetching series!');

      setTimeout(() => {
        navigate('/series');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchSeriesDetail(id);
    }
  }, [id]);

  const { logo, name, releaseDate, firstSet, lastSet, sets } = seriesDetail;

  return (<MainLayout >
    <BackButton />
    {isLoading ? <Spinner /> : (
      errorMessage ? <p className="text-red-500">{errorMessage}, redirecting in 3, 2, 1...</p> : (
        <>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            {logo && (<img
              src={`${logo}.png`}
              alt={`${name} logo`}
              className="w-20 h-20 object-contain"
            />)}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{name} Series</h1>
              <p className="text-gray-600">
                Released on <span className="font-medium">{releaseDate}</span>
              </p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Series Overview
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                {firstSet.symbol ? (<img
                  src={`${firstSet.symbol}.png`}
                  alt={firstSet.name}
                  className="w-8 h-8"
                />) : (
                  <img
                    src={noImage}
                    alt='placeholder'
                    className="w-8 h-8"
                  />
                )}
                <span className="text-gray-700">
                  <strong>First Set:</strong> {firstSet.name} ({firstSet.cardCount.total} cards)
                </span>
              </div>
              <div className="flex items-center gap-3">
                {lastSet.symbol && (<img src={`${lastSet.symbol}.png`} alt={lastSet.name} className="w-8 h-8" />)}
                <span className="text-gray-700">
                  <strong>Last Set:</strong> {lastSet.name} ({lastSet.cardCount.total} cards)
                </span>
              </div>
            </div>
          </div>

          {/* Sets List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Included Sets</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sets.map((set) => (
                <Link to={`/sets/${set.id}`} >
                  <div
                    key={set.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center text-center"
                  >
                    {set.logo ? (<img
                      src={`${set.logo}.png`}
                      alt={set.name}
                      className="w-24 h-24 object-contain mb-2"
                    />) : 
                      <img
                        src={noImage}
                        alt='placeholder'
                        className="w-24 h-24 object-contain mb-2"
                      />}
                    <h3 className="font-semibold text-gray-900">{set.name}</h3>
                    {set.symbol ? (<img
                      src={`${set.symbol}.png`}
                      alt={`${set.name} symbol`}
                      className="w-6 h-6 my-2"
                    />) : <img
                      src={noImage}
                      alt='placeholder'
                      className="w-6 h-6 my-2"
                    />}
                    <p className="text-gray-600 text-sm">
                      {set.cardCount.official} official / {set.cardCount.total} total
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )
    )}

  </MainLayout>);
}

export default SeriesDetail;