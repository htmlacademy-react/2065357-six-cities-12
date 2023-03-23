import { Helmet } from 'react-helmet-async';
import Header from '../header/header';

type LayoutProps = {
  pageTitle?: string;
  className?: string;
  hasNav?: boolean;
  children: React.ReactNode;
}

function Layout({ pageTitle = '', className = '', hasNav = true, children }: LayoutProps): JSX.Element {
  return (
    <div className={`page ${className}`}>
      <Helmet>
        <title>6 cities {pageTitle}</title>
      </Helmet>
      <Header hasNav={hasNav} />
      {children}
    </div>
  );
}

export default Layout;
