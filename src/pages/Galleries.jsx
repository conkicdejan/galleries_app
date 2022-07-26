import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries, selectGalleries } from '../store/gallery';
import GalleryComponent from './../components/GalleryComponent';
import { useLocation, useParams } from 'react-router-dom';
import { selectAuthUser } from '../store/auth';

function Galleries() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const authUser = useSelector(selectAuthUser);
  const { pathname } = useLocation();
  const galleries = useSelector(selectGalleries);
  let title = 'Galleries';

  if (!id && pathname === '/my-galleries') {
    title = 'My galleries';
    id = authUser?.id;
  }
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
