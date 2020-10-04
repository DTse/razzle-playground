import { renderApp } from './server';

export const render = (req, res) => {
  const { html } = renderApp(req, res);

  res.json({ html });
};

// TODO: find a dynamic way to create the static list
/**
 * Return the routes array.
 * @param
 * @return {array}
 **/
export const routes = () => {
  return [
      '/',
      '/page1',
      '/page2',
      '/about'
    ];
};
