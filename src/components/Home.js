import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { FaSearchLocation } from 'react-icons/fa';
import { FcGlobe } from 'react-icons/fc';
import Spinner from './Spinner/Spinner';
import ContinentList from './ContinentList';

const Home = () => {
  const {
    continents,
    totalData: { totalCases, totalDeaths },
  } = useSelector((state) => state.covid);

  const [list, setList] = useState(continents);
  const [searchTerm, setTerm] = useState('');
  const search = ({ target }) => {
    const { value } = target;
    setTerm(value);
    const filteredList = continents.filter((continent) => {
      return continent.continent.toLowerCase().includes(value?.toLowerCase());
    });
    if (filteredList.length > 0) {
      setList(filteredList);
    } else {
      setList(continents);
    }
  };

  useEffect(() => { setList(continents); }, [continents]);

  return (
    <>
      {!list.length && <Spinner />}
      {list.length > 0 && (
        <>
          <div className="globeDetails">
            <FcGlobe className="globe" />
            <div className="count">
              <CountUp
                delay={1}
                end={totalCases}
                separator=","
                prefix="Total Cases: "
                duration={3}
              />
              <CountUp
                delay={1}
                prefix="Total Deaths: "
                end={totalDeaths}
                separator=","
                duration={3}
              />
            </div>
          </div>
          <form className="form">
            <div className="search-bar">
              <div>
                <input
                  className="input-area"
                  type="text"
                  value={searchTerm}
                  placeholder="Search Here"
                  onChange={search}
                />
                <FaSearchLocation className="searchButton" />
              </div>
            </div>
          </form>
          <ContinentList continents={list} />
        </>
      )}
    </>
  );
};

export default Home;
