'use client';
import { useRouter } from 'next/navigation';
import Button from './Button';
import styles from './styles/BottomNav.module.css';
import { mobileBottomRoutes } from '../util/route';

const BottomNav = () => {
  const router = useRouter();
  return (
    <div className={styles.mobile}>
      <div className="flex justify-around">
        {mobileBottomRoutes.map((route) => (
          <Button
            key={route.text}
            type="button"
            className="mobile-button"
            text={route.text}
            onClick={() => {
              router.push(`${route.path}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
