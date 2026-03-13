import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-foreground hover:text-primary transition-colors font-medium text-sm"
    >
      {item}
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? <Link to={href}>{content}</Link> : content}
      <AnimatePresence>
        {active === item && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
          >
            <div className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="glass-card rounded-2xl overflow-hidden border shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-border dark:border-border/50 bg-card/80 backdrop-blur-xl shadow-lg flex justify-center space-x-6 px-8 py-3"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({
  children,
  to,
  ...rest
}: {
  children: React.ReactNode;
  to: string;
  [key: string]: any;
}) => {
  return (
    <Link
      to={to}
      {...rest}
      className="text-muted-foreground hover:text-foreground transition-colors text-sm block py-1"
    >
      {children}
    </Link>
  );
};
