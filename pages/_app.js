import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Layout>
      <Nav />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
