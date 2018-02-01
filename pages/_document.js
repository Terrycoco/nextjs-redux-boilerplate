import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
// import flush from 'styled-jsx/server'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    // const styles = flush()
    return { html, head, errorHtml, chunks }
  }

  render() {
    return (
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Author" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Application" />
          <meta name="apple-mobile-web-app-title" content="Application" />
          <meta name="theme-color" content="#406902" />
          <meta name="msapplication-navbutton-color" content="#00b6b2" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="format-detection" content="telephone=no" />

          <link rel="icon" type="image/png" sizes="128x128" href="static/icons/icon128.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="static/icons/icon128.png" />
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}