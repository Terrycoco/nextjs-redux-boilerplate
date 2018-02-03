## Why another boilerplate?

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app). 
In addition, I have added setup for:
- node / express customized server
- redux / redux-thunk / actions /reducers
- material-ui (with customized theme)
- SASS
- service worker registration at root scope
- module aliases (relative paths normally not needed)
- file compression

## To Install
```
 git clone https://github.com/Terrycoco/nextjs-redux-boilerplate.git [YOUR APP NAME]
 cd [YOUR APP NAME]
 npm install
 

 make it your own:
 git init
 git remote set-url origin http://github.com/[YOUR GITHUB NAME]/[YOUR GITHUB NEW REPOSITORY]
 
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
  manifest.json
  my-service-worker.js
  next.config.js
  postcss.config.js
  routes.js
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
  - index.js -- component file
  - mycomponent.scss -- stylesheet for this specific component

Then, in the file for the actual component simply write:
```
import stylesheet from './mycomponent.scss';
```

...and at the bottom of the component  add this:
```
<style dangerouslySetInnerHTML={{__html: stylesheet}}></style>
```
You can use @import '../someSassOrCssFile' as usual in any Sass file. (You must use relative paths though, unfortunately).  See the Layout component as an example.

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
I don't like using relative paths if I don't have to (I hate trying to remember ../../..)!  So I set up in the .babelrc file at the root all the aliases for different folders.  If you add a folder to your project, add it in there too.

## Service Worker
I set up a service worker at root for PWA support.  Add any url you want to cache locally in that file.  Be sure to customize the manifest.json file at the root with your project specifics.

