import { Breadcrumbs } from "./breadcrumbs";
import { CommandMenu } from "./command-menu";
import { NotificationsPreview } from "./notifications-preview";
import { UserMenu } from "./user-menu";

export function DashboardHeader() {
  return (
    <header className="bg-background/95 sticky top-0 z-30 border-b backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-8">
        <div className="hidden min-w-0 flex-1 md:block">
          <Breadcrumbs />
        </div>
        <div className="flex flex-1 items-center gap-2 md:flex-none">
          <CommandMenu />
          <NotificationsPreview />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
