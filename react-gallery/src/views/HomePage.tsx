import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../redux/albumsSlice';
import { RootState } from '../redux/store.ts';
import SideNav from '../components/SideNav';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums); // replace with your root state
  const albumStatus = useSelector((state: RootState) => state.albums.status); // replace with your root state

  useEffect(() => {
    if (albumStatus === 'idle') {
      dispatch(fetchAlbums());
    }
  }, [albumStatus, dispatch]);

  let content;

  if (albumStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (albumStatus === 'succeeded') {
    content = albums.map((album) => (
      <div key={album.id}>
        <Link to={`/album/${album.id}`}>{album.title}</Link>
      </div>
    ));
  } else if (albumStatus === 'failed') {
    content = <div>Error loading albums.</div>;
  }

  return (<div>
    <SideNav />
    {/*{content}*/}
  </div>);
};

export default HomePage;