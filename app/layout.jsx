import '@styles/global.css';
import SessionProviderWrapper from '@components/providers/SessionProvider';

export const metadata = {
  title: "Omoi",
  description: "An intuitive note application for managing and storing your notes seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
