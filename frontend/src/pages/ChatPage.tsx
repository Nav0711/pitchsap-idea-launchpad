import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"
import { apiFetch } from "@/lib/api"
import { useNavigate } from "react-router-dom"

interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  online: boolean
  unread: number
  isAi?: boolean
}

type ChatMessage = { id: number; content: string; sender_type: string; created_at?: string }

const CONTACTS: Contact[] = [
  { id: 1, name: "Pitchsap AI Consultant", avatar: "AI", lastMessage: "How can I help you today?", time: "Just now", online: true, unread: 1, isAi: true },
  { id: 2, name: "Alex Rivera", avatar: "AR", lastMessage: "Can we schedule a review?", time: "15m", online: false, unread: 0 },
  { id: 3, name: "Dr. James Liu", avatar: "JL", lastMessage: "Your market analysis looks solid", time: "1h", online: false, unread: 0 },
]

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(CONTACTS[0])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/auth")
    }
  }, [navigate])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fetch messages from backend when selecting the AI contact
  useEffect(() => {
    if (selectedContact?.isAi) {
      fetchHistory()
      
      // Setup simple polling for demo purposes since AI responds async
      const interval = setInterval(() => {
        fetchHistory(false) // silent fetch
      }, 3000)
      return () => clearInterval(interval)
    } else {
      // Clear or set mock messages for other contacts
      setMessages([])
    }
  }, [selectedContact])

  const fetchHistory = async (showLoading = true) => {
    try {
      if (showLoading && messages.length === 0) setIsLoading(true)
      
      const res = await apiFetch(`/api/chat/history?limit=100`)
      
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
    
    // For non-AI contacts in demo, just echo locally
    if (!selectedContact?.isAi) {
      setMessages(prev => [...prev, { id: Date.now(), content: input, sender_type: "user" }])
      setInput("")
      return
    }

    const messageContent = input.trim()
    setInput("")
    
    // Optimistic UI
    const tempId = Date.now()
    setMessages((prev) => [
      ...prev,
      { id: tempId, content: messageContent, sender_type: "user" }
    ])
    
    setIsSending(true)
    
    try {
      await apiFetch(`/api/chat/send`, {
        method: "POST",
        body: JSON.stringify({
          content: messageContent,
          sender_type: "user"
        })
      })
      // The polling interval will pick up the AI response shortly.
    } catch (err) {
      console.error("Send error:", err)
      setMessages(prev => prev.filter(m => m.id !== tempId))
    } finally {
      setIsSending(false)
    }
  }

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact)
    setShowSidebar(false)
  }

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden flex"
          style={{ height: "calc(100vh - 120px)" }}
        >
          {/* Sidebar */}
          <div
            className={cn(
              "w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-card shrink-0",
              !showSidebar && "hidden md:flex"
            )}
          >
            <div className="p-4 border-b border-border space-y-3">
              <h2 className="text-lg font-bold font-display text-foreground">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-9 rounded-xl h-10 bg-background text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => selectContact(contact)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left",
                    selectedContact?.id === contact.id && "bg-muted/70"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="h-11 w-11 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-foreground truncate">{contact.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{contact.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="h-5 w-5 rounded-full gradient-primary text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className={cn("flex-1 flex flex-col", showSidebar && "hidden md:flex")}>
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowSidebar(true)}
                      className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
                        {selectedContact.avatar}
                      </div>
                      {selectedContact.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-card" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{selectedContact.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
                  {isLoading && messages.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
                    </div>
                  ) : messages.length === 0 ? (
                     <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                       No messages yet. Send a message to start!
                     </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn("flex", msg.sender_type === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm transition-all duration-300",
                            msg.sender_type === "user"
                              ? "gradient-primary text-white rounded-br-md shadow-lg shadow-primary/20"
                              : "glass-island backdrop-blur-md text-foreground rounded-bl-md border border-white/20 dark:border-white/5"
                          )}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                          <p className={cn("text-[10px] mt-1.5 opacity-60 text-right font-medium", msg.sender_type === "user" ? "text-white" : "text-muted-foreground")}>
                            {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "Now"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border p-3 flex items-center gap-2 bg-card">
                  <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 shrink-0 hidden sm:flex">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 shrink-0 hidden sm:flex">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl h-10 bg-background text-sm"
                    disabled={isSending}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isSending || !input.trim()}
                    size="icon"
                    className="rounded-xl h-10 w-10 gradient-primary text-primary-foreground shrink-0 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatPage
