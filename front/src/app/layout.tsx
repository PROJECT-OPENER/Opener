import './globals.css';
import './styles/index.scss';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import AuthContext from '@/context/AuthContext';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>OPENER</title>
      </head>
      <body>
        <AuthContext>
          <TopNav />
          <div className="content h-screen">{children}</div>
          <BottomNav />
        </AuthContext>
      </body>
    </html>
  );
}
