import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

interface ChatWidgetProps {
  isLoggedIn: boolean
}

type ChatMessage = { id: number; text: string; sender: "bot" | "user"; time: string }

const MOCK_MESSAGES: ChatMessage[] = [
  { id: 1, text: "Hi! How can I help you today?", sender: "bot", time: "Just now" },
]

const ChatWidget = ({ isLoggedIn }: ChatWidgetProps) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" as const, time: "Now" },
    ])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Thanks for your message! Our team will get back to you soon.", sender: "bot" as const, time: "Now" },
      ])
    }, 1000)
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
            style={{ maxHeight: "min(70vh, 500px)" }}
          >
            {/* Header */}
            <div className="gradient-primary px-5 py-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Pitchsap Chat</p>
                <p className="text-xs text-white/70">We typically reply instantly</p>
              </div>
            </div>

            {isLoggedIn ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === "user"
                            ? "gradient-primary text-white rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-border p-3 flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border-border bg-background text-sm"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="rounded-xl gradient-primary text-primary-foreground shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 min-h-[200px]">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <LogIn className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Please log in to start chatting with our team.
                </p>
                <Link to="/auth">
                  <Button className="gradient-primary text-primary-foreground rounded-xl font-semibold">
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
