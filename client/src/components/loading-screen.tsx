import Logo from './logo';
import Spinner from './spinner';

const LoadingScreen = ({ logo = true }: { logo: boolean }) => {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center gap-4 p-60">
      {logo && <Logo className=" text-2xl" />}
      <Spinner size="24" />
    </main>
  );
};

export default LoadingScreen;
