import AppNavigator from './Navigator';

export default function NavigatorReducer(state, action) {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || {};
}
