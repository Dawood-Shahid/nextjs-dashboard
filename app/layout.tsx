import '@/app/ui/global.css';
import { inter } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        //* Change the font throughout your application
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
