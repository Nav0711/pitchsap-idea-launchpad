import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, LogIn, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

interface ChatWidgetProps {
  isLoggedIn: boolean
}

type ChatMessage = { id: number; content: string; sender_type: string; created_at?: string }

const ChatWidget = ({ isLoggedIn }: ChatWidgetProps) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (open) scrollToBottom()
  }, [messages, open])

  // Fetch history when opened
  useEffect(() => {
    if (open && isLoggedIn) {
      fetchHistory()
    }
  }, [open, isLoggedIn])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("pitchsap_token")
      if (!token) return

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/history`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (err) {
      console.error("Failed to fetch chat history:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isSending) return
    
    const messageContent = input.trim()
    setInput("")
    
    // Optimistic UI update
    const tempId = Date.now()
    setMessages((prev) => [
      ...prev,
      { id: tempId, content: messageContent, sender_type: "user" }
    ])
    
    setIsSending(true)
    
    try {
      const token = localStorage.getItem("pitchsap_token")
      if (!token) throw new Error("No token")

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          content: messageContent,
          sender_type: "user"
        })
      })
      
      if (!res.ok) throw new Error("Send failed")
      
      // We don't need to append the user message result as we already optimistically added it,
      // but in a robust system we'd replace the optimistic one with the real ID.
      
      // To get the AI response (since it's generated async on backend),
      // we'll just poll the history after 2 seconds.
      setTimeout(fetchHistory, 2000)
      
    } catch (err) {
      console.error("Send error:", err)
      // Remove optimistic message on fail
      setMessages((prev) => prev.filter(m => m.id !== tempId))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-primary text-primary-foreground shadow-xl flex items-center justify-center interactive ring-pulse"
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(70vh, 500px)", height: "500px" }}
          >
            {/* Header */}
            <div className="gradient-primary px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Pitchsap Chat</p>
                <p className="text-xs text-white/70">Expert AI Consultant</p>
              </div>
            </div>

            {isLoggedIn ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoading && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Start a conversation below!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                            msg.sender_type === "user"
                              ? "gradient-primary text-white rounded-br-sm shadow-md"
                              : "bg-muted text-foreground rounded-bl-sm border border-border/50"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border p-3 flex gap-2 shrink-0 bg-background/50 backdrop-blur-sm">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border-border bg-background text-sm"
                    disabled={isSending}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isSending || !input.trim()}
                    size="icon"
                    className="rounded-xl gradient-primary text-primary-foreground shrink-0 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <LogIn className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Please log in to chat with our Pitchsap AI consultant.
                </p>
                <Link to="/auth">
                  <Button className="gradient-primary text-primary-foreground rounded-xl font-semibold shadow-md">
                    Login to Chat
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
