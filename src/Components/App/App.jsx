import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import acGetContents from 'src/store/app/dispatch';
import './App.scss';

const App = ({content, getContents}) => {
  React.useEffect(() => {
    getContents();
  }, [getContents]);

  const [flag, setFlag] = React.useState(false);

  return (
    <>
      <header className="App__header">
        app-header
      </header>
      <main className="App__main" onClick={()=> setFlag(!flag)}>
        {content}
      </main>
      <span>{flag ? 'true' : 'false'}</span>
      <footer className="App__footer">&copy; Made with love by Vinnie {new Date().getFullYear()}</footer>
    </>
  );
};

App.propType = {
  content: PropTypes.string.isRequired,
  getContents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({content: state.app.content});
export const mapDispatchToProps = dispatch => bindActionCreators({getContents: acGetContents}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
