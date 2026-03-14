import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"

interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  online: boolean
  unread: number
}

interface Message {
  id: number
  text: string
  sender: "me" | "them"
  time: string
}

const CONTACTS: Contact[] = [
  { id: 1, name: "Sarah Chen", avatar: "SC", lastMessage: "Love the pitch deck updates!", time: "2m", online: true, unread: 2 },
  { id: 2, name: "Alex Rivera", avatar: "AR", lastMessage: "Can we schedule a review?", time: "15m", online: true, unread: 0 },
  { id: 3, name: "Dr. James Liu", avatar: "JL", lastMessage: "Your market analysis looks solid", time: "1h", online: false, unread: 0 },
  { id: 4, name: "Maria Santos", avatar: "MS", lastMessage: "Sent you the investor list", time: "3h", online: false, unread: 1 },
  { id: 5, name: "David Kim", avatar: "DK", lastMessage: "Great progress on the MVP!", time: "1d", online: false, unread: 0 },
]

const MOCK_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Hey! I reviewed your latest pitch deck. 🎯", sender: "them", time: "10:30 AM" },
    { id: 2, text: "Thanks Sarah! What did you think?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "The value proposition is much clearer now. The market size section needs a bit more data though.", sender: "them", time: "10:33 AM" },
    { id: 4, text: "Love the pitch deck updates!", sender: "them", time: "10:35 AM" },
  ],
  2: [
    { id: 1, text: "Hi Alex, I'd like to get your expert review on my fintech idea", sender: "me", time: "9:00 AM" },
    { id: 2, text: "Can we schedule a review?", sender: "them", time: "9:15 AM" },
  ],
}

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(CONTACTS[0])
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[1] || [])
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = { id: Date.now(), text: input, sender: "me", time: "Now" }
    setMessages((prev) => [...prev, newMsg])
    setInput("")
  }

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact)
    setMessages(MOCK_MESSAGES[contact.id] || [])
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
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                          msg.sender === "me"
                            ? "gradient-primary text-white rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        <p>{msg.text}</p>
                        <p className={cn("text-[10px] mt-1", msg.sender === "me" ? "text-white/60" : "text-muted-foreground")}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border p-3 flex items-center gap-2 bg-card">
                  <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl h-10 bg-background text-sm"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="rounded-xl h-10 w-10 gradient-primary text-primary-foreground shrink-0"
                  >
                    <Send className="h-4 w-4" />
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
