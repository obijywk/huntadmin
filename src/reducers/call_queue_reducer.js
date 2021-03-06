import { fromJS, List, Map } from 'immutable';

const INITIAL_STATE = new Map({
  pendingSubmissions: List.of(),
  pendingHintRequests: List.of(),
  puzzles: Map.of(),
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_PENDING_SUBMISSIONS':
    if (action.submissions) {
      state = state.set('pendingSubmissions', fromJS(action.submissions));
    }
    return state;

  case 'FETCH_PENDING_HINT_REQUESTS':
    if (action.hintRequests) {
      state = state.set('pendingHintRequests', fromJS(action.hintRequests));
    }
    return state;

  case 'FETCH_PUZZLES':
    if (action.puzzles) {
      const newPuzzleMap = action.puzzles.map(
        puzzle => [puzzle.puzzleId, puzzle]);
      state = state.mergeIn(['puzzles'], fromJS(newPuzzleMap));
    }
    return state;

  case 'SET_SUBMISSION_STATUS':
    return state.updateIn(
      [
        'pendingSubmissions',
        state.get('pendingSubmissions').findIndex(
          submission => submission.get('submissionId') === action.submissionId),
      ],
      submission => submission
        .set('status', action.status)
        .set('callerUsername', action.callerUsername));

  case 'SET_HINT_REQUEST_STATUS':
    return state.updateIn(
      [
        'pendingHintRequests',
        state.get('pendingHintRequests').findIndex(
          hintRequest => hintRequest.get('hintRequestId') === action.hintRequestId),
      ],
      hintRequest => hintRequest
        .set('status', action.status)
        .set('callerUsername', action.callerUsername));

  case 'CHANGE_HINT_REQUEST_RESPONSE':
    return state.updateIn(
      [
        'pendingHintRequests',
        state.get('pendingHintRequests').findIndex(
          hintRequest => hintRequest.get('hintRequestId') === action.hintRequestId),
      ],
      hintRequest => hintRequest
        .set('response', action.response));

  default:
    return state;
  }
}
