import Link from 'next/link';
import CSSClasses from './header.module.css'

const pages = [
  { href: '/', title: 'Home' },
  { href: '/jsph-users', title: 'JSPH Users' },
];

export function Header() {
  return <header>
    <nav className={CSSClasses.main}>
      <ul>
        {pages.map(page =>
          <li key={page.href}>
            <Link href={page.href}>
              {page.title}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  </header>
}