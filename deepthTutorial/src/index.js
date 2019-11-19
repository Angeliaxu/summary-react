import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
// import App from './components/App';
import Container from './components/setState';

ReactDOM.render(
<Container>
  <h1>children1</h1>
  <h2>children2</h2>
  {/* 字符串 */}
</Container>, document.getElementById('root'));

// const render = Component =>
//   ReactDOM.render(
//     // <AppContainer>
//       <Container>
//         <h1>children1</h1>
//         <h2>children2</h2>
//         {/* 字符串 */}
//       </Container>,
//     // </AppContainer>,
//     document.getElementById('root')
//   );

// render(Container);

// // Webpack Hot Module Replacement API
// if (module.hot) module.hot.accept('./components/App', () => {
//     render(Container);
//     // render(require('./components/App'))
// });