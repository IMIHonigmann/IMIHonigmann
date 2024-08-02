import React, { useEffect, useState, useRef } from 'react';
import '@mantine/core/styles.css';
import { Card, ColorSchemeScript, MantineProvider, Progress } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import Image from 'next/image'

export default function Blog() {
    return (
      <MantineProvider>
        <div style={{marginLeft: 10}}>
          <h1> The Making of Dying Sprite </h1>

          <p> By far the hardest project I have ever done. Here I will show you how I tackled some of the biggest challenges that came up in the project and how I solved them. </p>
          <CoverImageSlider />
          <GIFImageSlider />
          <StickImageSlider />
          <br/>
          <h2> Body Physics, Dismemberment and Enemy Reactions </h2>
          <p> The game had to feature fully working limb hitboxes which should signal the player that the enemies react to it </p>
          <p> I solved the problems by creating a ragdoll while using these created newly created physics bones as hitboxes and had some fun in the initial testing </p>
          <Image
            src="/img/bodysystem.gif"
            width={512}
            height={288}
            alt="UZI Animation"
          />
          {/* Middlefinger */}
          <p> This made it possible to assign different damage multipliers based on the limb. </p>
          <p> Creating hanging bodies was also possible and works with the shooting </p>
          <div> When the enemy is killed an amplified force is applied on the limb causing the body to fly backwards and the limb disappears and splatters blood all over. Creating very satisfying feedback. </div>
          <Image
            src="/img/dismemberment.gif"
            width={512}
            height={288}
            alt="UZI Animation"
          />
          <div> The more damage the enemy gets the more he walks forward in an injured way which made it possible to see ememy health instinctively without having a big ugly healthbar over their head</div>
          <Image
            src="/img/animationblending.gif"
            width={512}
            height={288}
            alt="UZI Animation"
          />
          <br/>
          <div> Now lets see it in action </div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/2yREx-M7JAM?si=iE7YsA4GT0AED5lM" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          <p> So the interaction between the enemy and the player is smooth now </p>
          <Image
            src="/img/ending.gif"
            width={512}
            height={288}
            alt="Cover picture"
          />
          <h2> Pathfinding in a big map </h2>
          <p> Pathfinding was a major concern since just generating a NavMesh for the Map was not feasibile. The game would run at 25 FPS consistently when more than 20 Enemies were on the map. This is obviously bad when we have continuous spawning </p>
          <h3> The solution: A* Pathfinding </h3>
          <p> I have used the A* Pathfinding Package which drastically improved performance. The paid version also has the ability to dynamically create NavMeshes fast (not in realtime but still fast). Perfect for the game. The only issue is that when exporting the enemies fly slightly above the ground. Cant be fixed but has been fixed in the new unity version in the making of this blogpost </p>

          <h2> Procedural Animation System </h2>
          <p> At first I tried to create an animation for everything but I quickly faced a problem with this approach. You need a transition to each state and these states must transition to other states to work correctly </p>
          <p> The solution was to use a procedural animation system where each action is controlled by tweening and code but this created another issue where the procedural transformations interfere with eachother or cancel eachother out. </p>
          <p> Thankfully this was simple to fix. The idea is to separate each distinct action that involves a certain type of tweening and transformation into a separate pivot child. Each of these pivot children can now read the local values easily without being distorted by other animations </p>
          <Image
            src="/img/animationsystem.gif"
            width={896}
            height={504}
            alt="Cover picture"
          />
          <p> The hierarchy is arbitrary but the lowest child is the only one that can handle handmade animation since it directly interacts with the rig. Any viewmodel animation can now be used with seamless integration to the animation system </p>
          <p> I highly recommend using inverse kinematics in unity since importing animations from blender can be a a goddamn hastle to get them to work correctly </p>
          <Image
            src="/img/akanim.gif"
            width={896}
            height={504}
            alt="AK Animation"
          />
          <Image
            src="/img/uzianim.gif"
            width={896}
            height={504}
            alt="UZI Animation"
          />
          <Image
            src="/img/flamethrower.gif"
            width={896}
            height={504}
            alt="UZI Animation"
          />
          <Image
            src="/img/sniperrechamber.gif"
            width={896}
            height={504}
            alt="UZI Animation"
          />


          <p> The game has many movement systems like sprinting, sliding, grappling hooks, wallrunning, wallclimbing, walljumping and shoulderpeeking. All of these had to be handled by the animation system </p>

          <h3> Some more specific procedural animations in action: </h3>
          <h3> Sliding, Grappling, Early Ragdolls </h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/OGK1C-uVn7o?si=Ct4el4oXKI8ofNVv" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          <h3> Clip Prevention </h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/RhizKjMz_7A?si=7-io_62AluOgZ8_E" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          <h3> Screenshake + Recoil (Also works on Dual Wielded Weapons) </h3>
          
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ZkUCKswS-F4?si=YVCo-xZ75o6Dk_U_" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          
          <iframe width="560" height="315" src="https://www.youtube.com/embed/RrGfEERHBV8?si=-vTKwlusDs0CO_1l" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          <h3> ADS: Aiming Down Sights </h3>
          <Image
            src="/img/aimdownsights.jpeg"
            width={896}
            height={504}
            style={{ width: '80%', height: 'auto', objectFit: 'cover', maxWidth: '896px', paddingInline: '2px' }}
            alt="UZI Animation"
          />
          <h3> Extra: Empty Shots </h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/iyYXtiHZOl0?si=zKauEwanNz4bHGJg" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope;
          picture-in-picture;
          web-share"
          referrerPolicy="strict-origin-when-cross-origin">
          </iframe>
          <p> The animation system takes in parameters to change the offsets and sounds for each weapon since weapon models can be so different. This ensures consistency </p>
          <h2> Sacrifices </h2>
          <p> Although many things have been implemented as I imagined not everything went over smoothly. For instance: Remember the A* Pathfinding Package. Its amazing but not realtime which made the chase concept impossible to implement.</p>
          <p> This was kind of a bummer since doing this puzzle while being chased by a hoard with the music getting more intense by the second was just too cool to not implement. But it is what it is </p>
          {/* Chase Sequence */}

          <p> I also had to hide the grappling hook ability as an easter egg since it broke the game</p>

          <h2> Lighting </h2>
          <div> I tried out to versions. One with a more natural light and another more stylized light and did a poll on which one was more popular. </div>
          <div> In the second version I chose the colors of the HDRI in a way to give the map a strong breaking bad inspired stylized look. </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center', // Centers vertically
          }}>
          <Image style={{ padding: '20px' }}
            src="/img/colorless.jpeg"
            width={896}
            height={504}
            alt="Cover picture"
          />
          <Image style={{ padding: '20px' }}
            src="/img/cover.jpeg"
            width={896}
            height={504}
            alt="Cover picture"
          />
          </div>
          <h2> The poll results (drumroll please): </h2>
          <NumberDiagram />
          <p> So based on that I ran with the second version </p>
          <p> I also love comparing it to older builds and seeing how far the project went </p>
          {/* UZI Past Version Prison */}
          {/* MG New Version */}
          
          <p> I increased the PBR Metalness to give weapons this beautiful shine on the sun. </p>
          {/* Gun Images */}

          <p> I tinkered a bit with raytracing but this resulted in poor perfoermance and since the pc already had so many things to deal with like the high viewing distance, minimal occlusion and the high enemy counts it was just better to improve the look by hand and the final result turned out better because of it. </p>
          
          <h3> Final Words </h3>
          <p> I got a diploma from my teacher for this project and it felt so surreal reading Skyrim in a diploma certified from the state </p>
          {/* Outstanding Commitment */}
          <p> Even though there are some things I would approach differently this project taught me so many things. I feel much more confident in tackling new projects now and would love to do something at this scale again. </p>
        </div>
      </MantineProvider>
    );
  }

  const NumberDiagram: React.FC = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
  
    const data = {
      labels: ['Lighting Style'],
      datasets: [
        {
          label: 'Realistic Lighting (Version 1)',
          data: [num1],
          backgroundColor: 'RGB(102, 51, 153)',
        },
        {
          label: 'Stylized Lighting (Version 2)',
          data: [num2],
          backgroundColor: 'RGB(34, 139, 34)',
        },
      ],
    };
  
    const options = {
      indexAxis: 'x' as const, // Ensures the indexAxis is treated as a literal type
      animation: {
        duration: 750, // Duration of the animation in milliseconds
        easing: 'easeInOutCubic', // Easing function for the animation
      },
      maintainAspectRatio: false, // Allows custom sizing
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
  
        if (scrollPosition > 6200) {
          setNum1(7);
          setNum2(21); 
        } else {
          setNum1(0);
          setNum2(0); 
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <Group style={{ justifyContent: 'center' }}>
        </Group>
        <div style={{height: '500px', margin: '0 auto' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };
  
const CoverImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out"
  };

  const sliderRef = useRef(null);
  const images = [
    '/img/m4.jpeg',
    '/img/cover.jpeg',
    '/img/seats.jpeg',
    '/img/cell.jpeg',
    '/img/infirmary.jpeg'
  ];

  return (
    <Card padding="lg">
      <div>
        <Slider {...settings} ref={sliderRef}>
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', maxWidth: '896px', paddingInline: '2px' }}
                width={896}
                height={504}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Card>
  );
};

const GIFImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    pauseOnHover: false,
    rtl: true,
    cssEase: "linear"
  };

  const sliderRef = useRef(null);
  const images = [
    '/img/akanim.gif',
    '/img/flamethrower.gif',
    '/img/bodysystem.gif',
  ];

  return (
    <Card padding="lg">
      <div>
        <Slider {...settings} ref={sliderRef}>
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', maxWidth: '896px', paddingInline: '2px' }}
                width={896}
                height={504}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Card>
  );
};

const StickImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    pauseOnHover: false,
    cssEase: "linear"
  };

  const sliderRef = useRef(null);
  const images = [
    '/img/animationsystem.gif',
    '/img/uzianim.gif',
    '/img/sniperrechamber.gif',
  ];

  return (
    <Card padding="lg">
      <div>
        <Slider {...settings} ref={sliderRef}>
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', maxWidth: '896px', paddingInline: '2px' }}
                width={896}
                height={504}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Card>
  );
};