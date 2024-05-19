import { ContentLayout } from '@/components/dashboard/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
export default function AccountPage() {
  const { user } = useUser();
  return (
    <ContentLayout title="Account">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <div className="px-4 mt-4 space-y-6 sm:px-6">
          <header className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="rounded-full border">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatarUrl} alt="Avatar" />
                  <AvatarFallback className="bg-transparent text-3xl">
                    {user?.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <Button size="sm" variant={'outline'} disabled>
                  Change photo
                </Button>
              </div>
            </div>
          </header>
          <div className="space-y-8">
            <Card>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    defaultValue={user?.name}
                    id="name"
                    placeholder="E.g. Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email}
                    placeholder="E.g. jane@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>Change Password</div>
                <div>
                  For your security, please do not share your password with
                  others.
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="pt-6">
            <Button disabled>Save</Button>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
