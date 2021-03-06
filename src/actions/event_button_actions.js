import { createPostRequest, fetchToAction } from './action_utils';

export function startHunt() {
  return (dispatch, getState) => {
    dispatch({
      type: 'START_HUNT',
    });
    return fetchToAction(
      createPostRequest(
        getState(),
        'events',
        {
          eventType: 'HuntStart',
        }),
      'START_HUNT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
