'use client';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
import styles from './styles/BottomNav.module.css';
import { mobileBottomRoutes } from '../util/route';
import { bottomNavBackward, bottomNavNone } from '../util/navControl';

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  if (bottomNavNone.includes(pathname)) return null;
  if (bottomNavBackward.includes(pathname)) {
    return (
      <div className={styles.mobile}>
        <div>
          <Button
            type="button"
            className="mobile-button"
            text="<"
            onClick={() => {
              router.back();
            }}
          />
        </div>
      </div>
    );
  }
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
