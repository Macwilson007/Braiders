import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ChatWidget from '@/components/chat/ChatWidget';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Braiders — Premium Hair Braiding & Styling in Lagos',
  description: 'Lagos\'s premier destination for expert hair braiding, styling, and treatments. Book your appointment today and discover the art of African hair beauty.',
  keywords: 'hair braiding, Lagos hair salon, braids, knotless braids, cornrows, hair styling, African hair, hair extensions',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Braiders — Premium Hair Braiding & Styling in Lagos',
    description: 'Lagos\'s premier destination for expert hair braiding, styling, and treatments.',
    type: 'website',
    locale: 'en_NG',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <ChatWidget />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
