import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import type { Message } from "./types";

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
}

export function ChatArea({
  messages,
  isLoading,
  onSendMessage,
}: ChatAreaProps) {
  return (
    <div className="flex h-full flex-col w-full">
      <MessageList messages={messages} isLoading={isLoading} />
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
