import { Header } from './Header';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-4">{children}</main>
    </>
  );
}
