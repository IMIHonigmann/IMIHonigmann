/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useRef, Fragment } from 'react';
import Image from 'next/image'
import '@mantine/core/styles.css';
import './slideshow.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const GOTOBlog = ({ repoName }: any) => {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/blog';
        }, 6000)
    }, []);
    return (<>
    <Image style={{ width: '50%', height: 'auto' }}
            src={repoName + '/img/loading.gif'}
            width={896*0.8}
            height={504*0.8}
            alt="Cover picture"
          />
    </>);
}

const Slideshow = () => {
  const [useGHPages, setUseGHPages] = useState(true);
  const [repoName, setRepoName] = useState('');
  useEffect(() => {
    if(useGHPages) {
      setRepoName('/IMIHonigmann');
    }
  }, [useGHPages]);


                //    button  starting    presents   nothing  passion  DS     BhTS  Blog
    const durations = [0,       5500,       3500,     3500,    4000,  6000,   4500, 3500, 3500, 3500];
    const [step, setStep] = useState(0);
    const totalSteps = 8;
    const [slideshowStarted, setSlideshowStarted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
  
    useEffect(() => {
      if (slideshowStarted && step < totalSteps - 1) {
        const interval = setInterval(() => {
          setStep(prevStep => prevStep + 1);
        }, durations[step]); // Adjust timing as needed
  
        return () => clearInterval(interval);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideshowStarted, step]);
  
    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
      const button = buttonRef.current;
      if (button) {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
  
      const rotateX = -y / 7;
      const rotateY = x / 7;
  
      button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };
  
    const handleMouseLeave = () => {
      const button = buttonRef.current;
      if (button) {
        button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
  
    };
  
    const handleStartSlideshow = () => {
      document.body.style.zoom = "100%";
      const elem = document.documentElement;
      elem.requestFullscreen();
      
      const audio = new Audio(repoName + '/intro.mp3');
      setTimeout(() => audio.play(), 2000);
      
      setSlideshowStarted(true);
      setStep(1);
    };
  
    const slides = [
      <button
        ref={buttonRef}
        style={{ fontSize: '13rem', paddingInline: '5rem', borderRadius: '3rem', boxShadow: '0 0 20px 15px rgba(99, 68, 12, 0.7)' }}
        className="start-button"
        onClick={handleStartSlideshow}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        View
      </button>,
      <p></p>,
      <h1 className="slide-title">Homam Mousa Presents</h1>,
      <p></p>,
      <h1 className="slide-title">A Passion Project <br/>created in 6 Months </h1>,
      <Image
              src={repoName + '/img/logo.png'}
              width={1920}
              height={1080}
              alt="logo"
            />,
      <h1 className="slide-title">Behind The Scenes</h1>,
      <GOTOBlog repoName={repoName} />
    ];
  
    return (
      <TransitionGroup className="slideshow">
        <CSSTransition
          key={step}
          timeout={4000}
          classNames="fade"
        >
          <div className="slide">
            {slides[step]}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  };

export default Slideshow;