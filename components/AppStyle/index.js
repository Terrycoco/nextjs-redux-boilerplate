import React from 'react';
import stylesheet from './app.scss';

export const AppStyle = () => (
  <style dangerouslySetInnerHtml={{__html: stylesheet}} ></style>
);