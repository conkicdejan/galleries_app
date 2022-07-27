import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGallery,
  selectGallery,
  deleteGallery,
} from '../store/gallery/index';
import formatDate from '../components/formatDate';
import { selectAuthUser } from '../store/auth';
import CommentForm from '../components/CommentForm';
import Comment from './../components/Comment';

function SingleGallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const { id } = useParams();

  const gallery = useSelector(selectGallery);

  function handleNotFoundAction() {
    navigate('/', { replace: true });
  }

  useEffect(() => {
    dispatch(
      getGallery({
        id,
        meta: { onNotFound: handleNotFoundAction },
      })
    );
  }, []);

  if (!gallery) {
    return <div className="container">Loading...</div>;
  }

  const {
    id: galleryId,
    name,
    created_at,
    images,
    description,
    user,
    comments,
  } = gallery;

  function handleDeleteSuccess() {
    navigate('/my-galleries');
  }

  function handleDelete() {
    const confirm = prompt('Type "delete" to confirm');
    if (confirm === 'delete') {
      dispatch(
        deleteGallery({
          id: galleryId,
          meta: { onDelete: handleDeleteSuccess },
        })
      );
    }
  }

  function handleEdit() {
    navigate(`/edit-gallery/${galleryId}`);
  }

  return (
    <div className="container">
      <div className="d-flex mt-1">
        <h3 className="flex-grow-1">{name}</h3>
        {authUser?.id === user?.id && (
          <>
            <button
              type="button"
              className="btn btn-warning btn-sm mx-1 col-1"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm mx-1 col-1"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <p>
        author:{' '}
        <Link to={`/authors/${user?.id}`}>
          {user?.first_name} {user?.last_name}
        </Link>
      </p>
      <p>created at: {formatDate(created_at)}</p>
      <p>description: {description}</p>
      {images.map((image, index) => (
        <a key={index} href={image.url} target="_blank" rel="noreferrer">
          <img src={image.url} className="img-thumbnail h200" alt="gallery" />
        </a>
      ))}
      <div className="mb-5">
        {comments?.map((comment, index) => (
          <div key={index} className="card mt-2">
            <Comment comment={comment} />
          </div>
        ))}
        {authUser?.id && <CommentForm />}
      </div>
    </div>
  );
}
export default SingleGallery;
