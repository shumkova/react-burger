import { APP_SECTION, PROFILE_ROUTES, PROFILE_SECTION } from '../../utils/consts';

const url = window.location.pathname;
const isProfileRoute = PROFILE_ROUTES.some(route => {
  return url.indexOf(route) > 0;
});
const isMainRoute = url === '/';
const isFeedRoute = url.indexOf(APP_SECTION.FEED) > 0;

const activeAppSection = isMainRoute ? APP_SECTION.MAIN :
  isFeedRoute ? APP_SECTION.FEED :
  isProfileRoute ? APP_SECTION.PROFILE : '';

const appInitialState = {
  activeSection: activeAppSection,
  activeProfileSection: PROFILE_SECTION.INDEX,
}

export const appReducer = ( state = appInitialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}