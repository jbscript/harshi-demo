import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { ChatSession } from "./types";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  className?: string; // To allow hiding on mobile
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  className,
}: ChatSidebarProps) {
  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4 p-4 bg-muted/20 border-r">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">AI Chat</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          className="md:hidden"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>

      <Button
        onClick={onNewChat}
        className="w-full justify-start gap-2"
        variant="secondary"
      >
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Button>

      <Separator />

      <div className="flex-1 overflow-hidden">
        <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          History
        </p>
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="flex flex-col gap-1 pr-4">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant={
                  currentSessionId === session.id ? "secondary" : "ghost"
                }
                className={cn(
                  "justify-start gap-2 h-auto py-3 px-3",
                  currentSessionId === session.id && "bg-secondary",
                )}
                onClick={() => onSelectSession(session.id)}
              >
                <MessageSquare className="h-4 w-4 min-w-[16px]" />
                <div className="flex flex-col items-start overflow-hidden text-left">
                  <span className="truncate w-full text-sm font-medium">
                    {session.title}
                  </span>
                  <span className="truncate w-full text-xs text-muted-foreground">
                    {session.date}
                  </span>
                </div>
              </Button>
            ))}
            {sessions.length === 0 && (
              <div className="text-sm text-muted-foreground p-2 text-center">
                No history yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );

  // Mobile Sheet Wrapper
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden absolute left-4 top-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <SheetTitle className="visually-hidden">Navigation Menu</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <MobileSidebar />
      <div className={cn("hidden md:block w-[280px] h-full", className)}>
        <SidebarContent />
      </div>
    </>
  );
}
