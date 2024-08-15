/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useRef, Fragment } from 'react';
import '@mantine/core/styles.css';
import './blog.css';
import { Card, ColorSchemeScript, MantineProvider, Progress } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import ScrollPositionIndicator from './scrollindicator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import Image from 'next/image'

function Blog() {

  const [useGHPages, setUseGHPages] = useState<Boolean>(false);
  const [repoName, setRepoName] = useState<String>('');
  useEffect(() => {
    if(useGHPages) {
      setRepoName('/IMIHonigmann');
    }
  }, [useGHPages]);
  

  const textRef = useRef(null);

    return (
      <MantineProvider>
        <div ref={textRef} style={{marginLeft: 10, paddingInline: '40px', width: '60%', margin: '0 auto', backgroundColor: 'white'}}  className="blog-container">
          <h1 className="dying-sprite"> Dying Sprite </h1>
          <h1> Behind the Scenes </h1>

          <p> This is by far the hardest project I have ever done. Dying Sprite is a highschool coding project I had to finish in roundabout 6 months using SCRUM. The problem is that I had no clue how unity works so I not only had to juggle my graduation exams but also creating a project while learning the engine for it.
            I was obsessed with it way too obsessed. So obsessed to the point where there were days where I sat from 11 AM to 4 AM to the next day, learning the engine and working on the game. </p>
          <p>
            This makes it impossible to cover everything but since many people requested it I still want to show you what the biggest challenges were that I faced and how I solved them so you can apply it to your own project if you want to. 
            Another thing: this blog is not in chronological order and thats on purpose. I have created it this way so you can jump to the parts you want to know more about.
          </p>
          <ol>
            <li><a> Body Physics, Dismemberment, Enemy Reactions </a></li>
            <li><a> Pathfinding in a big map </a></li>
            <li><a> Procedural Animation System </a></li>
            <li><a> Sacrifices </a></li>
            <li><a> Lighting </a></li>
            <li><a> The lighting poll results </a></li>
            <li><a> Final Words </a></li>
          </ol>
          <CoverImageSlider repoName={repoName} />
          <GIFImageSlider repoName={repoName} />
          <StickImageSlider repoName={repoName} />
          <br/>
          <h2> Body Physics <br/> Dismemberment <br/> Enemy Reactions </h2>
          <p> The game had to feature fully working limb hitboxes which should signal the player that the enemies react to it </p>
          <p> I solved the problems by creating a ragdoll while using these newly created physics bones as hitboxes and had some fun in the initial testing </p>
          <Image
            src={repoName + "/img/bodysystem.gif"}
            width={512}
            height={288}
            alt="Enemy Body System"
          />
          <p> This made it possible to assign different damage multipliers based on the limb. </p>
          <p> Creating hanging bodies was also possible and works with the shooting </p>
          <div> When the enemy is killed an amplified force is applied on the limb causing the body to fly backwards and the limb disappears and splatters blood all over, creating very satisfying feedback. </div>
          <Image
            src={repoName + "/img/dismemberment.gif"}
            width={512}
            height={288}
            alt="Dismemberment Doodle"
          />
          <div> The more damage the enemy gets the more he walks forward in an injured way which made it possible to see ememy health instinctively without having a big ugly healthbar over their head</div>
          <Image
            src={repoName + "/img/animationblending.gif"}
            width={512}
            height={288}
            alt="Bleeding Doodle"
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
            src={repoName + "/img/ending.gif"}
            width={512}
            height={288}
            alt="Cover picture"
          />
          <h2> Pathfinding<br/>in a big map </h2>
          <p> Pathfinding was a major concern since just generating a NavMesh for the Map was not feasibile. The game would run at 25 FPS consistently when more than 20 Enemies were on the map. This is obviously bad when we have continuous spawning </p>
          <h3> The solution: A* Pathfinding </h3>
          <p> I have used the A* Pathfinding Package which drastically improved performance. The paid version also has the ability to dynamically create NavMeshes fast (not in realtime but still fast). Perfect for the game. The only issue is that when exporting the enemies fly slightly above the ground. Cant be fixed but has been fixed in the new unity version in the making of this blogpost </p>

          <h2>Procedural<br/>Animation<br/>System</h2>
          <p> At first I tried to create an animation for everything but I quickly faced a problem with this approach. You need a transition to each state and these states must transition to other states to work correctly </p>
          <p> The solution was to use a procedural animation system where each action is controlled by tweening and code but this created another issue where the procedural transformations interfere with eachother or cancel eachother out. </p>
          <p> Thankfully this was simple to fix. The idea is to separate each distinct action that involves a certain type of tweening and transformation into a separate pivot child. Each of these pivot children can now read the local values easily without being distorted by other animations </p>
          <Image
            src={repoName + "/img/animationsystem.gif"}
            width={896}
            height={504}
            alt="Cover picture"
          />
          <p> The hierarchy is arbitrary but the lowest child is the only one that can handle handmade animation since it directly interacts with the rig. 
            Any viewmodel animation can now be used with seamless integration to the animation system. 
            The system is heavily dependent on my beloved LERPS (linear interpolation) and I used the Dotween Package to implement the components faster.
            </p>
          <p> I highly recommend using inverse kinematics in unity since importing animations from blender can be a a goddamn hastle to get them to work correctly </p>
          <Image
            src={repoName + "/img/akanim.gif"}
            width={896}
            height={504}
            alt="AK Animation"
          />
          <Image
            src={repoName + "/img/uzianim.gif"}
            width={896}
            height={504}
            alt="UZI Animation"
          />
          <Image
            src={repoName + "/img/flamethrower.gif"}
            width={896}
            height={504}
            alt="Spray Flamethrower Animation"
          />
          <Image
            src={repoName + "/img/sniperrechamber.gif"}
            width={896}
            height={504}
            alt="Sniper Rechamber Animation"
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
          <p> Shoot a raycast forwards and take the distance from the origin to the collision as the rotation factor </p>
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
          <h3> Screenshake + Recoil <br/>(Also works on Dual Wielded Weapons) </h3>
          <p> Add a noise to the camera with an arbitrary factor as the amplitude but be careful not to add too much since doing a camera movement that has not been controlled by the player tends to cause motion sickness. </p>
              <p>
              If you look closely you can see that the camera bobs like a sinewave while standing and while moving and that the guns position reaches the midpoint slightly delayed.
              Imagine the frequency and the amplitude of the camera bobbing like an exponential factor to the players need for tolerance. 
              It gets sickening really fast so choose your parameter values wisely
             </p>
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
          <p> Define a new rotation and position for each weapon and interpolate to that </p>
          <Image
            src={repoName + "/img/aimdownsights.jpeg"}
            width={896}
            height={504}
            style={{ width: '80%', height: 'auto', objectFit: 'cover', maxWidth: '896px', paddingInline: '2px' }}
            alt="Aiming Down Sights AUG"
          />
          <h3> Extra: Empty Shots </h3>
          <p> The weapon system is also designed to take in parameters like at how many shots the sound of the gun running empty starts to play. It includes other parameters like the spread and the raycasting range and the raycast takes the normal of the target surface, uses it as an orientation and places a hole decal at the point which creates a bullet impact effect. </p>
          <p>
          I used to have a projectile based variant but I decided to scrap it since there isnt much use for a projectile based approach (outside of ricocheting maybe but thats too specific and unnoticable to maintain a different version for). Simply put: Maintaining a projectile based variant of the script added extra complexity which didnt result in a better result but Im still glad I took the plunge and know how to implement it in another project when I need it. Here is the result with some slightly extreme parameter values for the sake of visualization. </p>
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
          <h3> Step 1: Going out </h3>
          <Image
            src={repoName + "/img/inout.gif"}
            width={512}
            height={288}
            alt="Going out of cell and back"
          />
          <h3> Step 2: Seeing the chaos unfold </h3>
          <Image
            src={repoName + "/img/chase.png"}
            width={512}
            height={288}
            alt="Running Zombies"
          />
          <h3> Step 3: <span style={{ color: 'red'}}> RUN MOTHERF*CKER </span></h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/QsAV30n1Noc?si=4ypo5sYwaKcYNNfB" 
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

          <p> I also had to hide the grappling hook ability as an easter egg since it broke the game</p>

          <h2 className='lighting'> Lighting </h2>
          <div> I tried out to versions. One with a more natural light and another more stylized light and did a poll on which one was more popular. </div>
          <div> In the second version I chose the colors of the HDRI in a way to give the map a strong breaking bad inspired stylized look. </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center', // Centers vertically
          }}>
          <Image style={{ padding: '10px', width: '50%', height: 'auto' }}
            src={repoName + "/img/colorless.jpeg"}
            width={896*0.8}
            height={504*0.8}
            alt="Less Vibrant HDRI Light"
          />
          <Image style={{ padding: '10px', width: '50%', height: 'auto' }}
            src={repoName + "/img/cover.jpeg"}
            width={896*0.8}
            height={504*0.8}
            alt="Cover Picture"
          />
          </div>
          <h2> The poll results<br/>(drumroll please) </h2>
          <NumberDiagram />
          <p> So based on that I ran with the second version </p>
          <p> I also did the same for the lighting of the cellblock concept in the first level: </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center', // Centers vertically
          }}>
          <Image style={{ padding: '10px', width: '35%', height: 'auto' }}
            src={repoName + "/img/blue.jpeg"}
            width={896}
            height={504}
            alt="Blue Cell"
          />
          <Image style={{ padding: '10px', width: '35%', height: 'auto' }}
            src={repoName + "/img/yellow.jpeg"}
            width={896}
            height={504}
            alt="Yellow Cell"
          />
          <Image style={{ padding: '10px', width: '35%', height: 'auto' }}
            src={repoName + "/img/red.jpeg"}
            width={896}
            height={504}
            alt="Red Cell"
          />
          </div>
          <p> However, the results this time were quite mixed. Personally I love red so obviously I had a personal bias for it. This is why I slipped 2 points into red hehehehe 😈 </p>
          <ColorsDiagram />
          <p>
            So ummmm. Red won! 😏
            This way we have 3 distinctly colored areas. A cold steel blue in the beginning, A hellish red when leaving it and a golden orange-yellow when entering the city. <br/>
            I also love comparing it to older builds and seeing how far the project went 
          </p>
          <Image
            src={repoName + "/img/then.jpeg"}
            width={512}
            height={288}
            alt="UZI Then"
          />
          <Image
            src={repoName + "/img/mg.jpeg"}
            width={512}
            height={288}
            alt="MG Sunny"
          />
          
          <p> The way how i got that effect you see in the second image is by increasing the PBR Metalness to give weapons this beautiful shine on the sun. </p>
          {/* Gun Images */}

          <p> I tinkered a bit with raytracing but this resulted in poor perfoermance and since the pc already had so many things to deal with like the high viewing distance, minimal occlusion and the high enemy counts it was just better to improve the look by hand and the final result turned out better because of it. </p>
          
          <h2> Final <br/> Words </h2>
          <p> I got a diploma from my teacher for this project and it felt so surreal reading Skyrim in a diploma certified from the state </p>
          <Image
            src={repoName + "/img/outstandingdedication.jpeg"}
            width={512}
            height={288}
            alt="Certificate of Outstanding Dedication"
          />
          <p> Even though there are some things I would approach differently this project taught me so many things. I feel much more confident in tackling new projects now and would love to do something at this scale again. 
            Thank you for reading this and I hope you found it interesting.
          </p>
        </div>
        {/* <ScrollPositionIndicator /> */}
      </MantineProvider>
    );
  }

  const NumberDiagram: React.FC = () => {  
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

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
          backgroundColor: '#FF8C00',
        },
      ],
    };
  
    const options: ChartOptions<'bar'> = {
      indexAxis: 'x',
      animation: {
        duration: 750, // Duration of the animation in milliseconds
        easing: 'easeInOutCubic', // Easing function for the animation
      },
      maintainAspectRatio: false,
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
    
        if (scrollPosition > 17500) {
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

  const ColorsDiagram: React.FC = () => {  
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [num3, setNum3] = useState(0);

    const data = {
      labels: ['Lighting Color'],
      datasets: [
        {
          label: 'Blue Lighting',
          data: [num1],
          backgroundColor: '#003153',
        },
        {
          label: 'Yellow Lighting',
          data: [num2],
          backgroundColor: '#FFBF00',
        },
        {
          label: 'Red Lighting (+2 points)',
          data: [num3],
          backgroundColor: '#FF2400',
        },
      ],
    };
  
    const options: ChartOptions<'bar'> = {
      indexAxis: 'y',
      animation: {
        duration: 750, // Duration of the animation in milliseconds
        easing: 'easeInOutCubic', // Easing function for the animation
      },
      maintainAspectRatio: false,
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
    
        if (scrollPosition > 18500) {
          setNum1(18);
          setNum2(15);
          setNum3(17); 
        } else {
          setNum1(0);
          setNum2(0);
          setNum3(0);
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

const CoverImageSlider = ({ repoName }: any) => {
  
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
    `${repoName}/img/m4.jpeg`,
    `${repoName}/img/cover.jpeg`,
    `${repoName}/img/seats.jpeg`,
    `${repoName}/img/cell.jpeg`,
    `${repoName}/img/infirmary.jpeg`
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

const GIFImageSlider = ({ repoName }: any) => {
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
    `${repoName}/img/akanim.gif`,
    `${repoName}/img/flamethrower.gif`,
    `${repoName}/img/bodysystem.gif`
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

const StickImageSlider = ({ repoName }: any) => {
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
    `${repoName}/img/animationsystem.gif`,
    `${repoName}/img/uzianim.gif`,
    `${repoName}/img/sniperrechamber.gif`,
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

export default Blog;