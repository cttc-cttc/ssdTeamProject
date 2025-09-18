import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { printDateSeparator, printTimeStamp, type ChatMessageProps } from "./chat-utils";
import React from "react";
import { CalendarDays } from "lucide-react";

interface RenderMessagesProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  messages: ChatMessageProps[];
  username: string;
}

export default function RenderMessages({ rootRef, messages, username }: RenderMessagesProps) {
  return (
    <ScrollArea ref={rootRef} className="w-xl max-w-xl rounded-md h-96 border">
      <div className="w-xl max-w-xl flex flex-col gap-4 p-4">
        {messages.map((msg, i) => {
          const time = printTimeStamp(messages, i);
          const dateSeparator = printDateSeparator(messages, i);

          return (
            <React.Fragment key={i}>
              {dateSeparator && (
                <div className="flex w-full justify-center my-8">
                  <div className="flex items-center gap-1 border-1 border-muted-foreground px-3 rounded-2xl">
                    <CalendarDays className="text-muted-foreground font-semibold w-4 h-4" />
                    <span className="text-sm text-muted-foreground font-semibold">
                      {dateSeparator}
                    </span>
                  </div>
                </div>
              )}
              {msg.sender === username ? (
                // 내 매시지
                <div className="flex items-baseline-last gap-2 self-end w-fit max-w-10/12">
                  {time && <div className="text-sm text-muted-foreground">{time}</div>}
                  <div className="bg-primary text-white px-3 py-2 rounded-2xl shadow-sm whitespace-pre-wrap break-words break-all">
                    {msg.content}
                  </div>
                </div>
              ) : (
                // 상대방 메시지
                <div key={i} className="flex flex-col self-start max-w-10/12 gap-2">
                  <span className="font-medium text-muted-foreground">{msg.sender}</span>
                  <div className="flex items-baseline-last gap-2">
                    <div className="bg-muted w-fit px-3 py-2 rounded-2xl shadow-sm whitespace-pre-wrap break-words break-all">
                      {msg.content}
                    </div>
                    {time && <div className="text-sm text-muted-foreground">{time}</div>}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
