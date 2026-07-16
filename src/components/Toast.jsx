import React from 'react';

const Toast = ({ message, show }) => {
  return React.createElement(
    'div',
    { className: 'toast ' + (show ? 'show' : ''), id: 'toast' },
    message
  );
};

export default Toast;
