import '@styles/global.css';
import SessionProviderWrapper from '@components/providers/SessionProvider';

export const metadata = {
  title: "Omoi",
  description: "An intuitive note application for managing and storing your notes seamlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
