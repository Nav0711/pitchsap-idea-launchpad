import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogPosts = [
  {
    image: blog1,
    title: "How to Validate Your Startup Idea in 2025",
    desc: "Learn proven frameworks for testing your startup concept before investing significant time and resources. From lean validation to customer discovery, this guide covers it all.",
    date: "Mar 10, 2026",
    category: "Strategy",
  },
  {
    image: blog2,
    title: "AI in Startup Mentorship: The Future is Now",
    desc: "Discover how artificial intelligence is transforming the way founders get feedback and refine their pitches. AI-powered insights are changing the game for early-stage startups.",
    date: "Mar 5, 2026",
    category: "AI & Tech",
  },
  {
    image: blog3,
    title: "Building a Mentorship Network That Works",
    desc: "Expert strategies for connecting with the right mentors to accelerate your startup journey. Quality mentorship can be the difference between success and failure.",
    date: "Feb 28, 2026",
    category: "Community",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Insights, guides, and stories for founders building the next big thing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-primary">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;
