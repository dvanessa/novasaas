import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  UserPlus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const metrics = [
  {
    label: "Monthly revenue",
    value: "$48,295",
    change: "+12.5%",
    trend: "up" as const,
    detail: "vs. last month",
    icon: CircleDollarSign,
  },
  {
    label: "Active subscriptions",
    value: "2,420",
    change: "+8.2%",
    trend: "up" as const,
    detail: "vs. last month",
    icon: CreditCard,
  },
  {
    label: "Team members",
    value: "1,429",
    change: "+4.7%",
    trend: "up" as const,
    detail: "vs. last month",
    icon: Users,
  },
  {
    label: "Churn rate",
    value: "2.4%",
    change: "-0.4%",
    trend: "down" as const,
    detail: "vs. last month",
    icon: ArrowDownRight,
  },
];

const chartData = [42, 50, 46, 61, 58, 72, 68, 82, 77, 89, 86, 96];
const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const activity = [
  {
    title: "New member joined",
    description: "Mia Thompson joined the Product team",
    time: "8 min ago",
    icon: UserPlus,
    tone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  },
  {
    title: "Payment received",
    description: "Acme Inc. paid invoice #1048",
    time: "34 min ago",
    icon: CheckCircle2,
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    title: "Workspace created",
    description: "Northstar Labs started a Pro trial",
    time: "2 hr ago",
    icon: Building2,
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
];

const plans = [
  { label: "Enterprise", value: 38, color: "bg-primary" },
  { label: "Pro", value: 34, color: "bg-violet-500" },
  { label: "Starter", value: 20, color: "bg-sky-500" },
  { label: "Free", value: 8, color: "bg-slate-400" },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <section
        aria-label="Key metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="min-w-0 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-muted-foreground truncate text-sm font-medium">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {metric.value}
                    </p>
                  </div>
                  <span className="bg-accent text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 font-semibold",
                      metric.trend === "up" ? "text-success" : "text-success",
                    )}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    ) : (
                      <ArrowDownRight aria-hidden="true" className="size-3.5" />
                    )}
                    {metric.change}
                  </span>
                  {metric.detail}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
        <Card className="min-w-0">
          <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Revenue overview</CardTitle>
              <CardDescription>
                Monthly recurring revenue for 2026
              </CardDescription>
            </div>
            <Badge variant="outline">Demo data</Badge>
          </CardHeader>
          <CardContent>
            <div
              className="relative h-64 overflow-hidden rounded-lg"
              role="img"
              aria-label="Revenue rises from 42 thousand dollars in January to 96 thousand dollars in December"
            >
              <div
                className="absolute inset-0 flex flex-col justify-between"
                aria-hidden="true"
              >
                {[0, 1, 2, 3, 4].map((line) => (
                  <span
                    key={line}
                    className="border-border block border-t border-dashed"
                  />
                ))}
              </div>
              <div
                className="absolute inset-x-2 top-3 bottom-7 flex items-end gap-1.5 sm:gap-3"
                aria-hidden="true"
              >
                {chartData.map((value, index) => (
                  <div
                    key={monthLabels[index]}
                    className="group flex h-full min-w-0 flex-1 items-end"
                  >
                    <div
                      className="bg-primary/85 group-hover:bg-primary w-full rounded-t-sm transition-colors"
                      style={{ height: `${value}%` }}
                      title={`${monthLabels[index]}: $${value}k`}
                    />
                  </div>
                ))}
              </div>
              <div
                className="text-muted-foreground absolute inset-x-2 bottom-0 grid grid-cols-6 text-[10px] sm:grid-cols-12 sm:text-xs"
                aria-hidden="true"
              >
                {monthLabels.map((month, index) => (
                  <span
                    key={month}
                    className={cn(
                      "text-center",
                      index % 2 === 1 && "hidden sm:block",
                    )}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Subscriptions by plan</CardTitle>
            <CardDescription>Current customer distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div
              className="flex h-3 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              {plans.map((plan) => (
                <span
                  key={plan.label}
                  className={plan.color}
                  style={{ width: `${plan.value}%` }}
                />
              ))}
            </div>
            <ul className="space-y-3">
              {plans.map((plan) => (
                <li
                  key={plan.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn("size-2.5 rounded-full", plan.color)}
                      aria-hidden="true"
                    />
                    {plan.label}
                  </span>
                  <span className="font-semibold">{plan.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>
            The latest events across your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-border divide-y">
            {activity.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      item.tone,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-muted-foreground mt-0.5 truncate text-sm">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                    <Clock3 aria-hidden="true" className="size-3.5" />
                    {item.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
