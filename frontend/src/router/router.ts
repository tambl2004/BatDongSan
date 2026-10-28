export type RouteView =
  | 'home'
  | 'sale'
  | 'rent'
  | 'blog'
  | 'blog-detail'
  | 'property-detail'
  | 'favorites'
  | 'admin'
  | 'login'
  | 'register'
  | 'forgot-password';

export interface CurrentRoute {
  pathname: string;
  view: RouteView;
  postId?: string;
  propertyId?: string;
  redirect?: string;
}

export const parseCurrentRoute = (): CurrentRoute => {
  const pathname = window.location.pathname;
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id') || undefined;
  const redirect = searchParams.get('redirect') || undefined;

  // Gracefully upgrade legacy hash URLs (e.g. #blog -> /blog, #blog-detail -> /blog-detail)
  if (hash === 'blog') {
    window.history.replaceState(null, '', '/blog');
    return { pathname: '/blog', view: 'blog' };
  }
  if (hash === 'blog-detail') {
    window.history.replaceState(null, '', '/blog-detail');
    return { pathname: '/blog-detail', view: 'blog-detail' };
  }

  if (pathname === '/login') {
    return { pathname: '/login', view: 'login', redirect };
  }

  if (pathname === '/register') {
    return { pathname: '/register', view: 'register', redirect };
  }

  if (pathname === '/forgot-password') {
    return { pathname: '/forgot-password', view: 'forgot-password', redirect };
  }

  if (pathname === '/blog-detail' || pathname.startsWith('/blog/')) {
    const slug = pathname.startsWith('/blog/') && pathname !== '/blog'
      ? pathname.replace('/blog/', '').trim()
      : undefined;
    return {
      pathname,
      view: 'blog-detail',
      postId: id || slug
    };
  }

  if (pathname === '/blog') {
    return { pathname: '/blog', view: 'blog' };
  }

  if (pathname === '/chi-tiet-bds' || pathname === '/property-detail') {
    return {
      pathname,
      view: 'property-detail',
      propertyId: id
    };
  }

  if (pathname === '/nha-dat-ban' || pathname === '/sale') {
    return { pathname: '/nha-dat-ban', view: 'sale' };
  }

  if (pathname === '/nha-dat-cho-thue' || pathname === '/rent') {
    return { pathname: '/nha-dat-cho-thue', view: 'rent' };
  }

  if (pathname === '/yeu-thich' || pathname === '/favorites') {
    return { pathname: '/yeu-thich', view: 'favorites' };
  }

  if (pathname === '/admin') {
    return { pathname: '/admin', view: 'admin' };
  }

  return { pathname: '/', view: 'home' };
};

export const navigate = (url: string) => {
  if (window.location.pathname + window.location.search !== url) {
    window.history.pushState(null, '', url);
  }
  // Dispatch custom event for route listener
  window.dispatchEvent(new Event('app-route-change'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
