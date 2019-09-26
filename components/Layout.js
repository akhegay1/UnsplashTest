import Head from 'next/head';
import Navbar from './Navbar_styled';

const Layout = (props) => (
  <div >
    <Head>
      <title>Unsplashed</title>
    </Head>
    <style>{`
            #__next { width: 100% }
          `}
          </style>
    <Navbar  />
    <div>
      {props.children}
    </div>

  </div>

  
);

export default Layout;