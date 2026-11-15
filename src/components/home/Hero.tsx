import { motion, useReducedMotion } from "framer-motion";
import { site } from "../../data/site";
import {
  ArrowIcon,
  BoltIcon,
  CheckIcon,
  SparkIcon,
  WorkflowIcon,
} from "../Icon";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero">
      <div className="hero-noise" />
      <div className="hero-copy">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="eyebrow"
        >
          <SparkIcon />
          {" AI systems for service businesses"}
        </motion.div>
        <motion.h1
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={
            reduceMotion
              ? {
                  duration: 0,
                }
              : {
                  delay: 0.08,
                }
          }
        >
          {site.heroTitle}
        </motion.h1>
        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          transition={
            reduceMotion
              ? {
                  duration: 0,
                }
              : {
                  delay: 0.18,
                }
          }
        >
          {site.heroLead}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          transition={
            reduceMotion
              ? {
                  duration: 0,
                }
              : {
                  delay: 0.26,
                }
          }
        >
          <a className="button primary" href="#contact">
            {"Request my opportunity map "}
            <ArrowIcon />
          </a>
          <a className="button ghost" href="#systems">
            See an example system
          </a>
        </motion.div>
        <div className="trust-line">
          <span>
            <CheckIcon />
            {" Founder-led from strategy through launch"}
          </span>
          <span>
            <CheckIcon />
            {" Built around your stack"}
          </span>
          <span>
            <CheckIcon />
            {" Human oversight"}
          </span>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/ai-systems-hero.png" alt="" />
        <div className="system-card card-a">
          <span className="live-dot" />
          {" Approved response "}
          <strong>ready to review</strong>
        </div>
        <div className="system-card card-b">
          <BoltIcon />
          {" Routine handoff "}
          <strong>kept visible</strong>
        </div>
        <div className="system-card card-c">
          <WorkflowIcon />
          {" Example system "}
          <strong>human approval</strong>
        </div>
      </div>
    </section>
  );
}
