import './Hangman.scss'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 0.5 + i * 0.5;
    // const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

const Hangman = ({wrongAnswer, endGame}) => {

  const [man, setMan] = useState({
    body: "hidden",
    head: "hidden",
    lHand: "hidden",
    rHand: "hidden",
    lLeg: "hidden",
    rLeg: "hidden",
  });

  useEffect(() => {
    if (endGame === "win") {
      setMan({...man, 
        body: "hidden",
        head: "hidden",
        lHand: "hidden",
        rHand: "hidden",
        lLeg: "hidden",
        rLeg: "hidden",
      });
    } 
  }, [endGame]); // eslint-disable-line

  useEffect(() => {
    switch(wrongAnswer) {
      case 1:
        setMan({...man, head: "visible"});
        break;
      case 2:
        setMan({...man, 
          head: "visible", 
          body: "visible"
        });
        break;
      case 3:
        setMan({...man, 
          head: "visible", 
          body: "visible",
          lHand: "visible",
        });
        break;
      case 4:
        setMan({...man, 
          head: "visible", 
          body: "visible",
          lHand: "visible",
          rHand: "visible",
        });
        break;
      case 5:
        setMan({...man, 
          head: "visible", 
          body: "visible",
          lHand: "visible",
          rHand: "visible",
          lLeg: "visible",
        });
        break;
      case 6:
        setMan({...man, 
          head: "visible", 
          body: "visible",
          lHand: "visible",
          rHand: "visible",
          lLeg: "visible",
          rLeg: "visible",
        });
        break;
      default:
        setMan({...man, 
          body: "hidden",
          head: "hidden",
          lHand: "hidden",
          rHand: "hidden",
          lLeg: "hidden",
          rLeg: "hidden",
        });
    }
  }, [wrongAnswer]); // eslint-disable-line

  return (
    <div className="hangman">
      <motion.svg
        initial="hidden"
        animate="visible"
        className="fix-hang"
      >
        <motion.line
          x1="0"
          y1="300"
          x2="100"
          y2="300"
          variants={draw}
          custom={0}
          className="hanger"
        />
        <motion.line
          x1="50"
          y1="60"
          x2="50"
          y2="300"
          variants={draw}
          custom={0.2}
          className="hanger"
        />
        <motion.line
          x1="50"
          y1="60"
          x2="130"
          y2="60"
          variants={draw}
          custom={0.4}
          className="hanger"
        />
        <motion.line
          x1="130"
          y1="60"
          x2="130"
          y2="100"
          variants={draw}
          custom={0.6}
          className="hanger"
        />
      </motion.svg>

      <motion.svg
        initial="hidden"
        className="fix-hang"
        >
        <motion.circle
          cx="130"
          cy="121"
          r="20"
          variants={draw}
          animate={man.head}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="130"
          y1="141"
          x2="130"
          y2="220"
          variants={draw}
          animate={man.body}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="130"
          y1="180"
          x2="100"
          y2="150"
          variants={draw}
          animate={man.lHand}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="130"
          y1="180"
          x2="160"
          y2="150"
          variants={draw}
          animate={man.rHand}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="130"
          y1="220"
          x2="100"
          y2="250"
          variants={draw}
          animate={man.lLeg}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="130"
          y1="220"
          x2="160"
          y2="250"
          variants={draw}
          animate={man.rLeg}
          custom={0}
          className="dead-man"
        />
      </motion.svg>

      <motion.svg
        initial="hidden"
        className="fix-hang"
        // animate={endGame === "win" ? "visible" : "hidden"}
        animate="visible"
        >
        <motion.circle
          cx="180"
          cy="170"
          r="20"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="180"
          y1="190"
          x2="180"
          y2="260"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="180"
          y1="210"
          x2="200"
          y2="245"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="180"
          y1="210"
          x2="160"
          y2="245"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="180"
          y1="260"
          x2="160"
          y2="300"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="180"
          y1="260"
          x2="200"
          y2="300"
          variants={draw}
          custom={0}
          className="saved-man"
        />
      </motion.svg>
    </div>
  )
}

export default Hangman;