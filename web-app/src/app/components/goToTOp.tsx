'use client';
import styles from "./components.module.css"; 
import { ChevronUp} from "lucide-react";

const goToTop = () => {
  return (
    <a href="#" title="top">
      <div className={styles.top}>
        <ChevronUp />
      </div>
    </a>
  )
}

export default goToTop