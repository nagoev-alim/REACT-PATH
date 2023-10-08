/**
 * Компонент About представляет страницу "О приложении".
 * @component
 */
const About = () => {
  return (
    <div className='grid gap-2 mx-auto max-w-4xl mt-4 bg-white p-3 border-2 rounded'>
      <h1 className='text-3xl font-bold'>About</h1>
      <p>A React app to search GitHub profiles and see profile details.</p>
      <p><span className='font-bold'>Version:</span> 1.0.0</p>
      <p><span className='font-bold'>Author:</span> Alim Nagoev</p>
    </div>
  );
};

export default About;
