"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <PartyPopper className="w-12 h-12 text-sponge-gold mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">신청 완료!</h3>
      <p className="text-sponge-muted mb-4">
        1기 오픈 소식을 가장 먼저 전해드릴게요.
      </p>
      <p className="text-sponge-muted text-sm">
        냅다 흡수할 준비, 되셨나요? 🧽
      </p>
    </motion.div>
  );
}
