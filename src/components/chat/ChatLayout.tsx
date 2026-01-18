import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import type { Message, ChatSession } from "./types";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function ChatLayout() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messagesBySession, setMessagesBySession] = useState<
    Record<string, Message[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    const newSessionId = generateId();
    const newSession: ChatSession = {
      id: newSessionId,
      title: "New Chat",
      date: new Date().toLocaleDateString(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSessionId);
    setMessagesBySession({ ...messagesBySession, [newSessionId]: [] });
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
  };

  const handleSendMessage = async (content: string) => {
    if (!currentSessionId) {
      // Should not happen if we ensure a session exists, but let's handle it by creating one
      handleNewChat();
      // We need to wait for state update or use a ref/wrapper, but for simplicity let's assume valid session
      // Actually, react state update is async.
      // Let's just create a temporary variable and use it if needed.
      // But to be safe, I'll just enforce currentSessionId Check.
      // For this demo, let's just create one if null.
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
    };

    const sessionId = currentSessionId;

    setMessagesBySession((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), userMessage],
    }));

    // Update title if it's the first message
    const currentMessages = messagesBySession[sessionId] || [];
    if (currentMessages.length === 0) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                title:
                  content.slice(0, 30) + (content.length > 30 ? "..." : ""),
              }
            : s,
        ),
      );
    }

    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: `This is a simulated AI response to: "${content}"\n\nI can write code, answer questions, and assist you with your tasks.`,
      };

      setMessagesBySession((prev) => ({
        ...prev,
        [sessionId]: [
          ...(prev[sessionId] || []),
          prev[sessionId].find((m) => m.id === userMessage.id)
            ? aiMessage
            : aiMessage,
        ], // check to avoid issues if needed
      }));
      setIsLoading(false);
    }, 1500);
  };

  // Ensure there is at least one session on mount?
  // Or show empty state.
  // Let's create a "New Chat" button click simulation or just empty state.
  // Better: If no session, show empty state or just select none.
  // Actually, if currentsSessionId is null, show a welcome screen or just empty chat area.
  // I'll handle null session in render.

  const currentMessages = currentSessionId
    ? messagesBySession[currentSessionId] || []
    : [];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
      />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {currentSessionId ? (
          <ChatArea
            messages={currentMessages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
              Welcome to AI Chat
            </h1>
            <p className="mb-8">Start a new conversation to begin.</p>
            <button
              onClick={handleNewChat}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Start Chatting
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
