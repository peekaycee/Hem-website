import { Instagram } from '../../../public/images';
import styles from './components.module.css';
import Image from 'next/image';

export default function LiveChat() {
  return (
    <>
      <div className={styles.liveChatBox}>
         <Image src={Instagram} alt="Instagram" width={0} height={0} />
      </div>
    </>
  )
}