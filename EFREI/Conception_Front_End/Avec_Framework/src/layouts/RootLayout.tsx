import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
