import { Card, CardContent } from '@/components/ui/card';

export default function EmptyProjects() {
  return (
    <Card className="rounded-lg  mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <h2>We are waiting for your first project!</h2>
          <div className="flex flex-col relative">
            <img
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
