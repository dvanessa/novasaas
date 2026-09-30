import { Breadcrumbs } from "./breadcrumbs";
import { CommandMenu } from "./command-menu";
import { NotificationsPreview } from "./notifications-preview";
import { UserMenu } from "./user-menu";

export function DashboardHeader() {
  return (
    <header className="bg-background/95 relative z-30 shrink-0 border-b backdrop-blur">
      <div className="flex h-16 min-w-0 items-center gap-3 px-4 lg:px-8">
        <div className="hidden min-w-0 flex-1 md:block">
          <Breadcrumbs />
        </div>
        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 md:flex-none">
          <div className="w-36 min-w-0 flex-1 sm:w-48 md:w-60 md:flex-none">
            <CommandMenu />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <NotificationsPreview />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
