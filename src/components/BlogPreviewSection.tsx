import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogs = [
  {
    image: blog1,
    title: "How to Validate Your Startup Idea in 2025",
    desc: "Learn proven frameworks for testing your startup concept before investing significant time and resources.",
  },
  {
    image: blog2,
    title: "AI in Startup Mentorship: The Future is Now",
    desc: "Discover how artificial intelligence is transforming the way founders get feedback and refine their pitches.",
  },
  {
    image: blog3,
    title: "Building a Mentorship Network That Works",
    desc: "Expert strategies for connecting with the right mentors to accelerate your startup journey.",
  },
];

const BlogPreviewSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest from the Blog</h2>
            <p className="text-muted-foreground">Insights and guides for founders.</p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card-hover rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_hsl(256_100%_64%/0.15)]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground">{blog.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link to="/blog" className="text-primary font-medium text-sm">
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
