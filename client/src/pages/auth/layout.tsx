import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full">
      <div className="h-screen flex items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
