import React from 'react';

export default function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else {
    return <div>Loading route module...</div>;
  }
}
