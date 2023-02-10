import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import GeneralContext from "../contexts/GeneralContext";
import './Hangman.scss'

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

const Hangman = () => {

  const {wrongAnswer, endGame } = useContext(GeneralContext);

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
          x1="5"
          y1="245"
          x2="75"
          y2="245"
          variants={draw}
          custom={0}
          className="hanger"
        />
        <motion.line
          x1="40"
          y1="5"
          x2="40"
          y2="245"
          variants={draw}
          custom={0.2}
          className="hanger"
        />
        <motion.line
          x1="40"
          y1="5"
          x2="120"
          y2="5"
          variants={draw}
          custom={0.4}
          className="hanger"
        />
        <motion.line
          x1="120"
          y1="5"
          x2="120"
          y2="45"
          variants={draw}
          custom={0.6}
          className="hanger"
        />
        <motion.line
          x1="40"
          y1="30"
          x2="70"
          y2="5"
          variants={draw}
          custom={0.8}
          className="hanger"
        />
      </motion.svg>

      <motion.svg
        initial="hidden"
        className="fix-hang"
        >
        <motion.circle
          cx="120"
          cy="67"
          r="20"
          variants={draw}
          animate={man.head}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="120"
          y1="89"
          x2="120"
          y2="170"
          variants={draw}
          animate={man.body}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="120"
          y1="120"
          x2="80"
          y2="100"
          variants={draw}
          animate={man.lHand}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="120"
          y1="120"
          x2="160"
          y2="100"
          variants={draw}
          animate={man.rHand}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="120"
          y1="170"
          x2="90"
          y2="200"
          variants={draw}
          animate={man.lLeg}
          custom={0}
          className="dead-man"
        />
        <motion.line
          x1="120"
          y1="170"
          x2="150"
          y2="200"
          variants={draw}
          animate={man.rLeg}
          custom={0}
          className="dead-man"
        />
      </motion.svg>

      <motion.svg
        initial="hidden"
        className="fix-hang"
        animate={endGame === "win" ? "visible" : "hidden"}
        // animate="visible"
        >
        <motion.circle
          cx="140"
          cy="100"
          r="20"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="140"
          y1="120"
          x2="140"
          y2="200"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="140"
          y1="140"
          x2="120"
          y2="180"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="140"
          y1="140"
          x2="160"
          y2="180"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="140"
          y1="200"
          x2="120"
          y2="245"
          variants={draw}
          custom={0}
          className="saved-man"
        />
        <motion.line
          x1="140"
          y1="200"
          x2="160"
          y2="245"
          variants={draw}
          custom={0}
          className="saved-man"
        />
      </motion.svg>
    </div>
  )
}

export default Hangman;