import { useState } from 'react';
import { DifferentContent, Tab, TabContent } from './components';
import content from './mock';

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "Tabs".
 */
const App = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className='tabs'>
        {[0, 1, 2, 3].map(item => <Tab key={item} num={item} activeTab={activeTab} onClick={setActiveTab} />)}
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content[activeTab]} key={content[activeTab].summary} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
};

export default App;
