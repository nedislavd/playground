import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchAlbums } from '../redux/albumsSlice';
import { List as MuiList, ListItem, ListItemText, Drawer, Box, TextField } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import Fuse from 'fuse.js';

interface RootState {
  albums: any;
}

const ITEM_SIZE = 46; // Adjust this to the height of your ListItem

const SideNav: React.FC = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const options = {
    keys: ['title', 'id'],
    threshold: 0.4,
    shouldSort: true,
  };

  const fuse = new Fuse(Object.values(albums), options);
  const filteredAlbums = searchTerm ? fuse.search(searchTerm).map(({ item }) => item.id) : Object.keys(albums);

  const Row = ({ index, style }) => (
    <Box
      component={RouterLink}
      to={`/album/${filteredAlbums[index+1]}`}
      key={filteredAlbums[index+1]}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItem button style={style}>
        <ListItemText primary={`Album ${filteredAlbums[index+1]}`} />
      </ListItem>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 180,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 180,
          boxSizing: 'border-box',
        },
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="search"
        label="Search Albums"
        name="search"
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MuiList>
        <List
          height={window.innerHeight - 100} // Adjust this to the remaining height of your drawer
          itemCount={filteredAlbums.length}
          itemSize={ITEM_SIZE}
        >
          {Row}
        </List>
      </MuiList>
    </Drawer>
  );
};

export default SideNav;