## Why another boilerplate?

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app). 
In addition, I have added setup for:
- node / express customized server
- redux / redux-thunk / actions /reducers
- material-ui (with customized theme)
- SASS
- service worker registration at root scope
- module aliases (no relative paths needed)

## To Install
```
 git clone https://github.com/Terrycoco/nextjs-redux-boilerplate.git [YOUR APP NAME]
 cd [YOUR APP NAME]
 npm install

```


## Folder Structure

After creating an app, it should look something like:

```
my-app/
  .next/
  actions/
  components/
  node_modules/
  offline/
  pages/
  reducers/
  static/
  styles/
  .babelrc
  .gitignore
  next.config.js
  server.js
  store.js
```

Routing in Next.js is based on the file system, so `./pages/index.js` maps to the `/` route and
`./pages/about.js` would map to `/about`.

The `./static` directory maps to `/static` in the `next` server, so you can put all your
other static resources like images or compiled CSS in there.

Out of the box, we get:

- Automatic transpilation and bundling (with webpack and babel)
- Hot code reloading
- Server rendering and indexing of `./pages`
- Static file serving. `./static/` is mapped to `/static/`

Read more about [Next's Routing](https://github.com/zeit/next.js#routing)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode.
The application should be compiled with \`next build\` first.

See the section in Next docs about [deployment](https://github.com/zeit/next.js/wiki/Deployment) for more information.

## Using SASS / CSS

I prefer to organize my stylesheets this way:

- /styles/
  - all globally used and shared stylesheets go in here

- /components/MyComponent/
         - /index.js -- component file
         - /mycomponent.scss -- stylesheet for this specific component


Then, in the file for the actual component simply write:
```
import stylesheet from './mycomponent.scss';
```

...and at the bottom of the component  add this:
```
<style dangerouslySetInnerHtml={{__html: stylesheet}}></style>
```
See the Layout component as an example.

## Using Material-UI
It's all set up as Higher Order Component (hoc).  To use it add this to a page:
```
import withMui from 'components/hocs/withMui';
...
export default withMui(MyComponent);
```
The theme.js file under styles/ has a customized theme set up.  Here you can customize all the Material-UI components to your heart's content.  Simply find the component you want to change, uncomment it out and change it to the way you want it to be.

## Connecting to Redux Store
The store is all set up.  To use it add this to a page:
``` 
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import * as actions from 'actions';
...

function mapStateToProps(state) {
  return (
    whatever: state.whatever
  );
}

export default withRedux(makeStore, mapStateToProps, actions)(withMui(App));
```

Then, you can either pass your props down to child components or connect your components to the store using the regular {connect} from react-redux, your choice.

## Module aliases
I don't like using relative paths if I don't have to (I hate trying to remember ../../..!  So I set up in the .babelrc file at the root all the aliases for different folders.  If you add a folder to your project, add it in there too.

## Service Worker
I set up a service worker for PWA support.  The service worker file is in the offline/ folder.  Add any url you want to cache locally in that file.

## Fetching Data

You can fetch data in `pages` components using `getInitialProps` like this:

### `./pages/stars.js`

```jsx
const Page = (props) => <div>Next stars: {props.stars}</div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  const stars = json.stargazers_count
  return { stars }
}

export default Page
```

For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

_Note: `getInitialProps` can **not** be used in children components. Only in `pages`._

Read more about [fetching data and the component lifecycle](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle)

## Custom Server

Want to start a new app with a custom server? Run `create-next-app --example customer-server custom-app`

Typically you start your next server with `next start`. It's possible, however, to start a server 100% programmatically in order to customize routes, use route patterns, etc

This example makes `/a` resolve to `./pages/b`, and `/b` resolve to `./pages/a`:

```jsx
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

Then, change your `start` script to `NODE_ENV=production node server.js`.

Read more about [custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing)

## Syntax Highlighting

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Deploy to Now

[now](https://zeit.co/now) offers a zero-configuration single-command deployment.

1. Install the `now` command-line tool either via the recommended [desktop tool](https://zeit.co/download) or via node with `npm install -g now`.

2. Run `now` from your project directory. You will see a **now.sh** URL in your output like this:

    ```
    > Ready! https://your-project-dirname-tpspyhtdtk.now.sh (copied to clipboard)
    ```

    Paste that URL into your browser when the build is complete, and you will see your deployed app.

You can find more details about [`now` here](https://zeit.co/now).

## Something Missing?

If you have ideas for how we could improve this readme or the project in general, [let us know](https://github.com/segmentio/create-next-app/issues) or [contribute some!](https://github.com/segmentio/create-next-app/edit/master/lib/templates/default/README.md)
