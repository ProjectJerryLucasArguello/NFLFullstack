import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AdvancedSearch = () => {
  const [players, setPlayers] = useState([]); // State to store player data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedSeason, setSelectedSeason] = React.useState('');
  // State for search parameters
  const [searchParams, setSearchParams] = useState({
    team: '',
    name: '',
    season: '',
    position: '',
    age:'',
    games_played: '',
    games_started: '',
    rushing_touchdowns:'',
    recieving_touchdowns:''
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  // Build the URL based on non-empty search parameters
  const buildUrl = () => {
    const baseUrl = 'http://localhost:8080/api/v1/nflplayer';
    const query = Object.entries(searchParams)
      .filter(([_, value]) => value) // Include only non-empty values
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  // Fetch players based on search parameters
  const fetchPlayers = useCallback(() => {
    setLoading(true);
    const url = buildUrl();

    axios.get(url)
      .then(response => setPlayers(response.data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // Handle input changes for search fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  // Handle page change
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  // Calculate data for current page
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl text-white font-bold mb-4">Advanced Search Page</h1>
      <p className="text-lg text-white mb-6">Here you can conduct advanced searches for players, teams, and seasons.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Form */}
      <div className="mb-6 space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 items-center">
        <input
          type="text"
          name="team"
          placeholder="Team"
          value={searchParams.team}
          onChange={handleInputChange}
          className="border-4 border-gray-300 rounded-lg p-2 w-full sm:w-64  bg-transparent focus:outline-none"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={searchParams.name}
          onChange={handleInputChange}
          className="border-4 border-gray-300 rounded-lg p-2 w-full sm:w-64  bg-transparent focus:outline-none"
        />
        {/* Custom Dropdown for Season */}
        <div className="relative w-full sm:w-64">
          <button
            className="border-4 border-gray-300 rounded-lg p-2 w-full bg-transparent focus:outline-none text-gray-300"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedSeason || "Select a season"}
          </button>
          {dropdownOpen && (
            <ul
              className="absolute border border-gray-300 bg-white rounded-lg shadow-lg mt-1 w-full z-10 overflow-y-auto"
              style={{ maxHeight: '200px' }}
            >
              {Array.from({ length: 2024 - 1920 + 1 }, (_, index) => 1920 + index)
                .filter((year) => year <= 2024) // Ensure valid year range
                .map((year) => (
                  <li
                    key={year}
                    className="p-2 hover:bg-gray-100 text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedSeason(year);
                      setDropdownOpen(false);
                      setSearchParams((prev) => ({ ...prev, season: year }));
                    }}
                  >
                    {year}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={searchParams.position}
          onChange={handleInputChange}
          className="border-4 border-gray-300 rounded-lg p-2 w-full sm:w-64  bg-transparent focus:outline-none"
        />
        <button
          onClick={fetchPlayers}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>


      {/* Loading Indicator */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Table for Displaying Players */}
      <div className="mb-6 w-full">
        <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Team</th>
              <th className="border border-gray-300 px-4 py-2">Season</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Games Played</th>
              <th className="border border-gray-300 px-4 py-2">Games Started</th>
              <th className="border border-gray-300 px-4 py-2">Rushing Touchdowns</th>
              <th className="border border-gray-300 px-4 py-2">Recieving Touchdowns</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.length > 0 ? (
              currentPlayers.map((player) => (
                <tr key={player.id}>
                  <td className="border border-gray-300 px-4 py-2">{player.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.team}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.season}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.position}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.games_played}</td> {/* Adjust fields as per your NFLPlayer structure */}
                  <td className="border border-gray-300 px-4 py-2">{player.games_started}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.rushing_touchdowns}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.recieving_touchdowns}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-gray-500">
                  No players found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*Pagination Controls*/}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.ceil(players.length / playersPerPage) }, (_, index) => index + 1)
          .filter((page) => {
           {/* Display current page, the first and last page, and up to 2 pages before/after the current page*/}
            return (
              page === 1 ||
              page === Math.ceil(players.length / playersPerPage) ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            );
          })
          .map((page, idx, visiblePages) => (
            <React.Fragment key={page}>
              {/* Show ellipses if there's a gap */}
              {idx > 0 && visiblePages[idx - 1] + 1 !== page && (
                <span className="text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg ${currentPage === page
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(players.length / playersPerPage)}
          className={`px-3 py-1 rounded-lg ${currentPage === Math.ceil(players.length / playersPerPage)
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Next
        </button>
      </div>
    </div> 
  ); 
};

      export default AdvancedSearch;
