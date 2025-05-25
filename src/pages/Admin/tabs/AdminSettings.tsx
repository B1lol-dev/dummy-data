import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-gray-600">
            Manage your platform configuration and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      defaultValue={document.title}
                      onChange={(e) => (document.title = e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input id="site-url" defaultValue={location.origin} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Site Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="Dummy Data is a web platform that provides a wide range of dummy data for testing and development purposes."
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                </div>
                <Button className="bg-black hover:bg-gray-800">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Get notified of new logins
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-gray-500">
                        Auto-logout after inactivity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Password Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Minimum 8 characters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require uppercase letters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Require special characters</Label>
                    </div>
                  </div>
                </div>
                <Button className="bg-black hover:bg-gray-800">
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>New user registrations</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>New product uploads</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>System alerts</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Weekly reports</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Critical system alerts</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>New comments</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Order notifications</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <Button className="bg-black hover:bg-gray-800">
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with third-party services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Google Analytics</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Track website analytics and user behavior
                    </p>
                    <Input placeholder="GA Tracking ID" />
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Stripe</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Process payments and subscriptions
                    </p>
                    <Input placeholder="Stripe API Key" type="password" />
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">SendGrid</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Send transactional emails
                    </p>
                    <Input placeholder="SendGrid API Key" type="password" />
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">AWS S3</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Store files and media
                    </p>
                    <Input placeholder="S3 Bucket Name" />
                  </div>
                </div>
                <Button className="bg-black hover:bg-gray-800">
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
};

export default React.memo(AdminSettings);
