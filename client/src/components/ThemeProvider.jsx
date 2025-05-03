import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // or document.body
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (

      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>

  );
}

