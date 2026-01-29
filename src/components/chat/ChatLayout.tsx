import { useState } from "react";
import { SendHorizontal, Activity, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ChatLayout() {
  const [query, setQuery] = useState("");

  const handleSendQuery = () => {
    if (!query.trim()) return;
    console.log("Sending query:", query);
    // Logic to handle query can go here
    setQuery("");
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
                <div className="flex-1 border rounded-md bg-muted/10 flex items-center justify-center">
                  <span className="text-muted-foreground">
                    Graph Content Goes Here
                  </span>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </aside>

        {/* Right Panel: Canvas & Controls */}
        <div className="flex flex-1 flex-col h-full relative min-w-0">
          {/* 2. Main Workspace (Canvas) */}
          <main className="flex-1 relative overflow-hidden bg-muted/10">
            {/* Grid Background Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.4]"
              style={{
                backgroundImage: `radial-gradient(circle, #a1a1aa 1px, transparent 1px)`,
                backgroundSize: `24px 24px`,
              }}
            />

            {/* Agent Configuration Box */}
            <div className="absolute top-8 left-8 w-80 rounded-xl border bg-card/95 backdrop-blur-sm shadow-lg p-5 z-10">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Agent:
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">
                  Fallback Agent Response:
                </h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-1">
                  <li>Hi there!</li>
                  <li>How can I assist you with the Testcase system today?</li>
                </ul>
              </div>
            </div>
          </main>

          {/* 3. Bottom Control Bar */}
          <footer className="h-20 border-t bg-background flex items-center px-6 gap-6 z-20">
            <div className="flex-1 relative flex items-center max-w-6xl mx-auto w-full">
              <div className="relative w-full flex items-center">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Query here..."
                  className="w-full pr-12 h-11 rounded-full border-muted-foreground/20 focus-visible:ring-teal-600/20 shadow-sm bg-muted/5 pl-4"
                  onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleSendQuery}
                  className="absolute right-1.5 h-8 w-8 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/30 text-teal-600"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
