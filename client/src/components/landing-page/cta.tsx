import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            All Your
            <span className="text-blue-500"> Clients </span>
            Will be satisfied
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            We provide the best service for our clients, and we are always ready
            to help you do the same for yours aswell, by providing you with the
            best tools to manage your projects and keep your clients satisfied.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" asChild>
            <Link to="/register">Let's Do It</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
