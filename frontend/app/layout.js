import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import InteractiveParticles from '@/app/components/InteractiveParticles';

export const metadata = {
  title: 'TaskHub - Task Management App',
  description: 'A modern task management application with authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <InteractiveParticles />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
