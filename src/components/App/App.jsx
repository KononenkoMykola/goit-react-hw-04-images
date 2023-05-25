import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';
import { fetchPhoto } from '../../api/fetch-photo';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPhotos([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {

    if (!query) {
      return;
    }
    setLoading(true);
    fetchPhoto(query, page)
      .then(res => {
        if (res.hits.length === 0) {
          Notify.failure('No images were found for your request');
          return;
        }

        if (page === 1) {
          Notify.success(`We found ${res.total} images`);
        }
        setTotalItems(res.total);

        const response = res.hits.map(
          ({ webformatURL, tags, largeImageURL }) => {
            return {
              webformatURL,
              tags,
              largeImageURL,
            };
          }
        );

        setPhotos(prevPhotos => [...prevPhotos, ...response]);
        setTotalItems(res.total);
      })
      .catch(error => Notify.failure(error.message))
      .finally(() => setLoading(false));
  }, [page, query]);

  return (
    <div className={css.App}>
      {/* ---------Searchbar------------- */}

      <Searchbar onSubmit={onSubmit} />

      {/* ---------Gallery------------- */}

      <ImageGallery photos={photos} />
      {loading && <Loader />}
      {photos.length > 0 && totalItems > page * 12 && !loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button handleClick={loadMore} />
        </div>
      )}
    </div>
  );
};

export default App;



