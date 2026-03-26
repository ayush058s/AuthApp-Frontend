import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Fingerprint, Zap } from "lucide-react";

export default function FuturisticAuthHome() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        >
          Secure. Fast. Futuristic.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-muted-foreground max-w-xl"
        >
          Next-gen authentication system with seamless security and blazing-fast performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card className="bg-card border border-border backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 text-center">
                <feature.icon className="mx-auto mb-4 text-primary" size={32} />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold"
        >
          Start securing your app today
        </motion.h2>

        <p className="text-muted-foreground mt-4">
          Join thousands of developers building secure applications.
        </p>

        <Button className="mt-6 bg-primary hover:bg-primary/90">
          Create Account
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-border text-muted-foreground">
        © 2026 Auth App. All rights reserved.
      </footer>

    </div>
  );
}

const features = [
  {
    title: "Advanced Security",
    desc: "Multi-layer authentication with encryption.",
    icon: Shield,
  },
  {
    title: "Biometric Login",
    desc: "Fingerprint and face recognition support.",
    icon: Fingerprint,
  },
  {
    title: "Lightning Fast",
    desc: "Optimized performance for instant access.",
    icon: Zap,
  },
];