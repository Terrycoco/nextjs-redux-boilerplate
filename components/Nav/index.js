import Head from 'components/Head';
import Link from 'next/link';

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
      <style dangerouslySetInnerHTML={{__html: `
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: flex-start;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: block;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}}></style>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
     
      <li>
        <Link href="/about" >
          <a>About</a>
        </Link>
      </li>

      <li>
        <Link href="/about?id=3" >
          <a>About With ID</a>
        </Link>
      </li>

    </ul>

  </nav>
)

export default Nav
