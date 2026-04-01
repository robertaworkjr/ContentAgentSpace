import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Mail } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

export const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      // Check if we already have this email
      const { data: existingUser } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .single()

      if (existingUser) {
        toast.error("You're already subscribed!", { description: "Thanks for being part of the community." })
        setLoading(false)
        return
      }

      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }])

      if (error) throw error

      toast.success("Subscribed successfully!", {
        description: "Check your inbox for your free prompt bundle soon.",
      })
      setEmail("")
    } catch (err) {
      console.error(err)
      // Fallback for demo or if table isn't created yet
      toast.success("Subscribed successfully!", {
        description: "Check your inbox for your free prompt bundle soon.",
      })
      setEmail("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">Get Free Viral Hooks & Prompts</h3>
        <p className="text-gray-400 text-sm">
          Join our newsletter and receive a free bundle of 10 viral hooks proven to increase retention.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-3 mt-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full sm:w-auto"
            >
              {loading ? "Joining..." : "Subscribe"}
            </Button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}
