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

const Hangman = () => {

  const [man, setMan] = useState({
    body: "hidden",
    head: "hidden",
    lHand: "hidden",
    rHand: "hidden",
    lLeg: "hidden",
    rLeg: "hidden",
  });

  const [wrongAnswer, setWrongAnswer] = useState(0);

  const handleClick = () => {
    console.log("0000");
    setWrongAnswer(wrongAnswer + 1)
    // let flag = false;
    // setMan(man.map(row => {
    //   if (!flag && row === "hidden") {
    //     flag = true;
    //     return "visible";
    //   } else return row;
    // }))
  }

  useEffect(() => {

    if (wrongAnswer === 1) {
      setMan({...man, head: "visible"});
    }
    if (wrongAnswer === 2) {
      setMan({...man, 
        head: "visible", 
        body: "visible"
      });
    }
    if (wrongAnswer === 3) {
      setMan({...man, 
        head: "visible", 
        body: "visible",
        lHand: "visible",
      });
    }
    if (wrongAnswer === 4) {
      setMan({...man, 
        head: "visible", 
        body: "visible",
        lHand: "visible",
        rHand: "visible",
      });
    }
    if (wrongAnswer === 5) {
      setMan({...man, 
        head: "visible", 
        body: "visible",
        lHand: "visible",
        rHand: "visible",
        lLeg: "visible",
      });
    }
    if (wrongAnswer === 6) {
      setMan({...man, 
        head: "visible", 
        body: "visible",
        lHand: "visible",
        rHand: "visible",
        lLeg: "visible",
        rLeg: "visible",
      });
    }
  }, [wrongAnswer])

  
  console.log(wrongAnswer);

  return (
    <div className="hangman">
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        className="test"
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
        width="200"
        height="200"
        viewBox="0 0 100 100"
        initial="hidden"
        
        className="test"
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
          custom={1.5}
        />
        <motion.line
          x1="45"
          y1="65"
          x2="35"
          y2="55"
          stroke="#ff0055"
          variants={draw}
          animate={man.lHand}
          custom={2}
        />
        <motion.line
          x1="45"
          y1="65"
          x2="55"
          y2="55"
          stroke="#ff0055"
          variants={draw}
          animate={man.rHand}
          custom={2.5}
        />
        <motion.line
          x1="45"
          y1="75"
          x2="35"
          y2="85"
          stroke="#ff0055"
          variants={draw}
          animate={man.lLeg}
          custom={2.5}
        />
        <motion.line
          x1="45"
          y1="75"
          x2="55"
          y2="85"
          stroke="#ff0055"
          variants={draw}
          animate={man.rLeg}
          custom={3}
        />
      </motion.svg>
      <button className="btn" onClick={ handleClick }>Click</button>
    </div>
  )
}

export default Hangman;