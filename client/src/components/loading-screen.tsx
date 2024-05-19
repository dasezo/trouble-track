import Logo from './logo';
import Spinner from './spinner';

const LoadingScreen = () => {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center gap-4 p-60">
      <Logo className=" text-2xl" />
      <Spinner size="24" />
    </main>
  );
};

export default LoadingScreen;
