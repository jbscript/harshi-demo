import { useState } from "react";
import { Activity, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatArea } from "./ChatArea";
import type { Message } from "./types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/golf/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
          user_id: "string",
          conversation: "",
          similar_queries: "",
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer.content || "No response",
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Error communicating with the server",
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden font-sans">
      {/* 1. Top Navigation Bar */}
      <header className="flex h-14 items-center justify-between border-b px-6 bg-background z-20 shadow-sm">
        <h1 className="text-lg font-bold tracking-tight">
          S.A.T.A - SAP AI enable Testing Automation
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <span className="text-sm font-medium">Chat</span>
          <div className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Graph Area */}
        <aside className="w-[200px] border-r bg-background flex flex-col justify-between p-6">
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            {/* <Activity className="h-16 w-16 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold mb-2">Graph View</h2>
            <p className="text-sm text-center opacity-70">
              Graph visualization will appear in this dedicated panel.
            </p> */}
          </div>

          <div className="pt-4 border-t mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all hover:shadow-lg gap-2 h-10 font-medium">
                  <Activity className="h-4 w-4" />
                  Graph
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Graph Visualization</DialogTitle>
                </DialogHeader>
                {/* <div className="flex-1 border rounded-md bg-muted/10 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Graph Content Goes Here
                  </span>
                </div> */}
                <iframe
                  src="https://example.com"
                  title="Example Website"
                  width="100%"
                  height="500px"
                  // Optional: Apply security restrictions
                  sandbox="allow-scripts allow-forms allow-popups allow-same-origin"
                />
              </DialogContent>
            </Dialog>
          </div>
        </aside>

        {/* Right Panel: Canvas & Controls */}
        <div className="flex flex-1 flex-col h-full relative min-w-0">
          {/* 2. Main Workspace (Canvas) */}
          <main className="flex-1 relative overflow-hidden bg-muted/10">
            {/* Chat Area */}
            <ChatArea
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </main>

          {/* 3. Bottom Control Bar */}
          <footer className="h-20 border-t bg-background flex items-center px-6 gap-6 z-20">
            {/* ChatArea handles the input */}
          </footer>
        </div>
      </div>
    </div>
  );
}
