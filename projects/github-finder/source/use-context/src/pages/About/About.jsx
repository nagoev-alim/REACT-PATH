import classes from './About.module.css'

const About = () => {
  return <div className={classes.about}>
    <h1 className='h3'>About</h1>
    <p>A React app to search GitHub profiles and see profile details.</p>
    <p><span className='h6'>Version:</span> 1.0.0</p>
    <p><span className='h6'>Author:</span> Alim Nagoev</p>
  </div>;
};

export default About;
