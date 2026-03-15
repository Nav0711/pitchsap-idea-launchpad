import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import pitchsapLogo from "@/assets/pitchsap-logo.png"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")

    // Demo Login Logic: Always succeeds after a short delay
    setTimeout(() => {
      // Set the token key specifically requested by the user
      localStorage.setItem("token", "dummy-demo-token")
      
      // Set the app's existing keys to ensure other components (Navbar, Chat) function correctly
      localStorage.setItem("pitchsap_token", "dummy-demo-token")
      localStorage.setItem("pitchsap_logged_in", "true")
      localStorage.setItem("pitchsap_user", JSON.stringify({ 
        email: email || "demo@pitchsap.com", 
        name: name || (isLogin ? "Demo User" : "New Demo User") 
      }))

      setIsLoading(false)
      // Redirect to /chat as requested
      navigate("/chat")
      window.location.reload()
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-2">
              <img src={pitchsapLogo} alt="Pitchsap" className="h-10 mx-auto mb-4" />
              <h1 className="text-2xl font-bold font-display text-foreground">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? "Log in to access your dashboard"
                  : "Start your startup journey today"}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm text-center border border-red-500/20">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="pl-10 rounded-xl h-12 bg-background"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-10 rounded-xl h-12 bg-background"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10 pr-10 rounded-xl h-12 bg-background"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold text-base hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setErrorMsg("")
                }}
                className="text-primary font-semibold hover:underline"
                type="button"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthPage
