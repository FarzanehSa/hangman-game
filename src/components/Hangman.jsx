import './Hangman.scss'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
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
    // else if (endGame === "no") {
    //   setClassL("letter-h");
    // }
  }, [endGame]);

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
  }, [wrongAnswer]);

  return (
    <div className="hangman">
      <motion.svg
        // width="300"
        // height="300"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        className="fix-hang"
      >
        <motion.line
          x1="0"
          y1="100"
          x2="30"
          y2="100"
          stroke="#00cc88"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="15"
          y1="100"
          x2="15"
          y2="20"
          stroke="#00cc88"
          variants={draw}
          custom={0.2}
        />
        <motion.line
          x1="15"
          y1="20"
          x2="45"
          y2="20"
          stroke="#00cc88"
          variants={draw}
          custom={0.4}
        />
        <motion.line
          x1="45"
          y1="20"
          x2="45"
          y2="40"
          stroke="#00cc88"
          variants={draw}
          custom={0.6}
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        initial="hidden"
        className="fix-hang"
        >
        <motion.circle
          cx="45"
          cy="47"
          r="7"
          stroke="#ff0055"
          variants={draw}
          animate={man.head}
          custom={0}
        />
        <motion.line
          x1="45"
          y1="54"
          x2="45"
          y2="75"
          stroke="#ff0055"
          variants={draw}
          animate={man.body}
          custom={0}
        />
        <motion.line
          x1="45"
          y1="65"
          x2="35"
          y2="55"
          stroke="#ff0055"
          variants={draw}
          animate={man.lHand}
          custom={0}
        />
        <motion.line
          x1="45"
          y1="65"
          x2="55"
          y2="55"
          stroke="#ff0055"
          variants={draw}
          animate={man.rHand}
          custom={0}
        />
        <motion.line
          x1="45"
          y1="75"
          x2="35"
          y2="85"
          stroke="#ff0055"
          variants={draw}
          animate={man.lLeg}
          custom={0}
        />
        <motion.line
          x1="45"
          y1="75"
          x2="55"
          y2="85"
          stroke="#ff0055"
          variants={draw}
          animate={man.rLeg}
          custom={0}
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        initial="hidden"
        className="fix-hang"
        animate={endGame === "win" ? "visible" : "hidden"}
        >
        <motion.circle
          cx="60"
          cy="57"
          r="7"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="60"
          y1="65"
          x2="60"
          y2="85"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="60"
          y1="70"
          x2="54"
          y2="80"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="60"
          y1="70"
          x2="66"
          y2="80"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="60"
          y1="85"
          x2="55"
          y2="100"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="60"
          y1="85"
          x2="65"
          y2="100"
          stroke="#ff0055"
          variants={draw}
          custom={0}
        />
      </motion.svg>
    </div>
  )
}

export default Hangman;