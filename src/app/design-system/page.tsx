import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Info,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const colorSwatches = [
  {
    name: "Background",
    value: "bg-background",
    tone: "bg-slate-50 dark:bg-slate-950",
  },
  {
    name: "Foreground",
    value: "text-foreground",
    tone: "bg-slate-900 dark:bg-slate-100",
  },
  { name: "Primary", value: "bg-primary", tone: "bg-indigo-600" },
  {
    name: "Secondary",
    value: "bg-secondary",
    tone: "bg-slate-200 dark:bg-slate-700",
  },
  {
    name: "Accent",
    value: "bg-accent",
    tone: "bg-violet-100 dark:bg-violet-900",
  },
  { name: "Success", value: "bg-success", tone: "bg-emerald-500" },
  { name: "Warning", value: "bg-warning", tone: "bg-amber-500" },
  { name: "Destructive", value: "bg-destructive", tone: "bg-rose-500" },
  { name: "Info", value: "bg-info", tone: "bg-cyan-500" },
  {
    name: "Border",
    value: "bg-border",
    tone: "bg-slate-200 dark:bg-slate-700",
  },
];

const spacingSamples = [
  { label: "XS", value: "4" },
  { label: "SM", value: "8" },
  { label: "MD", value: "12" },
  { label: "LG", value: "16" },
  { label: "XL", value: "24" },
  { label: "2XL", value: "32" },
];

export default function DesignSystemPage() {
  return (
    <main className="bg-background min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.22em] uppercase">
              NovaSaaS design system
            </p>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Premium component library
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl text-lg font-semibold">
                  N
                </div>
                <div>
                  <p className="text-foreground font-medium">NovaSaaS</p>
                  <p className="text-muted-foreground text-sm">
                    Premium admin UI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
                Display
              </p>
              <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                Heading
              </h2>
              <p className="text-muted-foreground text-sm">
                Body copy with strong readability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-foreground flex items-center gap-2 text-sm">
                <Rocket className="text-primary h-4 w-4" />
                App Router ready
              </div>
              <div className="text-foreground flex items-center gap-2 text-sm">
                <Zap className="text-info h-4 w-4" />
                Theme aware
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Color tokens</CardTitle>
              <CardDescription>
                Semantic colors used throughout the product system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {colorSwatches.map((item) => (
                  <div
                    key={item.name}
                    className="border-border bg-card flex items-center gap-3 rounded-lg border px-3 py-2"
                  >
                    <div
                      className={`border-border h-10 w-10 rounded-md border ${item.tone}`}
                    />
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing scale</CardTitle>
              <CardDescription>
                Consistent rhythm used for layout composition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {spacingSamples.map((space) => (
                  <div key={space.label} className="flex items-center gap-3">
                    <span className="text-muted-foreground w-12 text-xs font-medium tracking-[0.2em] uppercase">
                      {space.label}
                    </span>
                    <div className="bg-secondary h-5 flex-1 rounded-md">
                      <div
                        className="bg-primary/75 h-full rounded-md"
                        style={{
                          width: `${Math.max(18, Number(space.value) * 2)}%`,
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8 text-right text-xs">
                      {space.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Buttons
            </h2>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon" aria-label="Favorite action">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button loading loadingText="Creating">
                    Default
                  </Button>
                  <Button variant="secondary" loading loadingText="Saving" />
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Badges
            </h2>
            <Card>
              <CardContent className="flex flex-wrap gap-3 pt-6">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="info">Info</Badge>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Alerts
            </h2>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Default status</AlertTitle>
                <AlertDescription>
                  Informational messages use semantic contrast and clear text.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <Bell className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Review the rate limit before continuing the action.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Action required</AlertTitle>
                <AlertDescription>
                  You must resolve the validation error before submitting.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  New integrations are available for review in the setup flow.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Cards
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Project overview</CardTitle>
                <CardDescription>
                  Premium surfaces use balanced contrast, borders, and spacing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  This is a reusable content container for forms, stats, and
                  summary blocks.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-muted-foreground text-sm">
                  Updated 2 hours ago
                </span>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Form controls
            </h2>
            <Card>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Email</Label>
                  <Input id="name" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe the request" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="select">Project status</Label>
                  <Select defaultValue="in-review">
                    <SelectTrigger id="select">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-review">In review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="newsletter" defaultChecked />
                    <Label htmlFor="newsletter">Newsletter</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="beta" aria-invalid="true" />
                    <Label htmlFor="beta">Beta access</Label>
                  </div>
                  <div className="border-border flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                    <Label htmlFor="notifications">Notifications</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invalid">Invalid field</Label>
                  <Input
                    id="invalid"
                    aria-invalid="true"
                    defaultValue="invalid value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled field</Label>
                  <Input id="disabled" disabled placeholder="Disabled value" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Tabs
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-2 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Content for the overview tab.
                    </p>
                  </TabsContent>
                  <TabsContent value="activity" className="space-y-2 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Activity and status updates appear here.
                    </p>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-2 pt-4">
                    <p className="text-muted-foreground text-sm">
                      User preferences and configuration live here.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
                Avatar + skeleton
              </h2>
              <Card>
                <CardContent className="space-y-5 pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                        alt="Ava Johnson"
                      />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-foreground font-medium">Ava Johnson</p>
                      <p className="text-muted-foreground text-sm">
                        Product lead
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
                Overlay components
              </h2>
              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog example</DialogTitle>
                      <DialogDescription>
                        Accessible overlay with focus management and escape
                        support.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Input defaultValue="NovaSaaS workspace" />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Continue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Overview</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Invite team</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary">Hover for tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Helpful guidance for the current action.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Theme switcher
            </h2>
            <Card>
              <CardContent className="flex items-center justify-between gap-4 pt-6">
                <div>
                  <p className="text-foreground font-medium">
                    Current appearance
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Switch between system, light, and dark modes.
                  </p>
                </div>
                <ThemeToggle />
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="pb-4">
            <p className="text-muted-foreground text-sm">
              This route serves as the internal design-system documentation for
              NovaSaaS.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
