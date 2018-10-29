import * as React from 'react';

interface Spinner {
  loading?: boolean
}

const Spinner: React.SFC<Spinner> = (props) => {
  const {loading} = props;
  return <div className="spinner-loader__container">{loading && <div className="spinner-loader"></div>}</div>;
};

Spinner.defaultProps = {
  loading: false
};

export default Spinner;