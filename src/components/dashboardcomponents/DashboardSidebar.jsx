"use client";
import {
  LayoutDashboard,
  CreditCard,
  Users2,
  Store,
  Grid3x3,
  Banknote,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  ChevronDown,
  MessageCircleMore,
  UserCog,
  ScrollText,
  FileText,
  Info,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../assets/logo.svg";

const mainMenuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Payment", href: "/dashboard/payment", icon: CreditCard },
  { title: "User", href: "/dashboard/users", icon: Users2 },
  { title: "Providers", href: "/dashboard/providers", icon: Store },
  { title: "Categories", href: "/dashboard/categories", icon: Grid3x3 },
  { title: "Withdraw", href: "/dashboard/withdraw", icon: Banknote },
  { title: "Quickchat", href: "/dashboard/quickchat", icon: MessageCircleMore },
];

const otherMenuItems = [
  { title: "Support", href: "/dashboard/support", icon: HelpCircle },
  {
    title: "Setting",
    href: "/dashboard/settings",
    icon: Settings,
    // children: [
    //   { title: "Profile", href: "/dashboard/settings/profile", icon: UserCog },
    //   {
    //     title: "Terms & Condition",
    //     href: "/dashboard/settings/terms",
    //     icon: ScrollText,
    //   },
    //   {
    //     title: "Privacy Policy",
    //     href: "/dashboard/settings/privacy",
    //     icon: FileText,
    //   },
    //   { title: "FAQ", href: "/dashboard/settings/faq", icon: Info },
    // ],
  },
];

function LogoSection() {
  return (
    <Link to="/dashboard">
      <div className="flex items-center gap-2 px-12 py-4 border-b border-gray-200">
        <div className="rounded-lg">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Naibrly</h1>
      </div>
    </Link>
  );
}


function MenuSection({ title, items, onLinkClick }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (href) =>
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((i) => i !== href) : [...prev, href]
    );

  const isExpanded = (href) => expandedItems.includes(href);

  return (
    <div className="mb-6">
      {title && (
        <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          // Active state logic:
          const isActive =
            location.pathname === item.href || // Exact match for the route
            (item.title === "User" && location.pathname.startsWith("/dashboard/users")) || // "Users" section active for all sub-routes (e.g. /users/useraccount)
            (item.title === "Providers" && location.pathname.startsWith("/dashboard/providers")) || // "Providers" section active for all sub-routes
            (item.title === "Setting" && location.pathname.startsWith("/dashboard/settings")) || // "Settings" section active
            (item.title === "Dashboard" && location.pathname === "/dashboard") || // Dashboard section active only for /dashboard
            (item.title === "Dashboard" && location.pathname === "/dashboard/notifications"); // For /dashboard/all-notifications route specifically

          const hasChildren = !!item.children?.length;
          const expanded = isExpanded(item.href);

          return (
            <li key={item.href}>
              {hasChildren ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full justify-start gap-3 h-10 text-sm font-medium px-4 transition-colors duration-150",
                      isActive
                        ? "bg-[#0E7A60] text-white hover:bg-[#0c725a] hover:text-white"
                        : "text-gray-700 hover:bg-[#0E7A60] hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>

                  {/* Child menu items */}
                  <div
                    className={cn(
                      "transition-all overflow-hidden duration-200 ml-4",
                      expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1 mt-1">
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.href; // Exact check for sub-items
                        return (
                          <li key={child.href}>
                            <Link to={child.href} onClick={onLinkClick}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-10 text-sm font-medium px-4 transition-colors duration-150",
                                  isChildActive
                                    ? "bg-[#0E7A60] text-white hover:bg-[#0c725a] hover:text-white"
                                    : "text-gray-700 hover:bg-[#0E7A60] hover:text-white"
                                )}
                              >
                                <child.icon className="h-4 w-4" />
                                {child.title}
                              </Button>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <Link to={item.href} onClick={onLinkClick}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-10 text-sm font-medium px-4 transition-colors duration-150",
                      isActive
                        ? "bg-[#0E7A60] text-white hover:bg-[#0c725a] hover:text-white"
                        : "text-gray-700 hover:bg-[#0E7A60] hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


function SidebarNav({ onLinkClick }) {
  return (
    <nav className="flex-1 p-2 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <MenuSection
          title="Menu"
          items={mainMenuItems}
          onLinkClick={onLinkClick}
        />
        <MenuSection
          title="Other"
          items={otherMenuItems}
          onLinkClick={onLinkClick}
        />
      </div>

      <div className="mt-auto border-t border-gray-200 pt-2">
        <Link to="/logout" onClick={onLinkClick}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm font-medium px-4 text-red-500 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </Link>
      </div>
    </nav>
  );
}

function DesktopSidebar() {
  return (
    <div className="hidden lg:flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <LogoSection />
      <SidebarNav />
    </div>
  );
}

function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/20 h-8 w-8 bg-transparent border border-white/20 transition-colors"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 sm:max-w-sm">
        <div className="flex h-full flex-col bg-white">
          <LogoSection />
          <SidebarNav onLinkClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { DesktopSidebar, MobileSidebar };

export default function DashboardSidebar() {
  return <DesktopSidebar />;
}
