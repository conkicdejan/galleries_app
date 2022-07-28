import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries, selectGalleries } from '../store/gallery';
import GalleryComponent from './../components/GalleryComponent';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { selectAuthUser } from '../store/auth';
import Search from '../components/Search';

function Galleries() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const authUser = useSelector(selectAuthUser);
  const { pathname } = useLocation();
  const galleries = useSelector(selectGalleries);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';
  let title = 'Galleries';
  let author = null;

  if (pathname === '/my-galleries') {
    title = 'My galleries';
    author = authUser?.id;
  } else if (id) {
    author = id;
  }

  useEffect(() => {
    if (author === undefined) {
      return; //wait while the user is loading...
    }
    dispatch(getGalleries({ author, filter }));
  }, [author, filter]);

  function handleLoadMore() {
    dispatch(
      getGalleries({ author, filter, page: galleries.current_page + 1 })
    );
  }
  console.log(galleries);
  return (
    <div className="container">
      <div className="d-flex mt-1">
        <h3 className="flex-grow-1">{title}</h3>
        <div className="d-flex align-items-baseline">
          <p className="flex-grow-1 mx-2">
            total galleries: {galleries?.total}
          </p>
          <Search />
        </div>
      </div>
      <p className="">{filter && `search: ${filter}`}</p>
      {galleries ? (
        galleries.data.length ? (
          <>
            <div className="card-group mt-2">
              {galleries.data.map((gallery) => (
                <GalleryComponent key={gallery.id} gallery={gallery} />
              ))}
            </div>
            {galleries.current_page >= galleries.last_page ? (
              ''
            ) : (
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={handleLoadMore}
              >
                Load more{' '}
                {galleries?.total - galleries?.to < 10
                  ? galleries?.total - galleries?.to
                  : galleries.per_page}
              </button>
            )}
          </>
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
