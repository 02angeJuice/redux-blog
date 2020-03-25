import _ from 'lodash';
import JSONPlaceholder from '../apis/JSONPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

const fetchPosts = () => async dispatch => {
  const res = await JSONPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: res.data });
};

const fetchUser = id => async dispatch => {
  const res = await JSONPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: res.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const res = await JSONPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: 'FETCH_USER',
//     payload: res.data
//   });
// });
