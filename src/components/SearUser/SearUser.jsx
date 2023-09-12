import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearUser.scss';
import NavBar from '../NavBar/NavBar';
import { userByName, resetUser,reset} from '../../features/users/usersSlice';

const SearUser = () => {
  const dispatch = useDispatch();
  const { users, isSuccessUser, isErrorUser, isLoadingUser } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery !== '') {
      dispatch(userByName(searchQuery));
    } else {
      // Si la búsqueda está vacía, restablece la lista de resultados
      setSearchResults([]);
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  useEffect(() => {
    // Cuando los usuarios cambian, actualiza los resultados de búsqueda
    setSearchResults(users);
  }, [users]);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(reset());
    }
  }, [isSuccessUser]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar usuario"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className='search-results'>
        {isErrorUser ? (
          <p>Ha habido un error al encontrar el usuario</p>
        ) : isLoadingUser ? (
          <p>Cargando...</p>
        ) : (
          searchResults.map((user) => (
            <Link key={user._id} to={`/user/${user._id}`} className="link">
              <img
                src={`http://localhost:8080/uploads/${user.profileImage}`}
                alt={user.username}
              />
              <p>{user.username}</p>
            </Link>
          ))
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default SearUser;
