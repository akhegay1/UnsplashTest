import Link from 'next/link';

const Navbar = () => (
  <nav >
    <div >
      <div >
        <ul >
          <li >
            <Link href="/"><a>Home</a></Link>
          </li>
          <li >
            <Link href="/about"><a >About</a></Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
          ul {
            background: #333;
            color: #fff;
            list-style: none;
            display: flex;
            width=100%;
          } 

          ul li {
            font-size: 18px;
            margin-right: 20px;
          }
          
          ul li a {
            color: #fff;
            text-decoration: none;
          }  
          `
        }
        </style>
    </div>
  </nav>
);


export default Navbar;