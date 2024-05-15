import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ReactNode } from 'react';
import AuthHeader from './auth-header';
import BackButton from './back-button';

interface CardWrapperProps {
  title: string;
  label: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: ReactNode;
}
const CardWrapper = ({
  title,
  label,
  backButtonLabel,
  backButtonHref,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <AuthHeader title={title} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
