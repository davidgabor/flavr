import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import RecommendationCard from "@/components/destination/RecommendationCard";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: any[];
}

const AI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm FlavrAI, your personal food and travel recommendation assistant. Ask me anything about restaurants and destinations!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch(
        'https://ljxrxxanhzptitkyaara.supabase.co/functions/v1/chat-recommendations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHJ4eGFuaHpwdGl0a3lhYXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDY5NjEsImV4cCI6MjA0NzQyMjk2MX0.uB46RdtcxRBW21SvWrxmw-m2ap78zW9zJeOFJ0n7oEE'
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        recommendations: data.recommendations
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error while processing your request. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-judson">Chat with FlavrAI</h1>
        <p className="text-neutral-400">Ask me anything about restaurants and destinations!</p>
      </div>

      <div className="mt-8 space-y-8">
        <ScrollArea className="h-[600px] rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="space-y-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-neutral-800 text-neutral-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="mt-4 w-full">
                    <h3 className="text-lg font-medium mb-4">Recommended places:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {message.recommendations.map((rec) => (
                        <RecommendationCard
                          key={rec.id}
                          {...rec}
                          destinationName={rec.destinations.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about restaurants, destinations, or travel tips..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AI;