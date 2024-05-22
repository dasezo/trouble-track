import { PieChart, Radar, ScrollText, SquareGanttChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Radar className="size-8" />,
    title: 'Real-Time Error Monitoring',
    description:
      "Instantly capture and report errors as they occur in your frontend applications. With TroubleTrack's real-time monitoring, you can identify and address issues before they impact your users.",
  },
  {
    icon: <ScrollText className="size-8" />,
    title: 'Comprehensive Error Details',
    description:
      'Gain deep insights into each error with detailed reports that include error type, message, stack trace, and user environment. This helps developers quickly diagnose and fix issues efficiently.',
  },
  {
    icon: <SquareGanttChart className="size-8" />,
    title: 'Seamless Project Management',
    description:
      'Easily create, manage, and organize your projects within TroubleTrack. Assign unique identification keys to your projects and filter errors by project to maintain a clear and structured workflow.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
  },
  {
    icon: <PieChart className="size-8" />,
    title: 'Insightful Analytics',
    description:
      "Leverage powerful analytics to understand error trends, error distribution, and resolution times. With these insights, you can enhance your application's stability and performance over time.",
  },
];

const Features = () => {
  return (
    <section id="features" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Our <span className="text-blue-500">Greate Features </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        These features highlight the key functionalities of TroubleTrack
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center ">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
