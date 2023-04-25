import Link from 'next/link';
import styles from './categories.module.css';

type contentType = {
  sentence: string;
  href: string;
  img: string;
};
interface propsType {
  category: string;
  content: contentType[];
}
const ShowList = (props: propsType) => {
  return (
    <div className={styles.content}>
      <p>카테고리 : {props.category}</p>
      {props.content.map((c, index) => {
        return (
          <Link href={c.href} key={index} className={styles.contentItem}>
            {c.sentence}
          </Link>
        );
      })}
    </div>
  );
};
export default ShowList;
