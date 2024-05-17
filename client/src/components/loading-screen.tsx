import Logo from './logo';
import Spinner from './spinner';

const LoadingScreen = () => {
  return (
    <main className="h-dvh w-full flex flex-col items-center justify-center gap-4">
      <Logo className=" text-2xl" />
      <Spinner size="24" />
    </main>
  );
};

export default LoadingScreen;
