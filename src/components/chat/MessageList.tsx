import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "./types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea ref={scrollRef} className="flex-1 p-4 pb-0">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-10">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Bot className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-semibold">How can I help you today?</h3>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 p-4 rounded-lg",
              message.role === "user" ? "bg-muted/50" : "bg-background",
            )}
          >
            <Avatar className="h-8 w-8 border">
              <AvatarFallback
                className={
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="font-semibold text-sm">
                {message.role === "assistant" ? "AI Assistant" : "You"}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 p-4 rounded-lg bg-background">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="font-semibold text-sm">AI Assistant</div>
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
