import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import HeroImage from './hero-img';

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#4773d2] text-transparent bg-clip-text">
              Track
            </span>{' '}
            Troubles
          </h1>{' '}
          in your{' '}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              web sites
            </span>{' '}
            with ease
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Track your website's Issues and performance and get reports with our
          easy-to-use tool.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3 " asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroImage />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
