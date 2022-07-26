import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries, selectGalleries } from '../store/gallery';
import GalleryComponent from './../components/GalleryComponent';
import { useParams } from 'react-router-dom';

function Galleries() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const galleries = useSelector(selectGalleries);
  let title = 'Galleries';
  useEffect(() => {
    dispatch(getGalleries({ author: id }));
  }, [id]);

  return (
    <div className="container">
      <div className="d-flex mt-1">
        <h3 className="flex-grow-1">{title}</h3>
      </div>
      {galleries ? (
        galleries.data.length ? (
          <div className="card-group mt-2">
            {galleries.data.map((gallery) => (
              <GalleryComponent key={gallery.id} gallery={gallery} />
            ))}
          </div>
        ) : (
          'Nothing to show'
        )
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default Galleries;
