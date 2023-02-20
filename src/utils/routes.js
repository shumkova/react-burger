/*
 * state -- history state of app
 * route -- current url  */
export const isLastRoute = (state, route) => state[state.length - 1].url === route;