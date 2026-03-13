import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogs = [
  {
    image: blog1,
    tag: "Validation",
    title: "How to Validate Your Startup Idea in 2025",
    desc: "Proven frameworks for testing your startup concept before investing significant time and resources.",
  },
  {
    image: blog2,
    tag: "AI & Mentorship",
    title: "AI in Startup Mentorship: The Future is Now",
    desc: "How artificial intelligence is transforming the way founders get feedback and refine their pitches.",
  },
  {
    image: blog3,
    tag: "Growth",
    title: "Building a Mentorship Network That Works",
    desc: "Expert strategies for connecting with the right mentors to accelerate your startup journey.",
  },
];

const BlogPreviewSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
              From the Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Insights for Founders</h2>
          </div>
          <motion.div whileHover={{ x: 4 }} className="hidden sm:flex">
            <Link
              to="/blog"
              className="flex items-center gap-1 text-primary font-semibold text-sm hover:underline underline-offset-4 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
              whileTap={{ scale: 0.98 }}
              className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer shimmer"
            >
              {/* Image with zoom */}
              <div className="aspect-[16/9] overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                {/* Tag */}
                <span className="inline-block mb-3 text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {blog.tag}
                </span>
                <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{blog.desc}</p>
                {/* Read more arrow */}
                <motion.div
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-6 text-center">
          <Link to="/blog" className="text-primary font-semibold text-sm">
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
