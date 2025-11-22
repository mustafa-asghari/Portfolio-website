import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "7eaff07e-b900-417b-bb15-e4aa7d6b90ab");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("project_type", formData.projectType);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("from_name", "Portfolio Contact Form");
      formDataToSend.append("subject", `New Project Inquiry: ${formData.projectType}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent successfully!",
          description: "I'll respond within 24 hours.",
        });
        setFormData({ name: "", email: "", projectType: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly at MustafaAsghari.dev@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-32 md:py-48 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Let's Build the Future.</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 py-4 focus:border-primary transition-colors duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 py-4 focus:border-primary transition-colors duration-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="projectType"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
              >
                Project Type
              </label>
              <Input
                id="projectType"
                placeholder="e.g., E-commerce, SaaS, Portfolio"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
                className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 py-4 focus:border-primary transition-colors duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 py-4 focus:border-primary transition-colors duration-300 resize-none"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-8">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 font-medium transition-all duration-500 hover:glow-accent disabled:opacity-50"
              >
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.span>
                <motion.div
                  whileHover={{
                    rotate: 360,
                  }}
                  whileTap={{
                    rotate: 720,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <Send className="ml-3 w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
