import { Figtree, Onest } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const FigTree = Figtree({ subsets: ['latin'] });
export const Onset = Onest({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'ToolSwift',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <div className="toolSwift">
            <div className="toolSwiftWrapper">
              <div className="toolSwiftPages">{children}</div>
            </div>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
